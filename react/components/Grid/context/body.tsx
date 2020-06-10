/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, createContext, PropsWithChildren } from 'react'

export interface BodyProps<T = any> {
  onRowClick?: (data: T) => void
  isRowActive?: (data: T) => boolean
  getRowKey?: (data: T) => string
  highlightOnHover?: boolean
}

const BodyContext = createContext<BodyProps>(null)

export function useBodyContext() {
  const context = useContext(BodyContext)
  if (!context) {
    throw new Error('Do not use body components outside of the BodyContext')
  }
  return context
}

export function BodyProvider({
  children,
  ...value
}: PropsWithChildren<BodyProps>) {
  return <BodyContext.Provider value={value}>{children}</BodyContext.Provider>
}
