import React, { FC, useContext, createContext } from 'react'

import { E2ETestable } from './types'
import useTableMeasures from './hooks/useTableMeasures'

type Measures = ReturnType<typeof useTableMeasures>

const TestingContext = createContext<E2ETestable>(null)
const MeasuresContext = createContext<Measures>(null)

type TableType = E2ETestable & {
  measures: Measures
}

export const TableProvider: FC<TableType> = ({
  children,
  testId,
  measures,
}) => {
  return (
    <TestingContext.Provider value={{ testId }}>
      <MeasuresContext.Provider value={measures}>
        {children}
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
