import React, { useContext, createContext, PropsWithChildren } from 'react'

import useTableMeasures from '../hooks/useTableMeasures'

type Measures = Partial<ReturnType<typeof useTableMeasures>>

const MeasuresContext = createContext<Measures | null>(null)

interface Props {
  measures: Measures
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

export function MeasuresProvider({
  measures,
  children,
}: PropsWithChildren<Props>) {
  return (
    <MeasuresContext.Provider value={measures}>
      {children}
    </MeasuresContext.Provider>
  )
}
