import AssetEditor from './AssetEditor.js'
import AssetUploadButton from './AssetUploadButton.js'
import NewAssetModal from './NewAssetModal.js'
import AssetProperties from './AssetProperties.js'
import Studio from 'jsreport-studio'

Studio.addEntitySet({
  name: 'assets',
  faIcon: 'fa-file',
  visibleName: 'asset',
  onNew: () => Studio.openModal(NewAssetModal),
  referenceAttributes: ['isSharedHelper'],
  entityTreePosition: 700
})

Studio.addEditorComponent('assets', AssetEditor)
Studio.addToolbarComponent(AssetUploadButton)
Studio.addPropertiesComponent(AssetProperties.title, AssetProperties, (entity) => entity.__entitySet === 'assets')

Studio.entityTreeIconResolvers.push((entity) => {
  if (entity.__entitySet !== 'assets') {
    return
  }

  const parts = entity.name.split('.')

  if (parts.length === 1) {
    return
  }

  const extension = parts[parts.length - 1]

  switch (extension) {
    case 'html': return 'fa-html5'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg': return 'fa-camera'
    case 'js': return entity.isSharedHelper ? 'fa-cogs' : 'fa-cog'
    case 'css': return 'fa-css3'
    default: return 'fa-file-o '
  }
})
