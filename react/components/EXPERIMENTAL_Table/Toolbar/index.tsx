import React, { FC } from 'react'

import Container, { Justify } from './Container'
import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'
import UNSAFE_InputCustom, { InputCustomProps } from './InputCustom'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
  UNSAFE_InputCustom: FC<InputCustomProps>
}

type ToolbarChild = {
  type: {
    name: 'InputSearch' | 'ButtonGroup' | 'UNSAFE_InputCustom'
  }
}

const Toolbar: FC & Composites = ({ children }) => {
  const hasSearchBar = React.Children.toArray(children).some(
    (child: ToolbarChild) =>
      child.type.name === 'InputSearch' ||
      child.type.name === 'UNSAFE_InputCustom'
  )
  return (
    <Container justify={hasSearchBar ? Justify.Between : Justify.End}>
      {children}
    </Container>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup
Toolbar.UNSAFE_InputCustom = UNSAFE_InputCustom

export default Toolbar
