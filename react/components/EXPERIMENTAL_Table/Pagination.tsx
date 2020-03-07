import React, { forwardRef } from 'react'

import PaginationBase from '../Pagination/index'
import { ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { useTestingContext } from './context'
import { RFC } from './types'

const Pagination: RFC<HTMLElement, PaginationProps> = (props, ref) => {
  const { testId } = useTestingContext()
  return (
    <ActionBar
      testId={`${testId}__pagination`}
      order={ORDER_CLASSNAMES.PAGINATION}
      noMargin>
      <PaginationBase ref={ref} {...props} />
    </ActionBar>
  )
}

export type PaginationProps = {
  textShowRows: string
  textOf: string
  rowsOptions: Array<number>
  currentItemFrom: number
  currentItemTo: number
  totalItems: number
  onNextClick: (e: Event) => void
  onPrevClick: (e: Event) => void
  onRowsChange: (e: Event, value: unknown) => void
}

export default forwardRef(Pagination)
