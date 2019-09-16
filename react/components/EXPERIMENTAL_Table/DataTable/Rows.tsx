import React, { FC } from 'react'

import Row from './Row'
import useTableContext from '../hooks/useTableContext'

/**
 * Component that maps items into Rows
 */
const Rows: FC = () => {
  const { items } = useTableContext()

  return (
    <>
      {items.map((rowData, index) => (
        <Row key={`row-${index}`} rowData={rowData} index={index} />
      ))}
    </>
  )
}

export default Rows
