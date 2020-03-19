import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

class TotalizerValue extends PureComponent {
  render() {
    const {
      item: { value, isLoading },
      mobileScroll,
      testId,
    } = this.props

    if (isLoading) {
      return (
        <div data-testid={`${testId}__loading`} className="c-muted-1">
          <Spinner size={14} color="currentColor" />
        </div>
      )
    }

    if (value == null) {
      return null
    }

    return (
      <div
        data-testid={testId}
        className={`f4 fw5 c-on-base ${mobileScroll ? 'nowrap' : ''}`}
      >
        {value}
      </div>
    )
  }
}

TotalizerValue.propTypes = {
  mobileScroll: PropTypes.bool,
  item: PropTypes.shape({
    value: PropTypes.node,
    isLoading: PropTypes.bool,
  }),
  testId: PropTypes.string,
}

export default TotalizerValue
