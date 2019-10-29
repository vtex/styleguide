import React, {
  useRef,
  useState,
  FC,
  useLayoutEffect,
  useCallback,
} from 'react'

import Button from '../../Button/index.js'

export default function usePopoverMenu() {
  const [boxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef(null)

  const handleOutsideClick = (e: Event) =>
    buttonRef &&
    buttonRef.current &&
    e.target instanceof Node &&
    !buttonRef.current.contains(e.target) &&
    setBoxVisible(false)

  useLayoutEffect(() => {
    if (boxVisible) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [boxVisible])

  const toggleBox = useCallback(() => {
    setBoxVisible(!boxVisible)
  }, [boxVisible])

  return { boxVisible, setBoxVisible, buttonRef, toggleBox }
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
  const isAlignRight = alignMenu === Alignment.Right

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

export const Item: FC<ItemProps> = ({ isSelected, onClick, children }) => {
  return (
    <div
      className={`flex justify-between ph6 pv3 ${
        isSelected ? 'b--emphasis' : 'b--transparent'
      } pointer hover-bg-muted-5 bl bw1`}
      onClick={onClick}>
      <span className={`w-100 flex justify-between ${isSelected ? 'fw5' : ''}`}>
        {children}
      </span>
    </div>
  )
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
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isSelected?: boolean
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

export enum Alignment {
  Left = 'left',
  Right = 'right',
}
