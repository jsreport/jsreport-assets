var main = require('./lib/assets.js')
var config = require('./jsreport.config.js')

module.exports = function (options) {
  config.options = options

  config.optionsSchema = {
    extensions: {
      assets: {
        type: 'object',
        properties: {
          allowedFiles: { type: 'string' },
          searchOnDiskIfNotFoundInStore: { type: 'boolean' },
          rootUrlForLinks: { type: 'string' },
          publicAccessEnabled: { type: 'boolean' }
        }
      }
    }
  }

  config.main = main
  config.directory = __dirname
  return config
}
