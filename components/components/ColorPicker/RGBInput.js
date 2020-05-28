import React from 'react'
import { PropTypes } from 'prop-types'

import colorutil from './colorUtil'
import Input from '../Input'

/**
 * RGBInput Component
 */
class RGBInput extends React.Component {
  getValue = event => {
    const max = Number(event.target.max)
    const min = Number(event.target.min)
    let value = Number(event.target.value)

    if (value > max) value = max
    if (value < min) value = min

    return value
  }
  handleChange = (event, key) => {
    const value = this.getValue(event)

    const rgb = { ...this.props.color, [key]: value }
    const hsv = colorutil.rgb.to.hsv(rgb)
    const hex = colorutil.rgb.to.hex(rgb)

    this.props.onChange({
      hsv,
      hex,
      rgb,
    })
  }
  render() {
    return (
      <div className="relative flex mv3">
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
