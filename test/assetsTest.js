require('should')
var Reporter = require('jsreport-core')
var isAssetPathValid = require('../lib/assets').isAssetPathValid
var request = require('supertest')

describe('assets', function () {
  var reporter

  beforeEach(function () {
    reporter = Reporter()
      .use(require('jsreport-templates')())
      .use(require('jsreport-jsrender')())
      .use(require('jsreport-scripts')())
      .use(require('../')())

    return reporter.init()
  })

  it('should handle normal render request', function () {
    return reporter.render({
      template: {
        content: 'foo',
        recipe: 'html',
        engine: 'none'
      }
    }).then(function (res) {
      res.content.toString().should.be.eql('foo')
    })
  })

  it('should extract static asset', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      content: 'hello'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset foo.html}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should extract static asset which is marked as shared helper', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      isSharedHelper: true,
      content: 'function foo() { return "hello" }'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{{:~foo()}}',
          recipe: 'html',
          engine: 'jsrender'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should extract static asset as base64 when @encoding=base64', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      content: 'hello'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset foo.html @encoding=base64}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql(new Buffer('hello').toString('base64'))
      })
    })
  })

  it('should extract static asset as data uri when @encoding=dataURI', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.png',
      content: 'hello'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset foo.png @encoding=dataURI}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('data:image/png;base64,' + new Buffer('hello').toString('base64'))
      })
    })
  })

  it('should fail for asset with @encoding=dataURI but no image', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      content: 'hello'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset foo.html @encoding=dataURI}',
          recipe: 'html',
          engine: 'none'
        }
      }).catch(function () {
        return 'ok'
      }).then(function (res) {
        res.should.be.eql('ok')
      })
    })
  })

  it('should extract static asset with name dynamically constructed by templating engine', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'a.html',
      content: 'hello'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset {{:~foo()}}}',
          recipe: 'html',
          helpers: 'function foo() { return "a.html" }',
          engine: 'jsrender'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should extract assets recursively', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'a.html',
      content: '{#asset b.html}'
    }).then(function () {
      return reporter.documentStore.collection('assets').insert({
        name: 'b.html',
        content: 'hello'
      }).then(function () {
        return reporter.render({
          template: {
            content: '{#asset a.html}',
            recipe: 'html',
            engine: 'none'
          }
        }).then(function (res) {
          res.content.toString().should.be.eql('hello')
        })
      })
    })
  })

  it('should not fail with circle in asset references', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'a.html',
      content: '{#asset b.html}'
    }).then(function () {
      return reporter.documentStore.collection('assets').insert({
        name: 'b.html',
        content: '{#asset a.html}'
      }).then(function () {
        return reporter.render({
          template: {
            content: '{#asset a.html}',
            recipe: 'html',
            engine: 'none'
          }
        }).then(function (res) {
          res.content.toString().should.be.eql('{#asset b.html}')
        })
      })
    })
  })

  it('should be able to link external file and extract it', function () {
    reporter.options.assets = { allowedFiles: '**/test.html' }
    return reporter.documentStore.collection('assets').insert({
      name: 'test.html',
      link: 'test/test.html'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset test.html}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should be able to link external file as base64 and extract it', function () {
    reporter.options.assets = { allowedFiles: '**/test.html' }
    return reporter.documentStore.collection('assets').insert({
      name: 'test.html',
      link: 'test/test.html'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset test.html @encoding=base64}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.be.eql(new Buffer('hello').toString('base64'))
      })
    })
  })

  it('should deny insert not allowed external files', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'test.html',
      link: 'test/test.html'
    }).catch(function (res) {
      return 'ok'
    }).then(function (m) {
      m.should.be.eql('ok')
    })
  })

  it('should extract assets also from scripts', function () {
    return reporter.documentStore.collection('assets').insert({
      name: 'foo.json',
      content: '{ a: "hello" }'
    }).then(function () {
      return reporter.render({
        template: {
          content: ' ',
          recipe: 'html',
          engine: 'none',
          scripts: [{
            content: 'function beforeRender(req, res, done) { var x = {#asset foo.json}; req.template.content = x.a; done() }'
          }]
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should find assets on disk if not found in store but searchOnDiskIfNotFoundInStore is true', function () {
    reporter.options.assets.searchOnDiskIfNotFoundInStore = true
    reporter.options.assets.allowedFiles = 'test/test.html'

    return reporter.render({
      template: {
        content: '{#asset test/test.html}',
        recipe: 'html',
        engine: 'none'
      }
    }).then(function (res) {
      res.content.toString().should.be.eql('hello')
    })
  })

  it('should escape js string when encoding string', function () {
    reporter.options.assets.allowedFiles = 'test/helpers.js'

    return reporter.documentStore.collection('assets').insert({
      name: 'helpers.js',
      link: 'test/helpers.js'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{{:~foo()}}',
          recipe: 'html',
          engine: 'jsrender',
          scripts: [{
            content: 'function beforeRender(req, res, done) { req.template.helpers = "{#asset helpers.js @encoding=string}"; done() }'
          }]
        }
      }).then(function (res) {
        res.content.toString().should.be.eql('hello')
      })
    })
  })

  it('should return link based on rootUrlForLinks if encoding is link', function () {
    reporter.options.assets.allowedFiles = 'test/helpers.js'
    reporter.options.assets.rootUrlForLinks = 'http://localhost:123'

    return reporter.documentStore.collection('assets').insert({
      name: 'helpers.js',
      link: 'test/helpers.js'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset helpers.js @encoding=link}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.containEql('http://localhost:123/assets/content/test/helpers.js')
      })
    })
  })

  it('should return link based on localhost if not rootUrlForLinks and not url', function () {
    reporter.options.assets.allowedFiles = 'test/helpers.js'

    return reporter.documentStore.collection('assets').insert({
      name: 'helpers.js',
      link: 'test/helpers.js'
    }).then(function () {
      return reporter.render({
        template: {
          content: '{#asset helpers.js @encoding=link}',
          recipe: 'html',
          engine: 'none'
        }
      }).then(function (res) {
        res.content.toString().should.containEql('https://localhost/assets/content/test/helpers.js')
      })
    })
  })

  it('should fail if asset doesn\'t exist', function () {
    return reporter.render({
      template: {
        content: '{#asset a.html}',
        recipe: 'html',
        engine: 'none'
      }
    }).catch(function (e) {
      return 'ok'
    }).then(function (m) {
      m.should.be.eql('ok')
    })
  })
})

