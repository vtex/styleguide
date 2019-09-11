import React, { FC, memo } from 'react'

import DataTable from './DataTable'

const SimpleTable: FC = () => {
  return (
    <DataTable>
      <DataTable.Header />
      <DataTable.Rows />
    </DataTable>
  )
}

export default memo(SimpleTable)
