import React, { useContext, createContext, PropsWithChildren } from 'react'

interface Loading {
  empty?: boolean
  loading?:
    | boolean
    | {
        renderAs?: () => React.ReactNode
      }
  emptyState?: PropsWithChildren<{
    label?: string
  }>
}

const LoadingContext = createContext<Loading>(null)

export function LoadingProvider({
  children,
  ...value
}: PropsWithChildren<Loading>) {
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}

export function useLoadingContext() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error(
      'Do not use loading/emptyState components outside of the LoadingContext'
    )
  }
  return context
}
