import React, { Component } from 'react'

export default class AssetProperties extends Component {

  static title (entity, entities) {
    return `asset ${entity.link ? '(link)' : ''}`
  }

  render () {
    const { entity, onChange } = this.props

    return (
      <div>
        <div className='form-group'>
          <label>link</label>
          <input type='text' value={entity.link || ''} onChange={(v) => onChange({_id: entity._id, link: v.target.value})} />
        </div>
      </div>
    )
  }
}

