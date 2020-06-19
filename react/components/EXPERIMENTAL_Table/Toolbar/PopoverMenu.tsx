import React, {
  useRef,
  useState,
  FC,
  useLayoutEffect,
  useCallback,
} from 'react'
import classnames from 'classnames'

import Button from '../../Button'
import { E2ETestable } from '../types'

export default function usePopoverMenu() {
  const [boxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: Event) =>
    e.target instanceof Node &&
    !buttonRef?.current?.contains(e.target) &&
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
  testId,
  children,
}) => {
  const isAlignRight = alignMenu === Alignment.Right
  const className = classnames(
    `absolute z-999 shadow-4 ${borderClasses ?? 'b--muted-4 br2 ba'}`,
    {
      'right-0': isAlignRight,
      'left-0': !isAlignRight,
      'mt2 mh2': !noMargin,
    }
  )
  return (
    <div
      data-testid={`${testId}__box`}
      className={className}
      style={{
        width,
      }}
    >
      <div className="w-100 b2 br2 bg-base">
        {groupActions && (
          <div
            data-testid={`${testId}__box__group-actions`}
            className="flex inline-flex bb b--muted-4 w-100 justify-center pv4"
          >
            {groupActions.map(({ onClick: handleClick, id, label }) => (
              <div
                className="mh2"
                key={id}
                data-testid={`${testId}__group-actions--${id}`}
              >
                <Button
                  type="button"
                  variation="secondary"
                  size="small"
                  onClick={handleClick}
                >
                  {label}
                </Button>
              </div>
            ))}
          </div>
        )}
        <div
          data-testid={`${testId}__box__items`}
          className="overflow-auto"
          style={{ height }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const Item: FC<ItemProps> = ({
  isSelected,
  onClick: handleClick,
  children,
}) => {
  const containerClassName = classnames(
    'flex justify-between ph6 pv3 pointer hover-bg-muted-5 bl bw1',
    {
      'b--emphasis': isSelected,
      'b--transparent': !isSelected,
    }
  )
  const className = classnames('w-100 flex justify-between', {
    fw5: isSelected,
  })
  return (
    <div
      className={containerClassName}
      onClick={handleClick}
      onKeyPress={() => null}
      tabIndex={0}
      role="button"
    >
      <span className={className}>{children}</span>
    </div>
  )
}

type BoxProps = E2ETestable & {
  height?: string | number
  width?: string | number
  alignMenu?: Alignment
  noMargin?: boolean
  borderClasses?: string
  groupActions?: MenuAction[]
}

type ItemProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isSelected?: boolean
}

export type MenuAction = {
  label: string
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
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
