const Promise = require('bluebird')
const asyncReplace = Promise.promisify(require('async-replace'))
const fs = require('fs')
const FS = Promise.promisifyAll(fs)
const path = require('path')
const minimatch = require('minimatch')
const url = require('url')
const jsStringEscape = require('js-string-escape')
const etag = require('etag')
const mime = require('mime')
const stripBom = require('strip-bom-buf')

const test = /{#asset ([^{}]{0,500})}/g
const imageTest = /\.(jpeg|jpg|gif|png|svg)$/
const fontTest = /\.(woff|ttf|otf|eot|woff2)$/

function isImage (name) {
  return name.match(imageTest) != null
}
function isFont (name) {
  return name.match(fontTest) != null
}

async function evaluateAssets (reporter, definition, stringToReplace, req) {
  stringToReplace += ''
  req.context.evaluateAssetsCounter = req.context.evaluateAssetsCounter || 0
  req.context.evaluateAssetsCounter++

  const replacedAssets = []

  function convert (str, p1, offset, s, done) {
    const assetName = (p1.indexOf(' @') !== -1) ? p1.substring(0, p1.indexOf(' @')) : p1

    let encoding = 'utf8'
    if (p1.indexOf(' @') !== -1) {
      const paramRaw = p1.replace(assetName, '').replace(' @', '')

      if (paramRaw.split('=').length !== 2) {
        throw new Error('Wrong asset param specification, should be {#asset name @encoding=base64}')
      }

      const paramName = paramRaw.split('=')[0]
      const paramValue = paramRaw.split('=')[1]

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

    readAsset(reporter, definition, null, assetName, encoding, req).then(function (res) {
      replacedAssets.push(assetName)
      done(null, res.content)
    }).catch(done)
  }

  const result = await asyncReplace(stringToReplace, test, convert)
  if (replacedAssets.length) {
    reporter.logger.debug('Replaced assets ' + JSON.stringify(replacedAssets), req)
  }

  if (test.test(result) && req.context.evaluateAssetsCounter < 100) {
    return evaluateAssets(reporter, definition, result, req)
  }

  return result
}

function isAssetPathValid (allowedFiles, link, absolutePath) {
  return (allowedFiles != null) && (minimatch(absolutePath, allowedFiles) || minimatch(absolutePath.replace('/', '\\'), allowedFiles) ||
    minimatch(link, allowedFiles) || minimatch(link.replace('/', '\\'), allowedFiles))
}

function linkPath (reporter, definition, link) {
  const result = path.isAbsolute(link) ? link : path.join(reporter.options.rootDirectory, link)
  let extension = path.extname(result)

  if (extension === '' || extension === '.') {
    extension = ''
  }

  if (!isAssetPathValid(definition.options.allowedFiles, link, result)) {
    throw reporter.createError(`Request to file ${result} denied. Please allow it by setting config { "extensions": { "assets": { "allowedFiles": ${extension !== '' ? `"**/foo${extension}"` : '"**/*.*"'} } } }${extension !== '' ? ` or the more general { "extensions": { "assets": { "allowedFiles": "**/*.*" } } }` : ''}`, {
      weak: true,
      statusCode: 403
    })
  }

  return result
}

async function readFile (reporter, definition, link) {
  const pathToLinkedFile = linkPath(reporter, definition, link)

  try {
    const content = await FS.readFileAsync(pathToLinkedFile)
    const stat = await FS.statAsync(pathToLinkedFile)

    return {
      content: stripBom(content),
      filename: path.basename(pathToLinkedFile),
      modified: stat.mtime
    }
  } catch (e) {
    throw reporter.createError(`Unable to find or read file ${pathToLinkedFile}`, {
      weak: true,
      original: e
    })
  }
}

function resolveAssetLink (reporter, definition, req, assetName) {
  if (definition.options.rootUrlForLinks) {
    return url.resolve(definition.options.rootUrlForLinks, 'assets/content/' + assetName)
  }

  if (!reporter.express) {
    return 'assets/content/' + assetName
  }

  const baseUrl = req.context.http ? req.context.http.baseUrl : reporter.express.localhostUrl

  return baseUrl + '/assets/content/' + assetName
}

async function readAsset (reporter, definition, id, name, encoding, req) {
  const allowAssetsLinkedToFiles = definition.options.allowAssetsLinkedToFiles !== false

  let escape = function (val) { return val }

  if (encoding === 'string') {
    escape = jsStringEscape
    encoding = 'utf8'
  }

  if (encoding === 'dataURI') {
    escape = function (val, name) {
      const type = mime.getType(name)
      const charset = type.startsWith('text') ? 'UTF-8' : null
      return 'data:' + type + (charset ? '; charset=' + charset : '') + ';base64,' + val
    }
    encoding = 'base64'
  }

  let asset

  if (id) {
    asset = await reporter.documentStore.collection('assets').findOne({
      _id: id
    }, definition.options.publicAccessEnabled ? null : req)

    if (!asset) {
      throw reporter.createError(`Unable to find asset with id ${id}`, {
        statusCode: 404,
        weak: true
      })
    }
  } else {
    const folder = await reporter.folders.resolveFolderFromPath(name, req)
    const assetNameIsPath = name.indexOf('/') !== -1
    const pathParts = name.split('/').filter((p) => p)

    if (pathParts.length === 0) {
      throw reporter.createError('Invalid asset path, path should target something', {
        statusCode: 400,
        weak: true
      })
    }

    const assetName = [...pathParts].pop()

    const nameQ = {
      name: assetName
    }

    if (folder) {
      nameQ.folder = {
        shortid: folder.shortid
      }
    } else if (
      !folder &&
      ((name.startsWith('/') && pathParts.length === 1) ||
      (req && req.context && req.context.currentFolderPath === '/'))
    ) {
      nameQ.folder = null
    }

    const folderQuery = {
      $or: [
        nameQ,
        {
          link: name
        }
      ]
    }

    let assets = await reporter.documentStore.collection('assets').find(folderQuery, definition.options.publicAccessEnabled ? null : req)

    if (!assetNameIsPath && nameQ.hasOwnProperty('folder') && assets.length === 0) {
      delete nameQ.folder
      assets = await reporter.documentStore.collection('assets').find(nameQ, definition.options.publicAccessEnabled ? null : req)
    }

    if (assets.length > 1) {
      throw reporter.createError(`Duplicated assets found for ${assetName}`, {
        statusCode: 400,
        weak: true
      })
    }

    if (assets.length === 1) {
      asset = assets[0]
    }

    if (!asset) {
      if (definition.options.searchOnDiskIfNotFoundInStore !== true) {
        throw new Error(`Asset ${name} not found`)
      }

      if (encoding === 'link') {
        return {
          content: resolveAssetLink(reporter, definition, req, name),
          filename: name
        }
      }

      let file
      try {
        file = await readFile(reporter, definition, name)
      } catch (e) {
        throw new Error(`Asset ${name} not found in the store and also not on the disk: ` + e.message)
      }

      return {
        content: escape(Buffer.from(file.content || '').toString(encoding), file.filename),
        filename: file.filename,
        modified: file.modified
      }
    }
  }

  if (encoding === 'link') {
    if (asset.link && !allowAssetsLinkedToFiles) {
      throw reporter.createError(`Can't not read asset "${name}" from .link path "${asset.link}" when "allowAssetsLinkedToFiles" option is false`, {
        statusCode: 400,
        weak: true
      })
    }

    return asset.link ? {
      content: resolveAssetLink(reporter, definition, req, asset.link),
      filename: name
    } : {
      content: resolveAssetLink(reporter, definition, req, name),
      filename: name
    }
  }

  if (asset.link) {
    if (!allowAssetsLinkedToFiles) {
      throw reporter.createError(`Can't not read asset "${name}" from .link path "${asset.link}" when "allowAssetsLinkedToFiles" option is false`, {
        statusCode: 400,
        weak: true
      })
    }

    const file = await readFile(reporter, definition, asset.link)

    return {
      content: escape(Buffer.from(file.content).toString(encoding), file.filename),
      filename: file.filename,
      modified: file.modified
    }
  }

  return {
    content: escape(Buffer.from(asset.content || '').toString(encoding), asset.name),
    filename: asset.name,
    modified: asset.modificationDate || new Date()
  }
}

module.exports = function (reporter, definition) {
  reporter.documentStore.registerEntityType('AssetType', {
    name: { type: 'Edm.String', key: true, publicKey: true },
    content: { type: 'Edm.Binary', document: { extension: 'html', content: true } },
    forceUpdate: { type: 'Edm.Boolean' },
    isSharedHelper: { type: 'Edm.Boolean' },
    link: { type: 'Edm.String' }
  })

  reporter.documentStore.registerEntitySet('assets', {
    entityType: 'jsreport.AssetType',
    splitIntoDirectories: true
  })

  reporter.addRequestContextMetaConfig('evaluateAssetsCounter', { sandboxHidden: true })

  if (reporter.options.allowLocalFilesAccess === true && !definition.options.allowedFiles && definition.options.searchOnDiskIfNotFoundInStore == null) {
    definition.options.allowedFiles = '**/*.*'
    definition.options.searchOnDiskIfNotFoundInStore = true
  }

  reporter.assets = { options: definition.options }

  reporter.on('express-configure', (app) => {
    function responseAsset (fn, req, res) {
      fn().then((asset) => {
        if (req.query.download === 'true') {
          res.setHeader('Content-Disposition', 'attachment;filename=' + asset.filename)
        }
        res.setHeader('ETag', etag(asset.content))
        res.setHeader('Cache-Control', 'public, max-age=0')
        res.setHeader('Last-Modified', asset.modified.toUTCString())

        const type = mime.getType(asset.filename)
        if (type) {
          const charset = type.startsWith('text') ? 'UTF-8' : null
          res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
        }
        res.end(asset.content, 'binary')
      }).catch(function (e) {
        reporter.logger.warn('Unable to get asset content  ' + e.stack)
        res.status(500).end(e.message)
      })
    }

    app.get('/assets/content/:path*', (req, res) => {
      const assetLink = req.params.path + req.params['0']
      responseAsset(() => readAsset(reporter, definition, null, assetLink, 'binary', req), req, res)
    })

    app.get('/assets/:id/content*', (req, res) => {
      responseAsset(() => readAsset(reporter, definition, req.params.id, null, 'binary', req), req, res)
    })

    app.get('/assets/link/:path*', (req, res) => {
      const assetLink = req.params.path + req.params['0']
      try {
        res.send(linkPath(reporter, definition, assetLink))
      } catch (e) {
        reporter.logger.warn('Unable to get asset link "' + assetLink + '" ' + e.stack)
        res.status(500).end(e.message)
      }
    })
  })

  reporter.beforeRenderListeners.insert({ after: 'scripts' }, definition.name, this, async (req, res) => {
    const sharedHelpersAssets = await reporter.documentStore.collection('assets').find({ isSharedHelper: true }, req)

    if (sharedHelpersAssets.length > 0 && typeof req.template.helpers === 'object') {
      reporter.logger.warn('Cannot add shared helpers when passing helpers as object', req)
    } else {
      const assetContents = await Promise.map(sharedHelpersAssets, (a) => readAsset(reporter, definition, a._id, null, 'utf8', req))
      req.template.helpers = req.template.helpers || ''
      assetContents.forEach((ac) => {
        if (req.template.helpers.indexOf(ac.content) === -1) {
          req.template.helpers += '\n' + ac.content
        }
      })
    }

    req.template.content = await evaluateAssets(reporter, definition, req.template.content, req)

    if (req.template.helpers && typeof req.template.helpers === 'string') {
      req.template.helpers = await evaluateAssets(reporter, definition, req.template.helpers, req)
    }
  })

  reporter.afterTemplatingEnginesExecutedListeners.add('assets', async (req, res) => {
    const result = await evaluateAssets(reporter, definition, res.content.toString(), req)
    res.content = Buffer.from(result)
  })

  reporter.initializeListeners.add('assets', () => {
    if (reporter.express) {
      reporter.express.exposeOptionsToApi(definition.name, {
        allowAssetsLinkedToFiles: definition.options.allowAssetsLinkedToFiles !== false
      })
    }

    if (definition.options.publicAccessEnabled) {
      reporter.emit('export-public-route', '/assets')
    }

    reporter.documentStore.addFileExtensionResolver(function (doc, entitySetName, entityType, propertyType) {
      if (entitySetName === 'assets' && propertyType.document.content) {
        const extensions = path.extname(doc.name).split('.')
        return extensions[extensions.length - 1]
      }
    })

    if (reporter.beforeScriptListeners) {
      reporter.beforeScriptListeners.add('assets', function (scriptDef, req) {
        return evaluateAssets(reporter, definition, scriptDef.script, req).then(function (result) {
          scriptDef.script = result
        })
      })
    }

    reporter.documentStore.collection('assets').beforeInsertListeners.add('assets', async (entity) => {
      const allowAssetsLinkedToFiles = definition.options.allowAssetsLinkedToFiles !== false

      delete entity.forceUpdate

      if (entity.link) {
        if (!allowAssetsLinkedToFiles) {
          throw reporter.createError(`Can't set .link in asset when "allowAssetsLinkedToFiles" option is false`, {
            statusCode: 400,
            weak: true
          })
        }

        entity.name = path.basename(entity.link)
        await readFile(reporter, definition, entity.link)
        return entity
      }
    })

    reporter.documentStore.collection('assets').beforeUpdateListeners.add('assets', async (query, update) => {
      const allowAssetsLinkedToFiles = definition.options.allowAssetsLinkedToFiles !== false

      if (update.$set.link && !allowAssetsLinkedToFiles) {
        throw reporter.createError(`Can't set .link in asset when "allowAssetsLinkedToFiles" option is false`, {
          statusCode: 400,
          weak: true
        })
      }

      if (query._id && update.$set && update.$set.forceUpdate && update.$set.link) {
        try {
          await FS.writeFileAsync(linkPath(reporter, definition, update.$set.link), update.$set.content)
          delete update.$set.forceUpdate
          delete update.$set.content
        } catch (e) {
          throw reporter.createError(`Unable to access file ${linkPath(reporter, definition, update.$set.link)}`, {
            weak: true,
            original: e
          })
        }
      } else {
        delete update.$set.forceUpdate
      }
    })
  })
}

module.exports.isAssetPathValid = isAssetPathValid
