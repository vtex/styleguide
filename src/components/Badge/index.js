import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const types = {
  active: 'bg-washed-blue blue',
  inactive: 'bg-near-white mid-gray',
}

class Badge extends PureComponent {
  render() {
    return (
      <div className={`br-pill ${types[this.props.type]} f6 pv2 ph3 dib fw5`}>
        {this.props.children}
      </div>
    )
  }
}

Badge.propTypes = {
  type: 'active',
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['active', 'inactive']),
}

export default Badge
