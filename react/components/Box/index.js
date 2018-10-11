import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children }) => (
  <div className="bg-base c-on-base t-body pa7 br3 b--muted-4 ba">
    {children}
  </div>
)

Box.propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
}

export default Box
