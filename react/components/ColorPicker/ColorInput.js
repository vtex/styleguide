import React from 'react'
import { PropTypes } from 'prop-types'

class ColorInput extends React.Component {
  HUE_MAX_VALUE = 360
  RGB_APHA_MAX_VALUE = 255

  componentDidUpdate(prevProps) {
    this.updateColor(prevProps)
  }

  componentDidMount(prevProps) {
    this.updateColor(prevProps)
  }

  updateColor = prevProps => {
    if (!prevProps || prevProps.color !== this.props.color) {
      this.setState({ ...this.props.color })
    }
  }

  getValue = event => {
    const max = Number(event.target.max)
    const min = Number(event.target.min)
    let value = Number(event.target.value)

    if (value > max) value = max
    if (value < min) value = min

    return value
  }
}

ColorInput.propTypes = {
  color: PropTypes.object.isRequired,
}

export default ColorInput
