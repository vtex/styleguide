import React from 'react'
import PropTypes from 'prop-types'
import { CustomPicker } from 'react-color'
import { Hue } from 'react-color/lib/components/common'

/**
 * Gradient Component
 */
class Gradient extends React.Component {
  render() {
    return (
      <div className="gradient-container relative w-100 mv6">
        <Hue
          {...this.props}
          onChange={this.props.onChange}
          pointer={() => (
            <div
              className="pointer-gradient"
              style={{ background: this.props.hex }}
            />
          )}
          direction="horizontal"
        />
      </div>
    )
  }
}

Gradient.propTypes = {
  /** onChange event */
  onChange: PropTypes.func,
  /** Pointer Hex Color */
  hex: PropTypes.string,
}

export default CustomPicker(Gradient)
