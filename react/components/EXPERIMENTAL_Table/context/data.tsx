import React, { useContext, createContext, PropsWithChildren } from 'react'

import { Column, Items } from '../types'

interface Data {
  columns: Column[]
  items: Items
}

const DataContext = createContext<Data | null>(null)

export function useDataContext() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('Do not use columns or items outside of data Context')
  }
  return context
}

export function DataProvider({ children, ...value }: PropsWithChildren<Data>) {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
