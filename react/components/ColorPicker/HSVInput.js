import React from 'react'
import colorutil from 'color-util'
import PropTypes from 'prop-types'
import Input from './../../Input'

/** HUE max input value */
const HUE_MAX_VALUE = 360
/** RGB max input value */
const RGB_MAX_VALUE = 255

/** HSVInput component */
class HSVInput extends React.Component {
  /**
   * Get Value from input and validate
   */
  getValue = event => {
    const max = Number(event.target.max)
    const min = Number(event.target.min)
    let value = Number(event.target.value)

    if (value > max) value = max
    if (value < min) value = min

    return value
  }

  /**
   * Handle input change
   */
  handleChange = (event, key) => {
    const value = this.getValue(event)

    const currentColor = { ...this.props.color, [key]: value }
    const rgb = colorutil.hsv.to.rgb({
      ...currentColor,
      h: currentColor.h / HUE_MAX_VALUE,
    })
    const hex = colorutil.rgb.to.hex(rgb)

    this.props.onChange({
      rgb: { ...rgb, a: rgb.a / RGB_MAX_VALUE },
      hex,
      hsv: currentColor,
    })
  }

  /** Render HSVInput */
  render() {
    return (
      <div className="mv3">
        <div className="relative flex">
          <div className="ph2 w-25">
            <Input
              label="H"
              size="small"
              type="number"
              min="0"
              max="360"
              step="0.000000000001"
              value={this.props.color.h}
              onChange={e => this.handleChange(e, 'h')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="S"
              size="small"
              type="number"
              min="0"
              max="1"
              step="0.000000000001"
              value={this.props.color.s}
              onChange={e => this.handleChange(e, 's')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="V"
              size="small"
              type="number"
              min="0"
              max="1"
              step="0.000000000001"
              value={this.props.color.v}
              onChange={e => this.handleChange(e, 'v')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="A"
              size="small"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={this.props.color.a}
              onChange={e => this.handleChange(e, 'a')}
            />
          </div>
        </div>
      </div>
    )
  }
}

HSVInput.propTypes = {
  /** onChange event */
  onChange: PropTypes.func.isRequired,
  /** Color input */
  color: PropTypes.object,
}

export default HSVInput
