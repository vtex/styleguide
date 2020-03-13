import React, { forwardRef } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable, RFC, ComposableWithRef } from '../types'
import { useHeadContext } from '../context/head'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'
import { useLoadingContext } from '../context/loading'
import Tbody, { ComposableTbody } from './Tbody'
import Thead, { ComposableThead } from './Thead'

export interface DataTableProps extends E2ETestable {
  className?: string
  motion?: ReturnType<typeof useTableMotion>
}

const DataTable: RFC<HTMLTableElement, DataTableProps> = (
  { children, className, motion },
  ref
) => {
  const { emptyState, empty, loading } = useLoadingContext()
  const { sticky } = useHeadContext()
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()

  return (
    <div
      style={{ height: tableHeight, ...motion }}
      className={classNames(
        'order-1 mw-100 overflow-x-auto',
        ORDER_CLASSNAMES.TABLE,
        {
          'overflow-y-auto': sticky,
        }
      )}>
      <table
        ref={ref}
        data-testid={testId}
        className={`w-100 ${className}`}
        style={{ borderSpacing: 0 }}>
        {children}
      </table>
      {!empty && loading && (
        <Loading
          testId={`${testId}__loading`}
          motion={motion}
          height={tableHeight - TABLE_HEADER_HEIGHT}>
          {typeof loading !== 'boolean' &&
            loading.renderAs &&
            loading.renderAs()}
        </Loading>
      )}
      {empty && emptyState && (
        <EmptyState testId={`${testId}__empty-state`} title={emptyState.label}>
          {emptyState.children}
        </EmptyState>
      )}
    </div>
  )
}

interface Composites {
  Head?: ComposableThead
  Body?: ComposableTbody
}

const FowardedDataTable: ComposableWithRef<
  HTMLTableElement,
  DataTableProps,
  Composites
> = forwardRef(DataTable)

FowardedDataTable.Head = Thead
FowardedDataTable.Body = Tbody

export default FowardedDataTable
