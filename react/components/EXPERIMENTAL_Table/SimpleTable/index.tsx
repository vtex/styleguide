import React, { FC, memo } from 'react'

import Header from './Header'
import Rows from './Rows'
import { NAMESPACES } from '../constants'
import useTableContext from '../hooks/useTableContext'
import Loading from './Loading'

const SimpleTable: FC = () => {
  const { loading } = useTableContext()
  return (
    <div id={NAMESPACES.TABLE} className="order-1 mw-100">
      <div className="overflow-x-auto">
        <div className="dt w-100" style={{ borderSpacing: 0 }}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <Rows />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(SimpleTable)
