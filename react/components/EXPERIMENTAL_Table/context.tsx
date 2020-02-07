import React, { FC, useContext, createContext } from 'react'

import { E2ETestable } from './types'

const TestingContext = createContext<E2ETestable>(null)

export const TableProvider: FC<E2ETestable> = ({ children, testId }) => {
  return (
    <TestingContext.Provider value={{ testId }}>
      {children}
    </TestingContext.Provider>
  )
}

export function useTestingContext() {
  const context = useContext(TestingContext)
  if (!context) {
    throw new Error(
      'Do not use E2ETestable components outside of the testing context'
    )
  }
  return context
}
