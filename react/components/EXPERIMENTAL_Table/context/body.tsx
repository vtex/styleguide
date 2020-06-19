import React, { useContext, createContext, PropsWithChildren } from 'react'

interface BodyProps {
  onRowClick?: (data: { rowData: unknown }) => void
  isRowActive?: (data: unknown) => boolean
  rowKey: (data: { rowData: unknown }) => string
  highlightOnHover?: boolean
}

const BodyContext = createContext<BodyProps | null>(null)

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
