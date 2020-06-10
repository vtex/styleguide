import React, { createContext, useContext, PropsWithChildren } from 'react'

import useListMeasures from '../../../utilities/useListMeasures'

export type Measures = ReturnType<typeof useListMeasures>

const Context = createContext<Measures>(null)

export function useMeasuresContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Type a great message for this')
  }
  return context
}

export function MeasuresProvider({
  measures,
  children,
}: PropsWithChildren<{ measures: Measures }>) {
  return <Context.Provider value={measures}>{children}</Context.Provider>
}
