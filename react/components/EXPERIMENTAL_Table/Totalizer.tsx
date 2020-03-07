import React, { forwardRef } from 'react'
import { InferProps } from 'prop-types'

import TotalizerBase, { totalizerPropTypes } from '../Totalizer/index.js'
import { ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable, RFC } from './types'
import { useTestingContext } from './context'

const Totalizer: RFC<HTMLElement, TotalizerProps> = (props, ref) => {
  const { testId } = useTestingContext()

  return (
    <ActionBar
      testId={`${testId}__totalizer`}
      order={ORDER_CLASSNAMES.TOTALIZER}>
      <TotalizerBase ref={ref} {...props} />
    </ActionBar>
  )
}

export type TotalizerProps = InferProps<typeof totalizerPropTypes> & E2ETestable

export default forwardRef(Totalizer)
