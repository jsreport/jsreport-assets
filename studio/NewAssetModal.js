import React, {Component, PropTypes} from 'react'
import AssetUploadButton from './AssetUploadButton.js'
import Studio from 'jsreport-studio'

export default class NewAssetModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { isLink: false }
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.createAsset()
    }
  }

  // the modal component for some reason after open focuses the panel itself
  componentDidMount () {
    setTimeout(() => this.refs.name.focus(), 0)
  }

  async createAsset (e) {
    let entity = {}

    if (!this.state.isLink && (!this.refs.name.value || this.refs.name.value.indexOf('.')) < 0) {
      return this.setState({ error: 'name should include file extension, for example foo.js' })
    }

    if (this.state.isLink) {
      entity.link = this.refs.link.value
    } else {
      entity.name = this.refs.name.value
    }

    try {
      let response = await Studio.api.post('/odata/assets', {
        data: entity
      })
      response.__entitySet = 'assets'

      Studio.addExistingEntity(response)
      Studio.openTab(response)
      this.props.close()
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  render () {
    const { isLink, error } = this.state

    return <div>
      {isLink ? <div className='form-group'>
        <label>Relative or absolute path to existing file</label>
        <input type='text' name='link' ref='link' />
      </div> : <div className='form-group'>
        <label>Name</label>
        <input type='text' name='name' ref='name' placeholder='styles.css' onKeyPress={(e) => this.handleKeyPress(e)} />
      </div>
      }
      {Studio.extensions.assets.options.allowAssetsLinkedToFiles !== false ? <div className='form-group'>
        <label>link to existing file</label>
        <input
          type='checkbox' checked={isLink}
          onChange={() => this.setState({ isLink: !isLink })} />
      </div> : <div />}
      <div className='form-group'>
        <span
          style={{color: 'red', display: error ? 'block' : 'none'}}>{error}</span>
      </div>
      <div className='form-group' style={{opacity: 0.8}}>
        <hr />
        <span>You can use assets to embed any kind of static content into report template.<br />
          This can be for example css style, image, font, html or even javascript shared helpers. <br />See the <a
            target='_blank' title='Help' href='http://jsreport.net/learn/assets'>documentation</a> for details.
        </span>
      </div>
      <div className='button-bar'>
        <button
          className='button confirmation'
          onClick={() => { this.props.close(); AssetUploadButton.OpenUploadNew() }}>Upload
        </button>
        <button onClick={() => this.createAsset()} className={'button confirmation'}>Ok</button>
      </div>
    </div>
  }
}

