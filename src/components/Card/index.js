import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component {
  render() {
    const { children, className } = this.props

    return (
      <div
        style={{ boxShadow: '0 20px 30px 0 rgba(0, 0, 0, 0.15)' }}
        className={`"card pa6 b2 br3 bg-white ${className}`}
      >
        {children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Card
