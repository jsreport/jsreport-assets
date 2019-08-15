import React, { Component } from 'react'
import AssetUploadButton from './AssetUploadButton'
import Studio from 'jsreport-studio'
import style from './AssetEditor.scss'

const Preview = Studio.Preview

class OfficeAssetEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      previewOpen: false
    }
  }

  isPreviewEnabled () {
    return Studio.extensions.assets.options.officePreview.enabled !== false
  }

  preview (entity) {
    const previewEnabled = this.isPreviewEnabled()

    if (!previewEnabled) {
      return
    }

    if (
      Studio.extensions.assets.options.officePreview.showWarning !== false &&
      Studio.getSettingValueByKey('office-preview-informed', false) === false
    ) {
      Studio.setSetting('office-preview-informed', true)

      Studio.openModal(() => (
        <div>
          We need to upload your office asset to our publicly hosted server to be able to use
          Office Online Service for previewing here in the studio. You can disable it in the configuration, see <a
            href='https://jsreport.net/learn/xlsx#preview-in-studio' target='_blank'>the docs</a> for details.
        </div>
      ))
    }

    if (this.state.previewOpen) {
      this.clearPreview(() => {
        this.preview(entity)
      })
    } else {
      Studio.startProgress()

      this.setState({
        loading: true,
        previewOpen: true
      })
    }
  }

  clearPreview (done) {
    this.setState({
      previewOpen: false
    }, () => done && done())
  }

  onOfficeAssetLoad () {
    Studio.stopProgress()

    this.setState({
      loading: false
    })
  }

  render () {
    const previewEnabled = this.isPreviewEnabled()
    const { loading, previewOpen } = this.state
    const { entity, displayName, emptyMessage, icon } = this.props

    let visibleName = displayName

    if (!visibleName && entity) {
      visibleName = entity.name
    }

    if (!visibleName) {
      visibleName = '<none>'
    }

    return (
      <div className='block'>
        <div className={style.toolbarContainer}>
          <h3 style={{ display: 'inline-block', margin: '0px', marginLeft: '0.6rem' }}><i className={`fa ${icon || 'fa-file-o'}`} /> {visibleName}</h3>
          {entity != null && (
            <a className='button confirmation' target='_blank' href={Studio.resolveUrl(`assets/${entity._id}/content?download=true`)}>
              <i className='fa fa-download' /> Download
            </a>
          )}
          {entity != null && (
            <button className='button confirmation' onClick={() => AssetUploadButton.OpenUpload({
              targetAsset: {
                _id: entity._id,
                name: entity.name
              },
              uploadCallback: () => {
                const wasOpen = this.state.previewOpen

                this.clearPreview(() => {
                  if (wasOpen) {
                    this.preview(entity)
                  }
                })
              }
            })}>
              <i className='fa fa-upload' /> Upload
            </button>
          )}
          {entity != null && (
            <button className={`button confirmation ${!previewEnabled || loading ? 'disabled' : ''}`} onClick={() => this.preview(entity)}>
              <i className={`fa fa-${loading ? '' : previewOpen ? 'retweet' : 'search'}`} /> {loading ? 'Loading..' : previewOpen ? 'Refresh' : 'Preview'}
            </button>
          )}
          {entity != null && previewOpen && !loading && (
            <button className={`button confirmation ${!previewEnabled || loading ? 'disabled' : ''}`} onClick={() => this.clearPreview()}>
              <i className='fa fa-times' /> Clear
            </button>
          )}
        </div>
        {entity != null && previewOpen && (
          <Preview
            ref='officeAssetPreview'
            onLoad={() => this.onOfficeAssetLoad()}
            initialSrc={Studio.resolveUrl(`assets/office/${entity._id}/content`)}
          />
        )}
        {entity == null && (
          <div style={{ padding: '2rem' }}>
            <i>{emptyMessage != null ? emptyMessage : 'Asset is empty'}</i>
          </div>
        )}
      </div>
    )
  }
}

export default OfficeAssetEditor
