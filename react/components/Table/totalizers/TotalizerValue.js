import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../../Spinner'

class TotalizerValue extends PureComponent {
  render() {
    const {
      item: { value, isLoading },
    } = this.props

    if (isLoading) {
      return (
        <div className="mt2 c-muted-1">
          <Spinner size={14} color="currentColor" />
        </div>
      )
    }

    if (value == null) {
      return null
    }

    return <div className="f4 fw5 c-on-base">{value}</div>
  }
}

TotalizerValue.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    iconBackgroundColor: PropTypes.string,
    icon: PropTypes.node,
    isLoading: PropTypes.bool,
  }),
}

export default TotalizerValue
