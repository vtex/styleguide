import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const variations = {
  active: 'bg-near-black white',
  inactive: 'bg-light-gray near-black',
}

class Badge extends PureComponent {
  render() {
    return (
      <div
        className={`br-pill ${
          variations[this.props.variation]
        } f6 pv2 ph3 dib fw5`}
      >
        {this.props.children}
      </div>
    )
  }
}

Badge.propTypes = {
  variation: 'active',
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variation: PropTypes.oneOf(['active', 'inactive']).isRequired,
}

export default Badge
