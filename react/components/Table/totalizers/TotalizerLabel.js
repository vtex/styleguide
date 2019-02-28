import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TotalizerLabel extends PureComponent {
  render() {
    const { label } = this.props

    return <div className="c-muted-2 f6 mb2">{label}</div>
  }
}

TotalizerLabel.propTypes = {
  label: PropTypes.string.isRequired,
}

export default TotalizerLabel
