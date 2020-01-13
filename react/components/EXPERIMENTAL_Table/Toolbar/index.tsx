import React, { FC } from 'react'
import csx from 'classnames'

import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'
import InputAutocomplete from './InputAutocomplete'
import { AutocompleteInputProps } from '../../AutocompleteInput'
import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
  InputAutocomplete: FC<AutocompleteInputProps>
}

const Toolbar: FC & Composites = ({ children }) => {
  const positionFixer =
    React.Children.count(children) > 1 ? null : (
      <div className={ORDER_CLASSNAMES.TOOLBAR_CHILD.POSITION_FIXER} />
    )
  return (
    <div
      id={NAMESPACES.TOOLBAR.CONTAINER}
      className={csx(
        ORDER_CLASSNAMES.TOOLBAR,
        `mb5 flex flex-row flex-wrap w-100 justify-between`
      )}>
      {children}
      {positionFixer}
    </div>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup
Toolbar.InputAutocomplete = InputAutocomplete

export default Toolbar
