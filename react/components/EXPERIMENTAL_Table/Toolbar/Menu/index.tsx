import React, { useRef, useState, FC } from 'react'

import { MenuProvider } from './context'
import useOutsideClick from '../../hooks/useOutsideClick'
import Button, { ButtonProps } from '../Button'
import Box, { BoxProps } from './Box'
import Item, { ItemProps } from './Item'

type Props = {
  button: ButtonProps
  box: BoxProps
}

interface Composites {
  Item: FC<ItemProps>
}

const Menu: FC<Props> & Composites = ({ button, box, children }) => {
  const [isBoxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef(null)

  useOutsideClick(buttonRef, () => setBoxVisible(false), isBoxVisible)

  return (
    <MenuProvider value={{ isBoxVisible, setBoxVisible }}>
      <Button
        {...button}
        ref={buttonRef}
        onClick={() => setBoxVisible(!isBoxVisible)}>
        {isBoxVisible && <Box {...box}>{children}</Box>}
      </Button>
    </MenuProvider>
  )
}

Menu.Item = Item

export default Menu
