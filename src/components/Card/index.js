import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Card extends PureComponent {
  render() {
    const { children, fullWidth } = this.props
    const padding = fullWidth ? 'pt6 pb6' : 'pa6'

    return (
      <div
        style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
        className={`vtex-card card b2 br2 bg-white ${padding}`}
      >
        {children}
      </div>
    )
  }
}

Card.propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  /** Use the full width of the card. Respect the default padding (`pl6 pr6`) for elements that do not fill the full width. */
  fullWidth: PropTypes.bool,
}

export default Card
