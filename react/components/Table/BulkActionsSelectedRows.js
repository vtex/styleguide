import { memo } from 'react'
import PropTypes from 'prop-types'

const BulkActionsSelectedRows = ({ selectedRowsLength }) => {
  return selectedRowsLength
}

BulkActionsSelectedRows.propTypes = {
  selectedRowsLength: PropTypes.number.isRequired,
}

export default memo(BulkActionsSelectedRows)
