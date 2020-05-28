import React from 'react'
import PropTypes from 'prop-types'

import ClearIcon from '../icon/Clear'

const ClearIndicator = ({ innerProps }) => {
  return (
    <div
      className="flex items-center h-100 pr4 pointer c-muted-3 hover-gray"
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
