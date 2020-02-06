import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import TotalizerBase, { totalizerPropTypes } from '../Totalizer/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable } from './types'
import { useTestingContext } from './context'

const Totalizer: FC<TotalizerProps> = props => {
  const { testId } = useTestingContext()

  return (
    <ActionBar
      id={NAMESPACES.TOTALIZER}
      testId={`${testId}__totalizer`}
      order={ORDER_CLASSNAMES.TOTALIZER}>
      <TotalizerBase {...props} />
    </ActionBar>
  )
}

export type TotalizerProps = InferProps<typeof totalizerPropTypes> & E2ETestable

export default Totalizer
