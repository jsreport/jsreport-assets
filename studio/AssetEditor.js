import React, { Component } from 'react'
import AssetUploadButton from './AssetUploadButton.js'
import Studio, { TextEditor } from 'jsreport-studio'
import superagent from 'superagent'
import Promise from 'bluebird'

// Studio.api currently always open dialogs on failures and that is what we don't want, so arbitrary implementaiton here
const getTextFromApi = (path) => {
  return new Promise((resolve, reject) => {
    const request = superagent.get(Studio.resolveUrl(path))
    request.end((err, { text } = {}) => err ? reject(new Error(text || err.toString())) : resolve(text))
  })
}

export default class FileEditor extends Component {
  constructor () {
    super()
    this.state = { isMetaView: true }
  }

  async openEditor () {
    const { entity } = this.props

    var content = entity.content
    if (entity.link && !entity.content && !this.state.loadFailed) {
      try {
        await Studio.saveEntity(entity._id)
        content = btoa(await Studio.api.get(`assets/content/${entity.name}`, { parseJSON: false }))
      } catch (e) {
        this.setState({ loadFailed: true })
        throw e
      }
    }

    this.setState({ isMetaView: false, content: content })
  }

  async componentDidUpdate (prevProps) {
    const { entity } = this.props

    if (entity.link && (!this.state.link || prevProps.entity.link !== entity.link) && !this.state.loadFailed) {
      try {
        const link = await getTextFromApi(`assets/link/${entity.link}`)
        this.setState({ link: link })
      } catch (e) {
        this.setState({ link: e.message })
      }
    }
  }

  isImage (entity) {
    return entity.name.match(/\.(jpeg|jpg|gif|png|svg)$/) != null
  }

  render () {
    const { entity, onUpdate } = this.props
    const { isMetaView, content, link } = this.state
    const downloadUrl = Studio.resolveUrl(`assets/content/${entity.name}?download=true`)

    let parts = entity.name.split('.')
    let mode = parts[parts.length - 1]
    if (mode === 'js') {
      mode = 'javascript'
    }
    if (mode === 'html') {
      mode = 'handlebars'
    }

    return (isMetaView ? <div className='custom-editor'>
      <div><h1><i className='fa fa-file' /> {entity.name}</h1></div>
      <p><i>assets extension is currently in beta</i></p>

      {link ? <p>Asset is linked to file: {link}</p> : <div />}

      {entity.isSharedHelper ? <p>Asset is marked as shared helper and will be part of every template helper functions</p> : <div />}

      <div>
        Embed into a template content, template helpers using or a custom script:
        <code>
          <h3 style={{textTransform: 'none'}}>
            { '{#asset ' + entity.name + '}'}
          </h3>

          <h3 style={{textTransform: 'none'}}>
            { '{#asset ' + entity.name + ' @encoding=utf8|base64|string|link|dataURI}'}
          </h3>

          {this.isImage(entity) ? <h3 style={{textTransform: 'none'}}>
            { '<img src="{#asset ' + entity.name + ' @encoding=dataURI}" />'}
          </h3> : <span />}
        </code>
      </div>
      <div>
        <a className='button confirmation' target='_blank' href={downloadUrl}>
          <i className='fa fa-download' /> Download file
        </a>
        {entity.link
          ? <span /> : <button className='button confirmation' onClick={() => AssetUploadButton.OpenUpload()}><i className='fa fa-upload' />
          Upload file</button>}
        {this.isImage(entity) ? <span /> : <button className='button confirmation' onClick={() => this.openEditor()}>
          <i className='fa fa-folder-open' /> Open in editor
        </button>
        }
      </div>
      <div style={{overflow: 'auto'}}>
        {this.isImage(entity) ? <img src={Studio.resolveUrl(`assets/content/${entity.name}?v=${new Date().getTime()}`)} style={{display: 'block', margin: '3rem auto'}} /> : <span />}
      </div>
    </div> : <TextEditor
      name={entity._id}
      mode={mode}
      value={atob(((entity.content || entity.forceUpdate) ? entity.content : content) || '')}
      onUpdate={(v) => onUpdate(Object.assign({}, entity, {content: btoa(v), forceUpdate: true}))} />)
  }
}

