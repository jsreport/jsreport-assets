import React, { Component } from 'react'
import AssetUploadButton from './AssetUploadButton.js'
import fileSaver from 'filesaver.js-npm'
import { TextEditor } from 'jsreport-studio'
import Studio from 'jsreport-studio'

export default class FileEditor extends Component {
  constructor () {
    super()
    this.state = { isMetaView: true }
  }

  async openEditor () {
    const { entity } = this.props

    var content = entity.content
    if (entity.link && !entity.content) {
      const response = await Studio.api.get(`api/asset/${entity.name}`, { parseJSON: false })
      content = response
      //Studio.updateEntity({ _id: entity._id, content: btoa(response) })
    }

    this.setState({ isMetaView: false, content: content })
  }

  render () {
    const { entity, onUpdate } = this.props
    const { isMetaView, content } = this.state
    const downloadUrl = Studio.resolveUrl(`api/asset/${entity.name}`)
    let mode = 'text'
    if (entity.name.includes('.js')) {
      mode = 'javascript'
    }

    if (entity.name.includes('.css')) {
      mode = 'css'
    }

    if (entity.name.includes('.html')) {
      mode = 'html'
    }

    return (isMetaView ? <div className='custom-editor'>
      <div><h1><i className='fa fa-file' /> {entity.name}</h1></div>
      <div>
        <div>Embed into a template content, template helpers using or a custom script:
          <code>
            <h2 style={{textTransform: 'none'}}>
              { '\{#asset ' + entity.name + '}'}
            </h2>
            <h2 style={{textTransform: 'none'}}>
              { '\{#asset ' + entity.name + ' @encoding=base64}'}
            </h2>
          </code>
        </div>
      </div>
      <div>
        <a className='button confirmation' target='_blank' href={downloadUrl}>
          <i className='fa fa-download' /> Download file
        </a>
        {entity.link ? <span /> :
          <button className='button confirmation' onClick={() => AssetUploadButton.OpenUpload()}>
            <i className='fa fa-upload' /> Upload file
          </button>}
        <button className='button confirmation' onClick={() => this.openEditor()}>
          <i className='fa fa-folder-open' /> Open in editor
        </button>
      </div>
    </div> : <TextEditor
      name={entity._id}
      mode={mode}
      value={entity.content ? atob(entity.content) : content}
      onUpdate={(v) => onUpdate(Object.assign({}, entity, {content: btoa(v)}))}
      />)
  }
}

