import React from 'react'
import { CustomPicker } from 'react-color'
import { PropTypes } from 'prop-types'
import { Saturation } from 'react-color/lib/components/common'

/** SaturationCustom Component */
class SaturationCustom extends React.Component {
  render() {
    const { hex } = this.props
    return (
      <div className="saturation-container relative w-100">
        <Saturation
          {...this.props}
          pointer={() => (
            <div className="pointer-saturation" style={{ background: hex }} />
          )}
        />
      </div>
    )
  }
}

SaturationCustom.propTypes = {
  /** onChenge event */
  onChange: PropTypes.func,
  /** Pointer hex color  */
  hex: PropTypes.string,
}

export default CustomPicker(SaturationCustom)
