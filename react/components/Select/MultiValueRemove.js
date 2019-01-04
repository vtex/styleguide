import PropTypes from 'prop-types'
import React from 'react'
import { components } from 'react-select'

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
      <components.MultiValueRemove {...multiValueProps} />
      <div
        className="absolute h-100 pointer"
        style={{
          width: 'calc(100% - 22px)',
        }}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      />
    </React.Fragment>
  )
}

MultiValueRemove.propTypes = {
  innerProps: PropTypes.object,
}

export default MultiValueRemove
