import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import SimpleTable from './SimpleTable/index'

import { TableProvider } from './context'

const propTypes = {
  schema: PropTypes.shape({
    columns: PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        cellRender: PropTypes.func,
      })
    ).isRequired,
    rowRender: PropTypes.func,
  }),
  items: PropTypes.arrayOf(PropTypes.object),
  isEmpty: PropTypes.bool,
  tableHeight: PropTypes.number,
}

type Props = InferProps<typeof propTypes>

const Table: FC<Props> = props => {
  return (
    <TableProvider value={props}>
      <div className="vtex-tablev2__container">
        <SimpleTable />
      </div>
    </TableProvider>
  )
}

Table.propTypes = propTypes

export default Table
