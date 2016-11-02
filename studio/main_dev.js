import AssetEditor from './AssetEditor.js'
import AssetUploadButton from './AssetUploadButton.js'
import NewAssetModal from './NewAssetModal.js'
import AssetProperties from './AssetProperties.js'
import Studio from 'jsreport-studio'

Studio.addEntitySet({
  name: 'assets',
  faIcon: 'fa-file',
  visibleName: 'asset',
  onNew: () => Studio.openModal(NewAssetModal)
})

Studio.addEditorComponent('files', AssetEditor)
Studio.addToolbarComponent(AssetUploadButton)
Studio.addPropertiesComponent(AssetProperties.title, AssetProperties, (entity) => entity.__entitySet === 'assets')
