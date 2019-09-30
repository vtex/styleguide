import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

const Divider: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  const size = {
    [props.orientation === 'horizontal' ? 'height' : 'width']: 1,
  }
  return <div className="bg-light-gray" style={size} />
}

Divider.propTypes = propTypes
Divider.defaultProps = {
  orientation: 'horizontal',
}

export default Divider
