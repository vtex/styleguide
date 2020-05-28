import { Component } from 'react'
import PropTypes from 'prop-types'

class BulkActionsSelectedRows extends Component {
  shouldComponentUpdate(nextProps) {
    // This prevents the value from showing 0 when bar is closing
    // It reduces the "noise" given to the user from a ux point of view
    if (nextProps.selectedRowsLength === 0) {
      return false
    }
    return true
  }

  render() {
    return this.props.selectedRowsLength
  }
}

BulkActionsSelectedRows.propTypes = {
  selectedRowsLength: PropTypes.number.isRequired,
}

export default BulkActionsSelectedRows
