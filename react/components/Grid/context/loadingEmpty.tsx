import React, { useContext, createContext, PropsWithChildren } from 'react'

export interface LoadingEmptyProps {
  empty?: boolean
  loading?: boolean
}

const Context = createContext<LoadingEmptyProps>(null)

export function LoadingEmptyProvider({
  children,
  ...value
}: PropsWithChildren<LoadingEmptyProps>) {
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLoadingEmptyContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'Do not use loading/emptyState components outside of context'
    )
  }
  return context
}
