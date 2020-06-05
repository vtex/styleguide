import React, { forwardRef, Ref, PropsWithChildren, FC } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import {
  E2ETestable,
  ComposableWithRef,
  HasMotion,
  NativeTable,
} from '../types'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'
import { useLoadingContext } from '../context/loading'
import Tbody, { ComposableTbody } from './Tbody'
import Thead, { ComposableThead } from './Thead'
import LoadedView from './LoadedView'

type Props = PropsWithChildren<
  E2ETestable & HasMotion & NativeTable & { disableScroll?: boolean }
>

function Sections(
  { children, className, motion, disableScroll = false }: Props,
  ref: Ref<HTMLTableElement>
) {
  const { emptyState, empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()

  return (
    <div
      style={{ height: tableHeight, ...motion }}
      className={classNames('mw-100', ORDER_CLASSNAMES.TABLE, {
        'overflow-x-auto overflow-y-auto overflow-hidden': !disableScroll,
      })}>
      <table
        ref={ref}
        data-testid={testId}
        className={classNames('w-100', className)}
        style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
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
  LoadedView?: FC
}

export type ComposableSections = ComposableWithRef<
  HTMLTableElement,
  Props,
  Composites
>

const FowardedSections: ComposableSections = forwardRef(Sections)

FowardedSections.Head = Thead
FowardedSections.Body = Tbody
FowardedSections.LoadedView = LoadedView

export default FowardedSections
