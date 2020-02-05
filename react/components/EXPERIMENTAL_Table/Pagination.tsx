import React, { FC } from 'react'

import PaginationBase from '../Pagination/index'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable } from './types'

const Pagination: FC<PaginationProps> = ({ testId = '', ...props }) => {
  return (
    <ActionBar
      id={NAMESPACES.PAGINATION}
      testId={testId}
      order={ORDER_CLASSNAMES.PAGINATION}
      noMargin>
      <PaginationBase {...props} />
    </ActionBar>
  )
}

export type PaginationProps = E2ETestable & {
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

export default Pagination
