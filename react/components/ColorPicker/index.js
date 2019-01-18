import React from 'react'
import ColorContent from './ColorContent'

export default class ColorPicker extends React.Component {
  render() {
    return <ColorContent {...this.props} />
  }
}
