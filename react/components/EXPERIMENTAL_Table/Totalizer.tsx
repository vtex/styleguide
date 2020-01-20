import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import TotalizerBase, { totalizerPropTypes } from '../Totalizer/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'

const Totalizer: FC<TotalizerProps> = props => {
  return (
    <div
      id={NAMESPACES.TOTALIZER}
      className={`mb5 ${ORDER_CLASSNAMES.TOTALIZER}`}>
      <TotalizerBase {...props} />
    </div>
  )
}

export type TotalizerProps = InferProps<typeof totalizerPropTypes>

export default Totalizer
