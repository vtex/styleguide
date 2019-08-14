import React, { FC, Children } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import SimpleTable from './SimpleTable/index'

import { TableProvider } from './context'
import Toolbar from './Toolbar/index'

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
  rowHeight: PropTypes.number,
  selectedDensity: PropTypes.oneOf(['low', 'medium', 'high']),
  setSelectedDensity: PropTypes.func,
}

type Props = InferProps<typeof propTypes>

interface Composites {
  Toolbar: FC
}

const Table: FC<Props> & Composites = ({ children, ...props }) => {
  return (
    <TableProvider value={props}>
      <div className="vtex-tablev2__container">
        {children}
        <SimpleTable />
      </div>
    </TableProvider>
  )
}

Table.Toolbar = Toolbar
Table.propTypes = propTypes

export default Table
