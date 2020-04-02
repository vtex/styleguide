import React from 'react'
import PropTypes from 'prop-types'

const TotalizerLabel = ({ label, mobileScroll }) => (
  <div
    data-testid="totalizer-label"
    className={`c-muted-2 f6 ${mobileScroll ? 'nowrap' : ''}`}>
    {label}
  </div>
)

TotalizerLabel.propTypes = {
  label: PropTypes.string.isRequired,
  mobileScroll: PropTypes.bool,
}

export default TotalizerLabel
