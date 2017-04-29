var Promise = require('bluebird')
var asyncReplace = Promise.promisify(require('async-replace'))
var fs = require('fs')
var FS = Promise.promisifyAll(fs)
var path = require('path')
var shortid = require('shortid')
var minimatch = require('minimatch')
var url = require('url')
var jsStringEscape = require('js-string-escape')
var etag = require('etag')
var mime = require('mime')
var Buffer = require('safe-buffer').Buffer

var test = /{#asset ([^{}]{0,150})}/g
var imageTest = /\.(jpeg|jpg|gif|png|svg)$/
var fontTest = /\.(woff|ttf|otf|eot|woff2)$/

function isImage (name) {
  return name.match(imageTest) != null
}
function isFont (name) {
  return name.match(fontTest) != null
}

function evaluateAssets (reporter, stringToReplace, req) {
  req.evaluateAssetsCounter = req.evaluateAssetsCounter || 0
  req.evaluateAssetsCounter++

  var replacedAssets = []

  function convert (str, p1, offset, s, done) {
    var assetName = (p1.indexOf(' @') !== -1) ? p1.substring(0, p1.indexOf(' @')) : p1

    var encoding = 'utf8'
    if (p1.indexOf(' @') !== -1) {
      var paramRaw = p1.replace(assetName, '').replace(' @', '')

      if (paramRaw.split('=').length !== 2) {
        throw new Error('Wrong asset param specification, should be {#asset name @encoding=base64}')
      }

      var paramName = paramRaw.split('=')[0]
      var paramValue = paramRaw.split('=')[1]

      if (paramName !== 'encoding') {
        throw new Error('Unsupported param ' + paramName)
      }

      if (paramValue !== 'base64' && paramValue !== 'utf8' && paramValue !== 'string' && paramValue !== 'link' && paramValue !== 'dataURI') {
        throw new Error('Unsupported asset encoding param value ' + paramValue + ', supported values are base64, utf8, link, dataURI and string')
      }

      if (paramValue === 'dataURI' && !isImage(assetName) && !isFont(assetName)) {
        throw new Error('Asset encoded as dataURI needs to have file extension jpeg|jpg|gif|png|svg|woff|tff|otf|woff2|eot')
      }

      encoding = paramValue
    }

    readAsset(reporter, assetName, encoding, req).then(function (res) {
      replacedAssets.push(assetName)
      done(null, res.content)
    }).catch(done)
  }

  return asyncReplace(stringToReplace, test, convert).then(function (result) {
    if (replacedAssets.length) {
      req.logger.debug('Replaced assets ' + JSON.stringify(replacedAssets))
    }

    if (test.test(result) && req.evaluateAssetsCounter < 100) {
      return evaluateAssets(reporter, result, req)
    }

    return result
  })
}

function isAssetPathValid (allowedFiles, link, absolutePath) {
  return (allowedFiles != null) && (minimatch(absolutePath, allowedFiles) || minimatch(absolutePath.replace('/', '\\'), allowedFiles) ||
    minimatch(link, allowedFiles) || minimatch(link.replace('/', '\\'), allowedFiles))
}

function linkPath (reporter, link) {
  var result = path.isAbsolute(link) ? link : path.join(reporter.options.rootDirectory, link)

  if (!isAssetPathValid(reporter.options.assets.allowedFiles, link, result)) {
    var err = new Error('Request to file ' + result + ' denied. Please allow it by setting config { "assets": { "allowedFiles": "**/foo.js" } }')
    err.weak = true
    throw err
  }

  return result
}

function readFile (reporter, link) {
  const pathToLinkedFile = linkPath(reporter, link)

  return FS.readFileAsync(pathToLinkedFile).then(function (content) {
    return FS.statAsync(pathToLinkedFile).then(function (stat) {
      return {
        content: content,
        filename: path.basename(pathToLinkedFile),
        modified: stat.mtime
      }
    })
  }).catch(function () {
    var err = new Error('Unable to find file ' + pathToLinkedFile)
    err.weak = true
    throw err
  })
}

function resolveAssetLink (reporter, req, assetName) {
  if (reporter.options.assets.rootUrlForLinks) {
    return url.resolve(reporter.options.assets.rootUrlForLinks, 'assets/content/' + assetName)
  }

  if (!req.url) {
    var protocol = reporter.options.httpPort ? 'http://' : 'https://'
    var port = reporter.options.httpPort || reporter.options.httpsPort
    return url.resolve(protocol + 'localhost:' + port, 'assets/content/' + assetName)
  }

  var base = req.protocol + '://' + req.get('host')
  return base + (req.originalUrl || '/').replace('api/report', '') + 'assets/content/' + assetName
}

function readAsset (reporter, name, encoding, req) {
  var escape = function (val) { return val }

  if (encoding === 'string') {
    escape = jsStringEscape
    encoding = 'utf8'
  }

  if (encoding === 'dataURI') {
    escape = function (val, name) {
      var type = mime.lookup(name)
      var charset = mime.charsets.lookup(type)
      return 'data:' + type + (charset ? '; charset=' + charset : '') + ';base64,' + val
    }
    encoding = 'base64'
  }

  return reporter.documentStore.collection('assets').find({$or: [{ name: name }, { link: name }]}, reporter.options.assets.publicAccessEnabled ? null : req).then(function (result) {
    if (result.length < 1) {
      if (reporter.options.assets.searchOnDiskIfNotFoundInStore !== true) {
        throw new Error('Asset ' + name + ' not found')
      }

      if (encoding === 'link') {
        return Promise.resolve({
          content: resolveAssetLink(reporter, req, name),
          filename: name
        })
      }

      return readFile(reporter, name).then(function (res) {
        return {
          content: escape(new Buffer(res.content || '').toString(encoding), res.filename),
          filename: res.filename,
          modified: res.modified
        }
      })
    }

    if (encoding === 'link') {
      return result[0].link ? Promise.resolve({
        content: resolveAssetLink(reporter, req, result[0].link),
        filename: name
      }) : Promise.resolve({
        content: resolveAssetLink(reporter, req, name),
        filename: name
      })
    }

    if (result[0].link) {
      return readFile(reporter, result[0].link).then(function (res) {
        return {
          content: escape(new Buffer(res.content).toString(encoding), res.filename),
          filename: res.filename,
          modified: res.modified
        }
      })
    }

    return {
      content: escape(new Buffer(result[0].content).toString(encoding), result[0].name),
      filename: result[0].name,
      modified: result[0].modificationDate || new Date()
    }
  })
}

module.exports = function (reporter, definition) {
  reporter.documentStore.registerEntityType('AssetType', {
    _id: { type: 'Edm.String', key: true },
    name: { type: 'Edm.String', key: true, publicKey: true },
    shortid: { type: 'Edm.String' },
    modificationDate: { type: 'Edm.DateTimeOffset' },
    content: { type: 'Edm.Binary', document: { extension: 'html', content: true } },
    forceUpdate: { type: 'Edm.Boolean' },
    isSharedHelper: { type: 'Edm.Boolean' },
    link: { type: 'Edm.String' }
  })

  reporter.documentStore.registerEntitySet('assets', {
    entityType: 'jsreport.AssetType',
    splitIntoDirectories: true
  })

  reporter.options.assets = reporter.options.assets || definition.options

  reporter.on('express-configure', function (app) {
    app.enable('trust proxy')

    app.get('/assets/content/:path*', function (req, res) {
      var assetLink = req.params.path + req.params['0']

      readAsset(reporter, assetLink, 'binary', req).then(function (asset) {
        if (req.query.download === 'true') {
          res.setHeader('Content-Disposition', 'attachment;filename=' + asset.filename)
        }
        res.setHeader('ETag', etag(asset.content))
        res.setHeader('Cache-Control', 'public, max-age=0')
        res.setHeader('Last-Modified', asset.modified.toUTCString())

        var type = mime.lookup(asset.filename)
        if (type) {
          var charset = mime.charsets.lookup(type)
          res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
        }
        res.end(asset.content, 'binary')
      }).catch(function (e) {
        reporter.logger.warn('Unable to get asset content ' + assetLink, e)
        res.status(500).end(e.message)
      })
    })

    app.get('/assets/link/:path*', function (req, res) {
      var assetLink = req.params.path + req.params['0']
      try {
        res.send(linkPath(reporter, assetLink))
      } catch (e) {
        reporter.logger.warn('Unable to get asset link ' + assetLink, e)
        res.status(500).end(e.message)
      }
    })
  })

  reporter.beforeRenderListeners.insert({ after: 'scripts' }, definition.name, this, function (req, res) {
    return reporter.documentStore.collection('assets').find({ isSharedHelper: true }, req).then(function (assets) {
      if (assets.length > 0 && typeof req.template.helpers === 'object') {
        req.logger.warn('Cannot add shared helpers when passing helpers as object')
        return
      }

      return Promise.map(assets, function (a) {
        return readAsset(reporter, a.name, 'utf8', req)
      }).then(function (assetContents) {
        assetContents.forEach(function (ac) {
          req.template.helpers += '\n' + ac.content
        })
      })
    }).then(function () {
      return evaluateAssets(reporter, req.template.content, req).then(function (result) {
        req.template.content = result

        if (req.template.helpers && typeof req.template.helpers === 'string') {
          return evaluateAssets(reporter, req.template.helpers, req).then(function (result) {
            req.template.helpers = result
          })
        }
      })
    })
  })

  reporter.afterTemplatingEnginesExecutedListeners.add('assets', function (req, res) {
    return evaluateAssets(reporter, res.content.toString(), req).then(function (result) {
      res.content = new Buffer(result)
    })
  })

  reporter.initializeListeners.add('assets', function () {
    if (reporter.options.assets.publicAccessEnabled) {
      reporter.emit('export-public-route', '/assets')
    }

    reporter.documentStore.addFileExtensionResolver(function (doc, entitySetName, entityType, propertyType) {
      if (entitySetName === 'assets' && propertyType.document.content) {
        var extensions = path.extname(doc.name).split('.')
        return extensions[extensions.length - 1]
      }
    })

    if (reporter.beforeScriptListeners) {
      reporter.beforeScriptListeners.add('assets', function (scriptDef, req) {
        return evaluateAssets(reporter, scriptDef.script, req).then(function (result) {
          scriptDef.script = result
        })
      })
    }

    reporter.documentStore.collection('assets').beforeInsertListeners.add('assets', function (entity) {
      delete entity.forceUpdate
      entity.modificationDate = new Date()

      if (!entity.shortid) {
        entity.shortid = shortid.generate()
      }

      if (entity.link) {
        entity.name = path.basename(entity.link)
        return readFile(reporter, entity.link).then(function () {
          return entity
        })
      }
    })

    reporter.documentStore.collection('assets').beforeUpdateListeners.add('assets', function (query, update) {
      update.$set.modificationDate = new Date()

      if (query._id && update.$set && update.$set.forceUpdate && update.$set.link) {
        return FS.writeFileAsync(linkPath(reporter, update.$set.link), update.$set.content).then(function () {
          delete update.$set.forceUpdate
          delete update.$set.content
        }).catch(function (e) {
          var error = new Error('Unable to access file ' + linkPath(reporter, update.$set.link))
          error.weak = true
          throw error
        })
      } else {
        delete update.$set.forceUpdate
      }
    })
  })
}

module.exports.isAssetPathValid = isAssetPathValid
