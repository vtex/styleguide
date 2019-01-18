import React from 'react'
import PropTypes from 'prop-types'
import HexInput from './HexInput'
import ColorOptions from './ColorOptions'

import './color-picker.global.css'

class ColorContent extends React.Component {
  state = {
    rgba: {
      r: 0,
      b: 0,
      g: 0,
      a: 1,
    },
    hsva: {
      h: 0,
      s: 0,
      v: 0,
      a: 1,
    },
    hex: '#000000',
    showOptions: false,
  }

  handleColorChange = color => {
    this.setState({
      rgba: color.rgb,
      hsva: color.hsv,
      hex: color.hex,
    })
    console.log(this.state)
  }

  handleShowOptions = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }

  render() {
    const { rgba } = this.state

    const styleColorBox = {
      backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
      height: '1.5rem',
    }

    return (
      <div className="relative dib w-100">
        <div className="flex w-100">
          <div className="w-25 pa1">
            <span className="t-small w-100 c-on-base db mb3">
              {this.props.type}
            </span>
            <div
              className="ba bw1 b--muted-4 br2 pa1 hover-b--action-primary"
              onClick={this.handleShowOptions}>
              <div className="br1" style={styleColorBox} />
            </div>
          </div>
          <div className="w-75 pa1">
            <HexInput rgb={this.state.rgba} onChange={this.handleColorChange} />
          </div>
        </div>
        <div>
          {this.state.showOptions && (
            <ColorOptions
              color={this.state}
              onColorChange={this.handleColorChange}
            />
          )}
        </div>
      </div>
    )
  }
}

ColorContent.defaultProps = {
  type: 'Default',
}

ColorContent.propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  /** Use the full size of the card. */
  hex: PropTypes.object,
  hsl: PropTypes.object,
  rgb: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string,
}

export default ColorContent
