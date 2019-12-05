import React, { FC } from 'react'
import csx from 'classnames'
import uuid from 'uuid'
import { motion } from 'framer-motion'

import { NAMESPACES } from '../constants'

const Row: FC<RowProps> & RowComposites = ({
  children,
  height,
  onClick,
  active,
  transition,
  as: As = 'tr',
}) => {
  const genericProps = {
    onClick,
    children,
    key: `${NAMESPACES.ROW}-${uuid()}`,
    className: csx('w-100 truncate overflow-x-hidden', {
      'pointer hover-c-link hover-bg-muted-5': onClick,
      'bg-action-secondary': active,
    }),
  }
  const specProps = transition || { style: { height } }
  const props = { ...genericProps, ...specProps }

  const Tag = transition ? motion[As] : As

  return <Tag {...props} />
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

export function useDeferredTransition(
  propName: string,
  value: number,
  duration = 0.188
) {
  const deferredValue = React.useRef<number>()

  React.useEffect(() => {
    deferredValue.current = value
  }, [value])

  return {
    transition: { default: { duration } },
    initial: { [propName]: deferredValue.current || value },
    animate: { [propName]: value },
  }
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
  active?: boolean
  height?: number
  transition?: ReturnType<typeof useDeferredTransition>
  as?: 'tr' | 'div' | 'ul'
  onClick?: () => void
}

Row.Cell = Cell

export default Row
