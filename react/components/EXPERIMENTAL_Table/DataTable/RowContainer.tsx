import React, { FC } from 'react'

import useTableContext from '../hooks/useTableContext'

const RowContainer: FC<RowContainerProps> = ({ id, children }) => {
  const { rowHeight } = useTableContext()
  return (
    <div
      id={id}
      style={{ height: rowHeight }}
      className="dt-row w-100 h-100 ph4 truncate overflow-x-hidden">
      {children}
    </div>
  )
}

type RowContainerProps = {
  id?: string
}

RowContainer.defaultProps = {
  id: '',
}

export default RowContainer
