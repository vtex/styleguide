import React from 'react'
import OptionProps from 'react-select'

import IconCheck from '../icon/Check'

const Option = (props: OptionProps) => {
  const {
    children,
    getStyles,
    isMulti,
    innerProps,
    innerRef,
    isSelected,
  } = props
  return (
    <div style={getStyles('option', props)} ref={innerRef} {...innerProps}>
      <div className="flex">
        {isMulti ? null : (
          <span className="flex self-center pr3" style={{ width: '1rem' }}>
            {isSelected ? <IconCheck /> : null}
          </span>
        )}
        {children}
      </div>
    </div>
  )
}

export default Option
