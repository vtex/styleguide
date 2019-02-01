import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children }) => (
  <div className="styleguide__box bg-base t-body c-on-base pa5 pa7-ns br3-ns b--muted-4 bt bb bl-ns br-ns">
    {children}
  </div>
)

Box.propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
}

export default Box
