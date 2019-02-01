import React from 'react'
import PropTypes from 'prop-types'
import colorutil from './colorUtil'
import Input from './../../Input'

/** HexInput Component */
class HexInput extends React.Component {
  state = {
    inputValue: '#000000',
    error: false,
  }
  handleChange = e => {
    e.preventDefault()
    const inputValue = e.target.value
    this.setState({ inputValue: inputValue })
    if (this.validation(inputValue)) {
      const { onChange } = this.props
      const rgb = colorutil.hex.to.rgb(inputValue)
      const hsv = colorutil.rgb.to.hsv(rgb)
      onChange({
        rgb,
        hsv,
        hex: inputValue,
      })
    }
  }
  validation = color => {
    const validColor = colorutil.validateHex(color)
    this.setState({
      error: !validColor,
    })
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
    const { disable } = this.props
    return (
      <div className="mb5">
        <Input
          error={this.state.error}
          label="Hex"
          value={this.state.inputValue}
          size="small"
          onChange={this.handleChange}
          errorMessage={this.state.error && this.props.errorMessage}
          disabled={disable}
        />
      </div>
    )
  }
}

/** Default props values */
HexInput.defaultProps = {
  errorMessage: 'Invalid Hex Color',
  disable: false,
}

HexInput.propTypes = {
  /** onChange event */
  onChange: PropTypes.func,
  /** RGB color input */
  rgb: PropTypes.object,
  /** Erro message */
  errorMessage: PropTypes.string,
  disable: PropTypes.bool,
}

export default HexInput
