import React, { FC } from 'react'

import Container from './Container'
import ButtonGroup from './ButtonGroup'

interface ToolbarComposites {
  ButtonGroup: any
}

const Toolbar: FC & ToolbarComposites = ({ children }) => {
  return <Container>{children}</Container>
}

Toolbar.ButtonGroup = ButtonGroup

export default Toolbar
