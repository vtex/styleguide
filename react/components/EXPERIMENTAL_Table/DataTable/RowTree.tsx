import React, { FC } from 'react'

import NodeRow from './NodeRow'
import useTableContext from '../hooks/useTableContext'

const RowTree: FC = () => {
  const { items } = useTableContext()

  return (
    <>
      {items.map((data, index) => (
        <NodeRow key={`row-${index}`} data={data} index={index} />
      ))}
    </>
  )
}

export default RowTree
