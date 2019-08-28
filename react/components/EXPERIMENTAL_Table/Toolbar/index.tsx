import React, { FC } from 'react'

import Container from './Container'
import ButtonGroup from './ButtonGroup'
import InputSearch, { InputSearchProps } from './InputSearch'

interface Composites {
  InputSearch: FC<InputSearchProps>
  ButtonGroup: FC
}

type ToolbarChild = {
  type: {
    name: 'InputSearch' | 'ButtonGroup'
  }
}

const Toolbar: FC & Composites = ({ children }) => {
  const hasSearchBar = React.Children.toArray(children).some(
    (child: ToolbarChild) => child.type.name === 'InputSearch'
  )
  return (
    <Container justify={hasSearchBar ? 'between' : 'end'}>{children}</Container>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup

export default Toolbar
