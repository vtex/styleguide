import React, { FC } from 'react'

import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'
import InputAutocomplete from './InputAutocomplete'
import { AutocompleteInputProps } from '../../AutocompleteInput'
import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'
import ActionBar from '../ActionBar'
import { ToolbarProvider } from './context'
import { useTestingContext } from '../context'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
  InputAutocomplete: FC<AutocompleteInputProps>
}

const Toolbar: FC & Composites = ({ children }) => {
  const { testId } = useTestingContext()

  const toolbarTestId = `${testId}__toolbar`
  const positionFixer =
    React.Children.count(children) > 1 ? null : (
      <div className={ORDER_CLASSNAMES.TOOLBAR_CHILD.POSITION_FIXER} />
    )

  return (
    <ActionBar
      id={NAMESPACES.TOOLBAR.CONTAINER}
      testId={toolbarTestId}
      order={ORDER_CLASSNAMES.TOOLBAR}
      className="flex flex-row flex-wrap w-100 justify-between">
      <ToolbarProvider testId={toolbarTestId}>
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