describe('assets with express', function () {
  var reporter

  beforeEach(function () {
    reporter = Reporter()
      .use(require('jsreport-express')())
      .use(require('../')())

    return reporter.init()
  })

  it('should expose odata endpoint', function (done) {
    request(reporter.express.app)
      .get('/odata/assets')
      .expect(200, done)
  })

  it('/assets/content/foo.html should return content with correct headers', function (done) {
    reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      content: 'hello'
    }).then(function () {
      request(reporter.express.app)
        .get('/assets/content/foo.html')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect('Cache-Control', 'public, max-age=0')
        .expect('Last-Modified', /.+/)
        .expect('ETag', /.+/)
        .expect('hello', done)
    }).catch(done)
  })

  it('/assets/content/test.html should return content with correct headers for linked file', function (done) {
    reporter.options.assets = { allowedFiles: '**/test.html' }
    reporter.documentStore.collection('assets').insert({
      name: 'test.html',
      link: 'test/test.html'
    }).then(function () {
      request(reporter.express.app)
        .get('/assets/content/test.html')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect('Cache-Control', 'public, max-age=0')
        .expect('Last-Modified', /.+/)
        .expect('ETag', /.+/)
        .expect('hello', done)
    }).catch(done)
  })

  it('/assets/content/test/test.html) should return content with correct headers for external file', function (done) {
    reporter.options.assets.searchOnDiskIfNotFoundInStore = true
    reporter.options.assets.allowedFiles = 'test/test.html'

    request(reporter.express.app)
      .get('/assets/content/test/test.html')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect('Cache-Control', 'public, max-age=0')
      .expect('Last-Modified', /.+/)
      .expect('ETag', /.+/)
      .expect('hello', done)
  })

  it('/assets/link/test/test.html should return link', function (done) {
    reporter.options.assets.searchOnDiskIfNotFoundInStore = true
    reporter.options.assets.allowedFiles = 'test/test.html'

    request(reporter.express.app)
      .get('/assets/link/test/test.html')
      .expect(200)
      .expect(/test.html/, done)
  })

  it('/assets/content/test/test with space.html) should return content with correct headers for external file', function (done) {
    reporter.options.assets.searchOnDiskIfNotFoundInStore = true
    reporter.options.assets.allowedFiles = 'test/test with space.html'

    request(reporter.express.app)
      .get('/assets/content/test/test with space.html')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect('Cache-Control', 'public, max-age=0')
      .expect('Last-Modified', /.+/)
      .expect('ETag', /.+/)
      .expect('hello', done)
  })

  it('/assets/content/foo.html&download=true should return content as attachment', function (done) {
    reporter.documentStore.collection('assets').insert({
      name: 'foo.html',
      content: 'hello'
    }).then(function () {
      request(reporter.express.app)
        .get('/assets/content/foo.html?download=true')
        .expect(200)
        .expect('Content-Disposition', 'attachment;filename=foo.html')
        .expect('hello', done)
    }).catch(done)
  })
})

describe('isAssetPathValid', function () {
  it('* match test.js', function () {
    isAssetPathValid('**/*.*', '../test.js', '/data/root/test.js').should.be.true()
  })

  it('test.js should not match foo.js', function () {
    isAssetPathValid('test.js', '../foo.js', '/data/root/foo.js').should.be.false()
  })

  it('**/test.js should match data/test.js', function () {
    isAssetPathValid('**/test.js', 'data/test.js', '/foo/data/test.js').should.be.true()
  })

  it('data/test.js should match data/test.js', function () {
    isAssetPathValid('data/test.js', 'data/test.js', '/foo/data/test.js').should.be.true()
  })

  it('+(bar|foo)/test.js should match both bar/test.js and foo/test.js but not data/test.js', function () {
    isAssetPathValid('+(bar|foo)/test.js', 'bar/test.js', '/foo/bar/test.js').should.be.true()
    isAssetPathValid('+(bar|foo)/test.js', 'foo/test.js', '/foo/fioo/test.js').should.be.true()
    isAssetPathValid('+(bar|foo)/test.js', 'data/test.js', '/foo/data/test.js').should.be.false()
  })

  it('+(bar|foo)/+(*.js|*.css) should match both bar/test.js and foo/test.css but not bar/test.txt', function () {
    isAssetPathValid('+(bar|foo)/+(*.js|*.css)', 'bar/test.js', '/foo/bar/test.js').should.be.true()
    isAssetPathValid('+(bar|foo)/+(*.js|*.css)', 'foo/test.css', '/foo/fioo/test.css').should.be.true()
    isAssetPathValid('+(bar|foo)/+(*.js|*.css)', 'bar/test.txt', 'foo/bar/test.txt').should.be.false()
  })

  it('undefined allowedFiles should not match', function () {
    isAssetPathValid(undefined, 'test/test.html', 'E:\\work\\jsreport\\jsreport-assets\\test\\test.html').should.be.false()
  })
})
