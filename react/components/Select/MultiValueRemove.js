import PropTypes from 'prop-types'
import React from 'react'
import { components } from 'react-select'

/* eslint-disable react/jsx-handler-names */
// These functions are defined in react-select
const MultiValueRemove = props => {
  const multiValueProps = {
    ...props,
    innerProps: {
      ...props.innerProps,
      className: `${props.innerProps.className}`,
    },
  }
  return (
    <React.Fragment>
      <components.MultiValueRemove {...multiValueProps} />
      <div
        className="absolute h-100 pointer"
        style={{
          width: 'calc(100% - 22px)',
        }}
        onClick={props.innerProps.onClick}
        onTouchEnd={props.innerProps.onTouchEnd}
        onMouseDown={props.innerProps.onMouseDown}
      />
    </React.Fragment>
  )
}
/* eslint-enable */

MultiValueRemove.propTypes = {
  innerProps: PropTypes.object,
}

export default MultiValueRemove
