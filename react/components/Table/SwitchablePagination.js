import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '../Pagination'

function SwitchablePagination({ children, enabled, ...paginationProps }) {
  if (enabled) {
    return <Pagination {...paginationProps}>{children}</Pagination>
  }
  return children
}

SwitchablePagination.defaultProps = {
  enabled: false,
}

SwitchablePagination.propTypes = {
  ...Pagination.propTypes,
  enabled: PropTypes.bool,
}

export default SwitchablePagination
