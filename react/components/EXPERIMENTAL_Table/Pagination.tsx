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
  onNextClick: (e: any) => void
  onPrevClick: (e: any) => void
  onRowsChange: (e: any, value: any) => void
}

export default Pagination
