import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const variations = {
  active: 'bg-washed-blue blue',
  inactive: 'bg-near-white mid-gray',
}

class Badge extends PureComponent {
  render() {
    return (
      <div className={`br-pill ${variations[this.props.variation]} f6 pv2 ph3 dib fw5`}>
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
  variation: PropTypes.oneOf(['active', 'inactive']),
}

export default Badge
