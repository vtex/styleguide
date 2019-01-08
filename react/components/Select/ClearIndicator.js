import React from 'react'
import PropTypes from 'prop-types'
import ClearIcon from './ClearIcon'

const ClearIndicator = ({ innerProps }) => {
  return (
    <div
      className="flex items-center h-100 pr4 pointer silver hover-gray"
      {...innerProps}>
      <ClearIcon />
    </div>
  )
}

ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

export default ClearIndicator
