import React from 'react'
import PropTypes from 'prop-types'

import ArrowDownIcon from '../Dropdown/ArrowDownIcon'

function paddingRightClassFromSize(size) {
  return {
    [size]: 'pr4',
    large: 'pr5',
    small: 'pr3',
  }[size]
}

const DropdownIndicator = ({ innerProps, selectProps, size }) => {
  const arrowColorClassName = selectProps.isDisabled
    ? 'c-disabled'
    : 'c-action-primary'

  return (
    <div
      className={`flex items-center h-100 ${paddingRightClassFromSize(
        size
      )} pointer ${arrowColorClassName}`}
      {...innerProps}>
      <ArrowDownIcon size={18} />
    </div>
  )
}

DropdownIndicator.propTypes = {
  getStyles: PropTypes.func,
  innerProps: PropTypes.object,
  size: PropTypes.oneOf(['large', 'regular', 'small']),
  selectProps: PropTypes.object.isRequired,
}

export default DropdownIndicator
