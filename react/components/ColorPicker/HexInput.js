import React from 'react'
import { PropTypes } from 'prop-types'
import colorutil from 'color-util'
import Input from './../../Input'

/** HUE max input value */
const HUE_MAX_VALUE = 360
/** RGB max input value */
const RGB_MAX_VALUE = 255

class HexInput extends React.Component {
  /** Initial State */
  state = {
    inputValue: '#000000',
    error: false,
  }

  /**
   * Handle input changes
   */
  handleChange = e => {
    e.preventDefault()
    const inputValue = e.target.value
    this.setState({ inputValue: inputValue })
    if (this.validation(inputValue)) {
      const { onChange } = this.props
      const rgb = colorutil.hex.to.rgb(inputValue)
      const hsv = colorutil.rgb.to.hsv(rgb)
      hsv.h = hsv.h * HUE_MAX_VALUE
      rgb.a = rgb.a / RGB_MAX_VALUE
      onChange({
        rgb,
        hsv,
        hex: inputValue,
      })
    }
  }

  /**
   * Input validation
   */
  validation = color => {
    const validColor = /(^#[0-9A-F]{6}$)/i.test(color)
    if (validColor) {
      this.setState({
        error: false,
      })
    } else {
      this.setState({
        error: true,
      })
    }

    return validColor
  }

  /**
   * Handle component did update
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.rgb !== this.props.rgb) {
      const { rgb } = this.props
      const color = colorutil.rgb.to.hex(rgb)
      this.setState({ inputValue: color })
    }
  }

  /**
   * Render HexInput component
   */
  render() {
    return (
      <div className="mb5">
        <Input
          error={this.state.error}
          label="Hex"
          value={this.state.inputValue}
          size="small"
          onChange={this.handleChange}
          errorMessage={this.state.error && this.props.errorMessage}
        />
      </div>
    )
  }
}

/** Default props values */
HexInput.defaultProps = {
  errorMessage: 'Invalid Hex Color',
}

HexInput.propTypes = {
  /** onChange event */
  onChange: PropTypes.func,
  /** RGB color input */
  rgb: PropTypes.object,
  /** Erro message */
  errorMessage: PropTypes.string,
}

export default HexInput
