import React, { FC, memo } from 'react'

import Header from './Header'
import Rows from './Rows'

const SimpleTable: FC = () => {
  return (
    <div className="vtex__tablev2 mw-100">
      <div className="overflow-x-auto">
        <div className="dt w-100" style={{ borderSpacing: 0 }}>
          <Header />
          <Rows />
        </div>
      </div>
    </div>
  )
}

export default memo(SimpleTable)
