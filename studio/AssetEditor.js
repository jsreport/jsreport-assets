import React, { Component } from 'react'
import AssetUploadButton from './AssetUploadButton.js'
import Studio, { TextEditor } from 'jsreport-studio'

export default class FileEditor extends Component {
  constructor () {
    super()
    this.state = { isMetaView: true }
  }

  async openEditor () {
    const { entity } = this.props

    var content = entity.content
    if (entity.link && !entity.content) {
      content = await Studio.api.get(`api/asset/${entity.name}`, { parseJSON: false })
    }

    this.setState({ isMetaView: false, content: content })
  }

  async componentDidUpdate () {
    const { entity } = this.props

    if (entity.link && (!this.state.link || this.state.link.indexOf(entity.link) === -1)) {
      try {
        const link = await Studio.api.get(`api/asset/link/${encodeURIComponent(entity.link)}`, { parseJSON: false })
        this.setState({ link: link })
      } catch (e) {

      }
    }
  }

  render () {
    const { entity, onUpdate } = this.props
    const { isMetaView, content, link } = this.state
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
      <p><i>assets extension is currently in beta</i></p>

      {link ? <p>Asset is linked to file: {link}</p> : <div />}

      <p>
        Embed into a template content, template helpers using or a custom script:
        <code>
          <h3 style={{textTransform: 'none'}}>
            { '{#asset ' + entity.name + '}'}
          </h3>

          <h3 style={{textTransform: 'none'}}>
            { '{#asset ' + entity.name + ' @encoding=utf8|base64|javascript}'}
          </h3>
        </code>
      </p>
      <div>
        <a className='button confirmation' target='_blank' href={downloadUrl}>
          <i className='fa fa-download' /> Download file
        </a>
        {entity.link
          ? <span /> : <button className='button confirmation' onClick={() => AssetUploadButton.OpenUpload()}><i className='fa fa-upload' />
          Upload file</button>}
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

