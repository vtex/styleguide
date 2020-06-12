import React, { createContext, useContext, PropsWithChildren } from 'react'

import useGridMeasures from '../hooks/useGridMeasures'

export type Measures = ReturnType<typeof useGridMeasures>

const Context = createContext<Measures>(null)

export function useMeasuresContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Do not use measures outside of context')
  }
  return context
}

export function MeasuresProvider({
  measures,
  children,
}: PropsWithChildren<{ measures: Measures }>) {
  return <Context.Provider value={measures}>{children}</Context.Provider>
}
