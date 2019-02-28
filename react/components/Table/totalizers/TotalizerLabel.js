import React from 'react'
import PropTypes from 'prop-types'

const TotalizerLabel = ({ label }) => (
  <div className="c-muted-2 f6 mb2">{label}</div>
)

TotalizerLabel.propTypes = {
  label: PropTypes.string.isRequired,
}

export default TotalizerLabel
