import React from 'react'
import { PropTypes } from 'prop-types'
import colorutil from 'color-util'
import Input from './../../Input'

/** HUE max input value */
const HUE_MAX_VALUE = 360
/** RGB max input value */
const RGB_MAX_VALUE = 255

/**
 * RGBInput Component
 */
class RGBInput extends React.Component {
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
   * Handle input changes
   */
  handleChange = (event, key) => {
    const value = this.getValue(event)

    const currentColor = { ...this.props.color, [key]: value }
    const rgbFormated = {
      ...currentColor,
      a: currentColor.a * RGB_MAX_VALUE,
    }
    const hsv = colorutil.rgb.to.hsv(rgbFormated)
    const hex = colorutil.rgb.to.hex(rgbFormated)

    this.props.onChange({
      hsv: { ...hsv, h: hsv.h * HUE_MAX_VALUE },
      hex,
      rgb: currentColor,
    })
  }

  /**
   * Render RGBInput Component
   */
  render() {
    return (
      <div className="mv3">
        <div className="relative flex">
          <div className="ph2 w-25">
            <Input
              label="R"
              size="small"
              type="number"
              min="0"
              max="255"
              value={this.props.color.r}
              onChange={e => this.handleChange(e, 'r')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="G"
              size="small"
              type="number"
              min="0"
              max="255"
              value={this.props.color.g}
              onChange={e => this.handleChange(e, 'g')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="B"
              size="small"
              type="number"
              min="0"
              max="255"
              value={this.props.color.b}
              onChange={e => this.handleChange(e, 'b')}
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

RGBInput.propTypes = {
  /** inChange event */
  onChange: PropTypes.func.isRequired,
  /** Color Input */
  color: PropTypes.object.isRequired,
}

export default RGBInput
