import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children }) => (
  <div className="bg-base pa7 br3 b--muted-4 ba">{children}</div>
)

Container.propTypes = {
  /** Content of the container */
  children: PropTypes.node.isRequired,
}

export default Container
