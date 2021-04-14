import React, { useContext, createContext, PropsWithChildren } from 'react'

interface BodyProps {
  onRowClick?: (data: { rowData: unknown }) => void
  isRowActive?: (data: unknown) => boolean
  rowKey?: (data: { rowData: unknown }) => string
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
  onRowClick,
  isRowActive,
  rowKey,
  highlightOnHover,
}: PropsWithChildren<BodyProps>) {
  const value = React.useMemo(
    () => ({
      onRowClick,
      isRowActive,
      rowKey,
      highlightOnHover,
    }),
    [highlightOnHover, isRowActive, onRowClick, rowKey]
  )

  return <BodyContext.Provider value={value}>{children}</BodyContext.Provider>
}
