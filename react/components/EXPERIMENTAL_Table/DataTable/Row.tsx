import React, { FC } from 'react'
import csx from 'classnames'

import useTableMotion from '../hooks/useTableMotion'


const Row: FC<RowProps> & RowComposites = ({
  as: Tag = 'tr',
  children,
  height,
  onClick,
  active,
  motion,
}) => {
  const className = csx('w-100 truncate overflow-x-hidden', {
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

export const Cell: FC<CellProps> = ({
  children,
  width,
  onClick,
  as: Tag = 'td',
  className = '',
}) => {
  const classNames = csx('v-mid ph3 pv0 tl bb b--muted-4', className, {
    'pointer hover-c-link hover-bg-muted-5': onClick,
  })

  return (
    <Tag onClick={onClick} style={{ width }} className={classNames}>
      {children}
    </Tag>
  )
}

export type RowComposites = {
  Cell: FC<CellProps>
}

export type CellProps = {
  id?: string
  width?: number | string
  as?: 'td' | 'th' | 'div' | 'li'
  className?: string
  onClick?: () => void
}

export type RowProps = {
  as?: 'tr' | 'div' | 'ul'
  active?: boolean
  height?: number
  onClick?: () => void
  motion?: ReturnType<typeof useTableMotion>
}

Row.Cell = Cell

export default Row
