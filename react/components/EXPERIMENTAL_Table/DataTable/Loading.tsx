import React, { FC } from 'react'

import Spinner from '../../Spinner/index.js'
import { useTableContext } from '../contexts'
import { TABLE_HEADER_HEIGHT } from '../constants'
import { useMeasuresState } from '../stateContainers/tableMeasures'
import { useDataState } from '../stateContainers/data.js'

const Loading: FC = ({ children }) => {
  //const { containerHeight } = useDataState()
  const { tableHeight } = useMeasuresState()
  const height = (0 || tableHeight) - TABLE_HEADER_HEIGHT
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      {children || <Spinner />}
    </div>
  )
}

export default Loading
