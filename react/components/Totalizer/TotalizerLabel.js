import React from 'react'
import PropTypes from 'prop-types'

const TotalizerLabel = ({ label, mobileScroll, testId }) => (
  <div
    data-testid={testId}
    className={`c-muted-2 f6 ${mobileScroll ? 'nowrap' : ''}`}
  >
    {label}
  </div>
)

TotalizerLabel.propTypes = {
  label: PropTypes.string.isRequired,
  mobileScroll: PropTypes.bool,
  testId: PropTypes.string,
}

export default TotalizerLabel
