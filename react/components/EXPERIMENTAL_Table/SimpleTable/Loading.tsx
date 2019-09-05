import React from 'react'

import Spinner from '../../Spinner/index.js'
import useTableContext from '../hooks/useTableContext'
import { TABLE_HEADER_HEIGHT } from '../constants'

const Loading = () => {
  const { tableHeight } = useTableContext()
  return (
    <div
      className="dtc v-mid tc"
      style={{ height: tableHeight - TABLE_HEADER_HEIGHT }}>
      <Spinner />
    </div>
  )
}

export default Loading
