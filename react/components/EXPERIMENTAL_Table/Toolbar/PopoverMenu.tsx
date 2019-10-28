import React, { useRef, useState, FC, createContext, useContext } from 'react'

import useOutsideClick from '../hooks/useOutsideClick'
import ToolbarButton, { ButtonProps } from './Button'
import Button from '../../Button/index.js'
import { BOX_ALIGNMENT } from '../constants'

const MenuContext = createContext<MenuContext>(null)

const MenuProvider: FC<{ value: MenuContext }> = ({ children, value }) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

const Menu: FC<MenuProps> & MenuComposites = ({ button, box, children }) => {
  const [isBoxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef(null)

  useOutsideClick(buttonRef, () => setBoxVisible(false), isBoxVisible)

  return (
    <MenuProvider value={{ isBoxVisible, setBoxVisible }}>
      <ToolbarButton
        {...button}
        ref={buttonRef}
        onClick={() => setBoxVisible(!isBoxVisible)}>
        {isBoxVisible && <Box {...box}>{children}</Box>}
      </ToolbarButton>
    </MenuProvider>
  )
}

export const Box: FC<BoxProps> = ({
  alignMenu,
  height,
  width,
  noMargin,
  borderClasses,
  groupActions,
  children,
}) => {
  const isAlignRight = alignMenu === BOX_ALIGNMENT.RIGHT
  return (
    <div
      className={`absolute z-999 shadow-4 ${
        isAlignRight ? 'right-0' : 'left-0'
      } ${borderClasses || 'b--muted-4 br2 ba'} ${noMargin ? '' : 'mt2 mh2'}`}
      style={{
        width: width,
      }}>
      <div className="w-100 b2 br2 bg-base">
        {groupActions && (
          <div className="flex inline-flex bb b--muted-4 w-100 justify-center pv4">
            {groupActions.map(action => (
              <div className="mh2" key={action.id}>
                <Button
                  variation="secondary"
                  size="small"
                  onClick={action.onClick}>
                  {action.label}
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="overflow-auto" style={{ height: height }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Item: FC<ItemProps> = ({
  isSelected,
  handleCallback,
  closeMenuOnClick,
  children,
}) => {
  const { setBoxVisible } = useContext(MenuContext)

  const handleClick = () => {
    closeMenuOnClick && setBoxVisible(false)
    handleCallback()
  }

  return (
    <div
      className={`flex justify-between ph6 pv3 ${
        isSelected ? 'b--emphasis' : 'b--transparent'
      } pointer hover-bg-muted-5 bl bw1`}
      onClick={handleClick}>
      <span className={`w-100 flex justify-between ${isSelected ? 'fw5' : ''}`}>
        {children}
      </span>
    </div>
  )
}

Menu.Item = Item

type MenuContext = {
  isBoxVisible: boolean
  setBoxVisible: (isBoxVisible: boolean) => void
}

type MenuProps = {
  button: ButtonProps
  box: BoxProps
}

type BoxProps = {
  height?: string | number
  width?: string | number
  alignMenu?: Alignment
  noMargin?: boolean
  borderClasses?: string
  groupActions?: Array<MenuAction>
}

type ItemProps = {
  handleCallback: Function
  isSelected?: boolean
  closeMenuOnClick?: boolean
}

type MenuComposites = {
  Item: FC<ItemProps>
}

export type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}

export default Menu
