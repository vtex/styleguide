import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import SimpleTable from './SimpleTable/index'

import { TableProvider } from './context'

const propTypes = {
  columns: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  isEmpty: PropTypes.bool,
  tableHeight: PropTypes.number,
}

type Props = InferProps<typeof propTypes>

const Table: FC<Props> = props => {
  return (
    <TableProvider value={props}>
      <div className="vtex-table__container">
        <SimpleTable />
      </div>
    </TableProvider>
  )
}

Table.propTypes = propTypes

export default Table
