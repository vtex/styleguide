import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TotalizerLabel = ({ label, mobileScroll }) => (
  <div
    data-testid="totalizer-label"
    className={classNames('c-muted-2 f6', {
      nowrap: mobileScroll,
    })}>
    {label}
  </div>
)

TotalizerLabel.propTypes = {
  label: PropTypes.string.isRequired,
  mobileScroll: PropTypes.bool,
}

export default TotalizerLabel
