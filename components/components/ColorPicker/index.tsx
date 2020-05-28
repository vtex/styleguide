import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import PropTypes from 'prop-types'

import colorutil from './colorUtil'
import HexInput from './HexInput'
import ColorOptions from './ColorOptions'

import './color-picker.global.css'

/**
 * ColorPicker Component
 */
class ColorPicker extends React.Component {
  state = {
    showOptions: false,
  }

  validColor() {
    const { rgba, hsva, hex } = this.props.color
    const color = rgba || hsva || hex
    const hsvaAux = color && (hsva || colorutil.any.to.hsv(color))
    const hexAux = color && (hex || colorutil.any.to.hex(color))
    const rgbaAux = color && (rgba || colorutil.any.to.rgb(color))

    return {
      rgba: rgbaAux,
      hsva: hsvaAux,
      hex: hexAux,
    }
  }

  handleColorChange = color => {
    const { onChange } = this.props
    onChange &&
      onChange({
        rgba: color.rgb || color.rgba,
        hsva: color.hsv || color.hsva,
        hex: color.hex,
      })
  }

  handleOutsideClick = () => {
    this.setState({ showOptions: false })
  }

  handleShowOptions = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }

  render() {
    const { title, disabled } = this.props
    const { rgba, hsva, hex } = this.validColor()

    const styleColorBox = {
      backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
      height: '1.5rem',
    }

    return (
      <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
        <div className="relative dib w-100">
          {title && (
            <div className="bb b--muted-4 mb3 t-heading-5 pv5">{title}</div>
          )}
          <div className="flex w-100">
            <div className="w-25 pa1">
              <div className="t-small w-100 c-on-base db mb3">
                {this.props.label}
              </div>
              <div
                className={`ba bw1 b--muted-4 br2 pa1 ${
                  disabled ? '' : 'hover-b--action-primary pointer'
                }`}
                onClick={this.handleShowOptions}>
                <div className="br1" style={styleColorBox} />
              </div>
            </div>
            <div className="w-75 pa1">
              <HexInput
                rgb={rgba}
                onChange={this.handleColorChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div>
            {this.state.showOptions && !disabled && (
              <ColorOptions
                {...this.props}
                color={{ rgba, hex, hsva }}
                onColorChange={this.handleColorChange}
              />
            )}
          </div>
        </div>
      </OutsideClickHandler>
    )
  }
}

/** Default props values */
ColorPicker.defaultProps = {
  label: 'Default',
}

ColorPicker.propTypes = {
  /** onChange event */
  onChange: PropTypes.func,
  /** Color Label */
  label: PropTypes.string,
  /** ColorPicker Title */
  title: PropTypes.string,
  /** Color format */
  color: PropTypes.shape({
    /** RGBA color format */
    rgba: PropTypes.object,
    /** HSVA color format */
    hsva: PropTypes.object,
    /** HEX color format */
    hex: PropTypes.string,
  }).isRequired,
  /** Color history */
  colorHistory: PropTypes.array.isRequired,
  /** Disable component */
  disabled: PropTypes.bool,
}

export default ColorPicker
