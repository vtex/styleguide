import React from 'react'
import colorutil from 'color-util'
import { PropTypes } from 'prop-types'
import ColorInput from './ColorInput'
import Input from './../../Input'

class HSVInput extends ColorInput {
  state = {
    h: 0,
    s: 0,
    v: 0,
    a: 1,
  }

  handleChange = (event, key) => {
    const value = this.getValue(event)

    const currentColor = { ...this.state, [key]: value }
    const rgb = colorutil.hsv.to.rgb({
      ...currentColor,
      h: currentColor.h / this.HUE_MAX_VALUE,
    })
    const hex = colorutil.rgb.to.hex(rgb)

    this.props.onChange({
      rgb: { ...rgb, a: rgb.a / this.RGB_APHA_MAX_VALUE },
      hex,
      hsv: currentColor,
    })
  }

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
              value={this.state.h}
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
              value={this.state.s}
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
              value={this.state.v}
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
              value={this.state.a}
              onChange={e => this.handleChange(e, 'a')}
            />
          </div>
        </div>
      </div>
    )
  }
}

HSVInput.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default HSVInput
