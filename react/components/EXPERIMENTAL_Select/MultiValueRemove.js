import PropTypes from 'prop-types'
import React from 'react'
import { components } from 'react-select'

import Close from '../icon/Close'

const MultiValueRemove = props => {
  const multiValueProps = {
    ...props,
    innerProps: {
      ...props.innerProps,
      className: `${props.innerProps.className}`,
    },
  }

  const {
    innerProps: {
      onClick: handleClick,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
    },
  } = props

  return (
    <React.Fragment>
      <div
        className="flex items-center"
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}>
        <components.MultiValueRemove {...multiValueProps}>
          <Close size={14} />
        </components.MultiValueRemove>
      </div>
    </React.Fragment>
  )
}

MultiValueRemove.propTypes = {
  innerProps: PropTypes.object,
}

export default MultiValueRemove
