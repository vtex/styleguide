import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import SimpleTable from './SimpleTable/index'

import { TableProvider } from './context'

const propTypes = {
  /** Controls the table loading state */
  loading: PropTypes.bool,
  /** Table state handlers */
  tableState: PropTypes.shape({
    columns: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.object),
    isEmpty: PropTypes.bool,
    tableHeight: PropTypes.number,
  }),
}

type Props = InferProps<typeof propTypes>

const Table: FC<Props> = ({ loading, tableState }) => {
  return (
    <TableProvider value={tableState}>
      <div className="vtex-table__container">
        <SimpleTable loading={loading} />
      </div>
    </TableProvider>
  )
}

Table.defaultProps = {
  loading: false,
}

Table.propTypes = propTypes

export default Table
