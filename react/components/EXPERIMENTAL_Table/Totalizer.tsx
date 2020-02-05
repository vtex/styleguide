import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import TotalizerBase, { totalizerPropTypes } from '../Totalizer/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable } from './types'

const Totalizer: FC<TotalizerProps> = ({ testId = '', ...props }) => {
  return (
    <ActionBar
      id={NAMESPACES.TOTALIZER}
      testId={testId}
      order={ORDER_CLASSNAMES.TOTALIZER}>
      <TotalizerBase {...props} />
    </ActionBar>
  )
}

export type TotalizerProps = InferProps<typeof totalizerPropTypes> & E2ETestable

export default Totalizer
