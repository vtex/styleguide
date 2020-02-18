/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useContext, createContext } from 'react'

import { E2ETestable } from './types'
import useTableMeasures from './hooks/useTableMeasures'

type Measures = Partial<ReturnType<typeof useTableMeasures>>
interface LC {
  empty?: boolean
  loading?:
    | boolean
    | {
        renderAs?: () => React.ReactNode
      }
  emptyState?: {
    label?: string
    children?: Element
  }
}

const TestingContext = createContext<E2ETestable>(null)
const MeasuresContext = createContext<Measures>(null)
const LoadingContext = createContext<LC>(null)
const BodyContext = createContext<any>(null)
const HeadContext = createContext<any>(null)

type TableType = E2ETestable & {
  measures: Measures
  body: any
  head: any
  loading: LC
}

export const TableProvider: FC<TableType> = ({
  children,
  testId,
  measures,
  loading,
  body,
  head,
}) => {
  return (
    <TestingContext.Provider value={{ testId }}>
      <MeasuresContext.Provider value={measures}>
        <LoadingContext.Provider value={loading}>
          <HeadContext.Provider value={head}>
            <BodyContext.Provider value={body}>{children}</BodyContext.Provider>
          </HeadContext.Provider>
        </LoadingContext.Provider>
      </MeasuresContext.Provider>
    </TestingContext.Provider>
  )
}

export function useTestingContext() {
  const context = useContext(TestingContext)
  if (!context) {
    throw new Error(
      'Do not use E2ETestable components outside of the TestingContext'
    )
  }
  return context
}

export function useMeasuresContext() {
  const context = useContext(MeasuresContext)
  if (!context) {
    throw new Error(
      'Do not use measurable components outside of the MeasuresContext'
    )
  }
  return context
}

export function useBodyContext() {
  const context = useContext(BodyContext)
  if (!context) {
    throw new Error('Do not use body outside of the Table')
  }
  return context
}

export function useHeadContext() {
  const context = useContext(HeadContext)
  if (!context) {
    throw new Error('Do not use head outside of the Table')
  }
  return context
}

export function useLoadingContext() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error(
      'Do not use measurable components outside of the MeasuresContext'
    )
  }
  return context
}
