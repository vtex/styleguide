import React, { FC } from 'react'
import classNames from 'classnames'

import useTableMotion from '../hooks/useTableMotion'
import Cell, { CellProps, CellComposites } from './Cell'

const Row: FC<RowProps> & RowComposites = ({
  tagName: Tag = 'tr',
  children,
  height,
  onClick,
  active,
  motion,
}) => {
  const className = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link hover-bg-muted-5': onClick,
    'bg-action-secondary': active,
  })
  const style = {
    height,
    ...motion,
  }
  return (
    <Tag style={style} onClick={onClick} className={className}>
      {children}
    </Tag>
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
  tagName?: 'tr' | 'div' | 'ul'
  active?: boolean
  height?: number
  onClick?: () => void
  motion?: ReturnType<typeof useTableMotion>
}

export default Row
