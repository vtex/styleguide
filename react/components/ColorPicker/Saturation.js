import React from 'react'
import { CustomPicker } from 'react-color'
import { PropTypes } from 'prop-types'
import { Saturation } from 'react-color/lib/components/common'

class SaturationCustom extends React.Component {
  render() {
    const { hex, onChange } = this.props
    return (
      <div className="saturation-container relative w-100">
        <Saturation
          {...this.props}
          onChange={onChange}
          pointer={() => (
            <div
              className="pointer-saturation"
              style={{ background: hex.rgb }}
            />
          )}
        />
      </div>
    )
  }
}

SaturationCustom.propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  hex: PropTypes.object,
}

export default CustomPicker(SaturationCustom)
