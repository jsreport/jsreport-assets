
module.exports = {
  'name': 'assets',
  'main': './lib/assets.js',
  'optionsSchema': {
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
  },
  'dependencies': ['scripts', 'templates']
}
