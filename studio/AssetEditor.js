import React, { Component } from 'react'
import AssetUploadButton from './AssetUploadButton.js'
import Studio, { TextEditor } from 'jsreport-studio'
import superagent from 'superagent'
import Promise from 'bluebird'
import CopyToClipboard from 'react-copy-to-clipboard'
import binaryExtensions from 'binary-extensions'

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
    this.state = { }
  }

  async componentDidMount () {
    const { entity } = this.props

    var content = entity.content

    if (entity.link) {
      await Studio.saveEntity(entity._id)
      const ab = await Studio.api.get(`assets/${entity._id}/content`, { responseType: 'arraybuffer' })
      const str = String.fromCharCode.apply(null, new Uint8Array(ab))
      const fixedStr = decodeURIComponent(escape(str))
      content = btoa(unescape(encodeURIComponent(fixedStr)))
    }

    this.setState({ content, loadingFinished: true })
  }

  async componentDidUpdate (prevProps) {
    const { entity } = this.props

    if (entity.link && (!this.state.link || prevProps.entity.link !== entity.link)) {
      try {
        const link = await getTextFromApi(`assets/link/${encodeURIComponent(entity.link)}`)
        this.setState({ link: link })
      } catch (e) {
        this.setState({ link: e.message })
      }
    }
  }

  isImage (entity) {
    return entity.name.match(/\.(jpeg|jpg|gif|png|svg)$/) != null
  }

  isFont (entity) {
    return entity.name.match(/\.(otf|woff|ttf|eot|woff2)$/) != null
  }

  isPdf (entity) {
    return entity.name.match(/\.(pdf)$/) != null
  }

  getFormat (extension) {
    switch (extension) {
      case 'ttf': return 'truetype'
      case 'woff2': return 'woff2'
      case 'eot': return 'embedded-opentype'
      default: return 'woff'
    }
  }

  getEmbeddingCode (entity) {
    let parts = entity.name.split('.')
    let extension = parts[parts.length - 1]

    if (this.isImage(entity)) {
      return `<img src="{#asset ${Studio.resolveEntityPath(entity)} @encoding=dataURI}" />`
    }

    if (this.isFont(entity)) {
      return `@font-face {
  font-family: '${parts[0]}';
  src: url({#asset ${Studio.resolveEntityPath(entity)} @encoding=dataURI});
  format('${this.getFormat(extension)}');
}`
    }

    return `{#asset ${Studio.resolveEntityPath(entity)} @encoding=utf8}`
  }

  renderBinary (entity) {
    return <div className='custom-editor'>
      <div>
        <h1><i className='fa fa-file-o' /> {entity.name}</h1>
      </div>
      <div>
        <a className='button confirmation' target='_blank' href={Studio.resolveUrl(`assets/${entity._id}/content?download=true`)} title='Download'>
          <i className='fa fa-download' /> Download
        </a>
        <button className='button confirmation' onClick={() => AssetUploadButton.OpenUpload(false)}>
          <i className='fa fa-upload' /> Upload
        </button>
      </div>
    </div>
  }

  renderEditor (entity) {
    let parts = entity.name.split('.')
    let extension = parts[parts.length - 1]

    if (this.isImage(entity)) {
      return <div style={{overflow: 'auto'}}><img src={Studio.resolveUrl(`assets/${entity._id}/content?v=${new Date().getTime()}`)}
        style={{display: 'block', margin: '3rem auto'}} /></div>
    }

    if (this.isFont(entity)) {
      let newStyle = document.createElement('style')
      newStyle.appendChild(document.createTextNode(`@font-face {
         font-family: '${parts[0]}';
         src: url('${Studio.resolveUrl(`/assets/${entity._id}/content`)}');
         format('${extension === 'ttf' ? 'truetype' : 'woff'}');
        }`))

      document.head.appendChild(newStyle)

      return <div style={{overflow: 'auto', fontFamily: parts[0], padding: '2rem'}}><h1> Hello world font {entity.name}</h1>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>
    }

    if (this.isPdf(entity)) {
      return <div className='block' style={{height: '100%'}}><object style={{height: '100%'}} data={Studio.resolveUrl(`assets/${entity._id}/content?v=${new Date().getTime()}`)} type='application/pdf'>
        <embed src={Studio.resolveUrl(`assets/${entity._id}/content?v=${new Date().getTime()}`)} type='application/pdf' />
      </object></div>
    }

    if (entity.name.split('.').length > 1 && binaryExtensions.includes(entity.name.split('.')[1])) {
      return this.renderBinary(entity)
    }

    let mode = parts[parts.length - 1]
    if (extension === 'js') {
      mode = 'javascript'
    }
    if (extension === 'html') {
      mode = 'handlebars'
    }

    const content = ((entity.content || entity.forceUpdate) ? entity.content : this.state.content) || ''

    return <TextEditor
      name={entity._id}
      mode={mode}
      value={decodeURIComponent(escape(atob(content)))}
      onUpdate={(v) => this.props.onUpdate(Object.assign({}, entity, {content: btoa(unescape(encodeURIComponent(v))), forceUpdate: true}))} />
  }

  render () {
    const { entity } = this.props
    const { link, loadingFinished } = this.state
    const downloadUrl = Studio.resolveUrl(`assets/${entity._id}/content?download=true`)

    const toolbarButtonStyle = {
      color: '#007ACC',
      fontSize: '1.2rem'
    }

    if (!loadingFinished) {
      return <div />
    }

    return (<div className='block'>
      <div style={{padding: '0.6rem 0 0.4rem 0', backgroundColor: '#F6F6F6'}}>
        <div>
          <CopyToClipboard text={this.getEmbeddingCode(entity)}>
            <a className='button' style={toolbarButtonStyle} title='Coppy the embedding code to clipboard'>
              <i className='fa fa-clipboard' />
            </a>
          </CopyToClipboard>
          <a className='button' style={toolbarButtonStyle} target='_blank' href={downloadUrl} title='Download asset'>
            <i className='fa fa-download' />
          </a>
          {entity.link ? (
            <span style={{ margin: '0.6rem' }}>{link}</span>
          ) : (
            <a className='button' style={toolbarButtonStyle} title='Upload asset' onClick={() => AssetUploadButton.OpenUpload()}>
              <i className='fa fa-upload' />
            </a>
          )}
          <a className='button' style={{...toolbarButtonStyle, marginRight: 'auto'}} target='_blank' title='Help' href='http://jsreport.net/learn/assets'>
            <i className='fa fa-question' />
          </a>
        </div>
      </div>
      {this.renderEditor(entity)}
    </div>)
  }
}
