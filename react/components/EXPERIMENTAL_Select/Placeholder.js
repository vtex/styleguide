import React from 'react'
import PropTypes from 'prop-types'

const Placeholder = ({ innerProps, children }) => (
  <span className="c-muted-2" {...innerProps}>
    {children}
  </span>
)

Placeholder.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default Placeholder
