import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Specifies the dividing line size.
   */
  size: PropTypes.number,
  /**
   * Specifies the gaps bettwen rows or columns.
   */
  gap: PropTypes.number,
  /**
   * Specifies the line color.
   */
  color: PropTypes.string,
}

// width: 2px;
// margin: 6px 0;
// background: blue;

const Divider: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  const size =
    props.orientation === 'horizontal'
      ? { height: props.size }
      : { width: props.size }
  const gap =
    props.orientation === 'horizontal'
      ? `mt${props.gap} mb${props.gap}`
      : `ml${props.gap} mr${props.gap}`
  const color = `bg-${props.color}`
  const className = cn(color, gap)

  return <div className={className} style={size} />
}

Divider.propTypes = propTypes
Divider.defaultProps = {
  color: 'light-gray',
  orientation: 'horizontal',
  size: 1,
  gap: 0,
}

export default Divider
