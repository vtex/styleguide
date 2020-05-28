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
  currentItemFrom: PropTypes.number,
  currentItemTo: PropTypes.number,
  enabled: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onRowsChange: PropTypes.func,
  rowsOptions: PropTypes.array,
  textOf: PropTypes.node,
  textShowRows: PropTypes.node,
  totalItems: PropTypes.number,
}

export default SwitchablePagination
