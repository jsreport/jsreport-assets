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

  async createAsset () {
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
      <div className='form-group'>
        <label>link to existing file</label>
        <input
          type='checkbox' checked={isLink}
          onChange={() => this.setState({ isLink: !isLink })} />
      </div>
      {isLink ? <div className='form-group'>
        <label>Relative or absolute path to existing file</label>
        <input type='text' name='link' ref='link' />
      </div> : <div className='form-group'>
        <label>Name</label>
        <input type='text' name='name' ref='name' />
      </div>
      }
      <div className='form-group'>
        <span
          style={{color: 'red', display: error ? 'block' : 'none'}}>{error}</span>
      </div>
      <div className='button-bar'>
        <button
          className='button confirmation'
          onClick={() => { this.props.close(); AssetUploadButton.OpenUploadNew() }}>Upload
        </button>
        <button className={'button confirmation'} onClick={() => this.createAsset()}>Ok</button>
      </div>
    </div>
  }
}

