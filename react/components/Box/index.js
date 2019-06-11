import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children, noPadding, fullHeight }) => {
  const padding = noPadding ? '' : 'pa7-ns'
  return (
    <div
      className={`styleguide__box bg-base t-body c-on-base ${padding} br3-ns b--muted-4 bt bb bl-ns br-ns ${
        fullHeight ? 'h-100' : ''
      }`}>
      {children}
    </div>
  )
}

Box.defaultProps = {
  fullHeight: false,
}

Box.propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
  /** Use the full size of the box. */
  noPadding: PropTypes.bool,
  /** If should be full height. False if should grow according to the content */
  fullHeight: PropTypes.bool,
}

export default Box
