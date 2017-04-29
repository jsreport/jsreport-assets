import React, { Component } from 'react'
import Studio from 'jsreport-studio'

let _fileUploadButton

export default class AssetUploadButton extends Component {
  // we need to have global action in main_dev which is triggered when users clicks on + on images
  // this triggers invisible button in the toolbar
  static OpenUpload () {
    _fileUploadButton.openFileDialog('edit')
  }

  static OpenUploadNew () {
    _fileUploadButton.openFileDialog('new')
  }

  componentDidMount () {
    _fileUploadButton = this
  }

  upload (e) {
    if (!e.target.files.length) {
      return
    }

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      this.refs.file.value = ''
      if (this.type === 'new') {
        if (Studio.workspaces) {
          await Studio.workspaces.save()
        }

        let response = await Studio.api.post('/odata/assets', {
          data: {
            content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
            name: file.name
          }
        })
        response.__entitySet = 'assets'

        Studio.addExistingEntity(response)
        Studio.openTab(Object.assign({}, response))
      }

      if (this.type === 'edit') {
        if (Studio.workspaces) {
          Studio.updateEntity({
            name: this.props.tab.entity.name,
            content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length)
          })

          await Studio.workspaces.save()
        } else {
          await Studio.api.patch(`/odata/assets(${this.props.tab.entity._id})`, {
            data: {
              content: reader.result.substring(reader.result.indexOf('base64,') + 'base64,'.length),
              link: null
            }
          })
          Studio.loadEntity(this.props.tab.entity._id, true)
        }
      }
    }

    reader.onerror = function () {
      alert('There was an error reading the file!')
    }

    reader.readAsDataURL(file)
  }

  openFileDialog (type) {
    this.type = type

    this.refs.file.dispatchEvent(new MouseEvent('click', {
      'view': window,
      'bubbles': false,
      'cancelable': true
    }))
  }

  renderUpload () {
    return <input type='file' key='file' ref='file' style={{display: 'none'}} onChange={(e) => this.upload(e)} />
  }

  render () {
    return this.renderUpload(true)
  }
}
