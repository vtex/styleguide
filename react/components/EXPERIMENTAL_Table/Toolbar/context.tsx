import React, { FC, useContext, createContext } from 'react'

import { E2ETestable } from '../types'

const ToolbarContext = createContext<E2ETestable>(null)

export const ToolbarProvider: FC<E2ETestable> = ({ children, testId }) => {
  return (
    <ToolbarContext.Provider value={{ testId }}>
      {children}
    </ToolbarContext.Provider>
  )
}

export function useToolbarContext() {
  const context = useContext(ToolbarContext)
  if (!context) {
    throw new Error('Do not use Toolbar composites outside of context')
  }
  return context
}
