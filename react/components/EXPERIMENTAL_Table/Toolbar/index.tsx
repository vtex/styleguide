import React, { FC } from 'react'

import Container from './Container'
import ButtonGroup from './ButtonGroup'

interface Composites {
  ButtonGroup: FC
}

const Toolbar: FC & Composites = ({ children }) => {
  return <Container>{children}</Container>
}

Toolbar.ButtonGroup = ButtonGroup

export default Toolbar
