import React, { FC } from 'react'
import classNames from 'classnames'

import useTableMotion from '../hooks/useTableMotion'
import Cell, { CellProps, CellComposites } from './Cell'

const Row: FC<RowProps> & RowComposites = ({
  children,
  height,
  onClick,
  active,
  motion,
  highlightOnHover,
}) => {
  const LIGHT_BLUE = '#DBE9FD'

  const className = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': onClick,
    'hover-bg-muted-5': highlightOnHover,
    'bg-action-secondary': active,
  })
  
  const style = {
    height,
    ...motion,
  }

  if (active) {
    style['background-color'] = LIGHT_BLUE
  }

  return (
    <tr style={style} onClick={onClick} className={className}>
      {children}
    </tr>
  )
}

Row.Cell = Cell

export const ROW_TRANSITIONS = [
  {
    prop: 'height',
    duration: 200,
    func: 'ease-in-out',
    delay: 0,
    optimize: true,
  },
]

export type RowComposites = {
  Cell: FC<CellProps> & CellComposites
}

export type RowProps = {
  active?: boolean
  height?: number
  onClick?: () => void
  motion?: ReturnType<typeof useTableMotion>
  highlightOnHover?: boolean
}

export default Row
