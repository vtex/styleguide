import React from 'react'
import PropTypes from 'prop-types'
import COLORS from './colors'
import ArrowDownIcon from '../Dropdown/ArrowDownIcon'

const DropdownIndicator = props => {
  const { innerProps, selectProps } = props
  const arrowColor = selectProps.isDisabled ? COLORS.gray : COLORS.blue
  const { paddingRight } = props.getStyles('dropdownIndicator', props)
  return (
    <div
      className="flex items-center h-100 pr4 pointer"
      {...innerProps}
      style={{ paddingRight }}>
      <ArrowDownIcon color={arrowColor} size={18} />
    </div>
  )
}

DropdownIndicator.propTypes = {
  getStyles: PropTypes.func,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

export default DropdownIndicator
