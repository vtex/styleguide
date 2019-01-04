import React from 'react'
import PropTypes from 'prop-types'
import { COLORS } from './constants'
import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'

const DropdownIndicator = ({ innerProps, selectProps }) => {
  const arrowColor = selectProps.isDisabled ? COLORS.gray : COLORS.blue
  return (
    <div className="pr4" {...innerProps}>
      {selectProps.menuIsOpen ? (
        <IconCaretUp color={arrowColor} size={8} />
      ) : (
        <IconCaretDown color={arrowColor} size={8} />
      )}
    </div>
  )
}

DropdownIndicator.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

export default DropdownIndicator
