import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import TotalizerBase, { totalizerPropTypes } from '../Totalizer/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'

const Totalizer: FC<TotalizerProps> = props => {
  return (
    <ActionBar id={NAMESPACES.TOTALIZER} order={ORDER_CLASSNAMES.TOTALIZER}>
      <TotalizerBase {...props} />
    </ActionBar>
  )
}

export type TotalizerProps = InferProps<typeof totalizerPropTypes>

export default Totalizer
