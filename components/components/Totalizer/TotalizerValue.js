import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Spinner from '../Spinner'

class TotalizerValue extends PureComponent {
  render() {
    const {
      item: { value, isLoading },
      mobileScroll,
    } = this.props

    if (isLoading) {
      return (
        <div className="c-muted-1">
          <Spinner size={14} color="currentColor" />
        </div>
      )
    }

    if (value == null) {
      return null
    }

    return (
      <div
        data-testid="totalizer-value"
        className={classNames('f4 fw5 c-on-base', {
          nowrap: mobileScroll,
        })}>
        {value}
      </div>
    )
  }
}

TotalizerValue.propTypes = {
  mobileScroll: PropTypes.bool,
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    iconBackgroundColor: PropTypes.string,
    icon: PropTypes.node,
    isLoading: PropTypes.bool,
  }),
}

export default TotalizerValue
