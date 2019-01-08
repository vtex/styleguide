import React from 'react'
import PropTypes from 'prop-types'
import COLORS from './colors'
import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'

const DropdownIndicator = ({ innerProps, selectProps }) => {
  const arrowColor = selectProps.isDisabled ? COLORS.gray : COLORS.blue
  return (
    <div className="flex items-center h-100 pr4 pointer" {...innerProps}>
      {selectProps.menuIsOpen ? (
        <IconCaretUp color={arrowColor} size={18} />
      ) : (
        <IconCaretDown color={arrowColor} size={18} />
      )}
    </div>
  )
}

DropdownIndicator.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

export default DropdownIndicator
