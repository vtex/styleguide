import React, { FC } from 'react'

import PaginationBase from '../Pagination/index'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'

const Pagination: FC<PaginationProps> = props => {
  return (
    <span id={NAMESPACES.PAGINATION} className={ORDER_CLASSNAMES.PAGINATION}>
      <PaginationBase {...props} />
    </span>
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

export default Pagination
