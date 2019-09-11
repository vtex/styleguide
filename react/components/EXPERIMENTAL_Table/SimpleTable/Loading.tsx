import React from 'react'

import Spinner from '../../Spinner/index.js'
import useTableContext from '../hooks/useTableContext'
import { TABLE_HEADER_HEIGHT } from '../constants'

const Loading = () => {
  const { containerHeight, tableHeight } = useTableContext()
  const height = (containerHeight || tableHeight) - TABLE_HEADER_HEIGHT
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      <Spinner />
    </div>
  )
}

export default Loading
