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
  children: PropTypes.node.isRequired,
  /** Use the full width of the card. Respect the default padding (pl6 pr6) for elements that do not fill the full width. */
  fullWidth: PropTypes.bool,
}

export default Card
