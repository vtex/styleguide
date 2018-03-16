import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component {
  render() {
    const { children, fullWidth } = this.props
    const padding = fullWidth ? 'pt6 pb6' : 'pa6'

    return (
      <div
        style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
        className={`"card b2 br3 bg-white ${padding}`}
      >
        {children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node,
  /** Padding `pl6 pr6` should be used for inner items that require space. */
  fullWidth: PropTypes.bool,
}

export default Card
