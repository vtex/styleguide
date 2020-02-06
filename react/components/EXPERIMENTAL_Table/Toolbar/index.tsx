import React, { FC, createContext, useContext } from 'react'

import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'
import InputAutocomplete from './InputAutocomplete'
import { AutocompleteInputProps } from '../../AutocompleteInput'
import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'
import ActionBar from '../ActionBar'
import { E2ETestable } from '../types'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
  InputAutocomplete: FC<AutocompleteInputProps>
}

const ToolbarContext = createContext<E2ETestable>(null)

const ToolbarProvider: FC<E2ETestable> = ({ children, testId }) => {
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

const Toolbar: FC<E2ETestable> & Composites = ({
  testId = NAMESPACES.TOOLBAR.CONTAINER,
  children,
}) => {
  const positionFixer =
    React.Children.count(children) > 1 ? null : (
      <div className={ORDER_CLASSNAMES.TOOLBAR_CHILD.POSITION_FIXER} />
    )

  return (
    <ActionBar
      id={NAMESPACES.TOOLBAR.CONTAINER}
      testId={testId}
      order={ORDER_CLASSNAMES.TOOLBAR}
      className="flex flex-row flex-wrap w-100 justify-between">
      <ToolbarProvider testId={testId}>
        {children}
        {positionFixer}
      </ToolbarProvider>
    </ActionBar>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup
Toolbar.InputAutocomplete = InputAutocomplete

export default Toolbar
