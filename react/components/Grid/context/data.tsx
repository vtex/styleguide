import React, { useContext, createContext, PropsWithChildren } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Data<T = any> {
  columns: Column<T>[]
  items: T[]
}

const DataContext = createContext<Data>(null)

export function useDataContext() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('Do not use columns or items outside of context')
  }
  return context
}

export function DataProvider<T>({
  children,
  ...value
}: PropsWithChildren<Data<T>>) {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
