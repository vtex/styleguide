import React from 'react'
import ColorContent from './ColorContent'

import './color-picker.global.css'

/**
 * ColorPicker App
 */
export default class ColorPicker extends React.Component {
  /** Render ColorPicker App */
  render() {
    return <ColorContent {...this.props} />
  }
}
