import React, { FC } from 'react'
import csx from 'classnames'

import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'
import UNSAFE_InputCustom, { InputCustomProps } from './InputCustom'
import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
  UNSAFE_InputCustom: FC<InputCustomProps>
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
        `mb5 flex flex-row w-100 justify-between`
      )}>
      {children}
      {positionFixer}
    </div>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup
Toolbar.UNSAFE_InputCustom = UNSAFE_InputCustom

export default Toolbar
