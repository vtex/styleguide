import React from 'react'
import { PropTypes } from 'prop-types'
import colorutil from 'color-util'
import Input from './../../Input'

const HUE_MAX_VALUE = 360
const RGB_APHA_MAX_VALUE = 255

class HexInput extends React.Component {
  state = {
    inputValue: '#FFFFFF',
    error: false,
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ inputValue: e.target.value })
  }

  handleSubmit = e => {
    const inputValue = e.target.value
    if (e.key === 'Enter' && this.validation(inputValue)) {
      const { onChange } = this.props
      const rgb = colorutil.hex.to.rgb(inputValue)
      const hsv = colorutil.rgb.to.hsv(rgb)
      hsv.h = hsv.h * HUE_MAX_VALUE
      rgb.a = rgb.a / RGB_APHA_MAX_VALUE
      onChange({
        rgb,
        hsv,
        hex: inputValue,
      })
    }
  }

  validation = color => {
    const validColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
    if (!validColor) {
      this.setState({
        error: true,
      })
    } else {
      this.setState({
        error: false,
      })
    }

    return validColor
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rgb !== this.props.rgb) {
      const { rgb } = this.props
      const color = colorutil.rgb.to.hex(rgb)
      this.setState({ inputValue: color })
    }
  }

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
          onKeyPress={this.handleSubmit}
        />
      </div>
    )
  }
}

HexInput.defaultProps = {
  errorMessage: 'Invalid Hex Color',
}

HexInput.propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  rgb: PropTypes.object,
  errorMessage: PropTypes.string,
}

export default HexInput
