import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const types = {
  active: 'bg-green',
  inactive: 'bg-silver',
  error: 'bg-red',
}

class Status extends PureComponent {
  render() {
    return <div className={`${types[this.props.type]} dib pa2 br-100`} />
  }
}

Status.defaultProps = {
  type: 'active',
}

Status.propTypes = {
  type: PropTypes.oneOf(['active', 'inactive', 'error']),
}

export default Status
