import React, { FC } from 'react'
import csx from 'classnames'
import uuid from 'uuid'
import { motion } from 'framer-motion'

import { NAMESPACES } from '../constants'

const TRANSITION_DURATION = 0.2

const Row: FC<RowProps> & RowComposites = ({
  children,
  height,
  onClick,
  active,
  animate,
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

  return animate ? (
    <motion.tr
      {...genericProps}
      transition={{ default: { duration: TRANSITION_DURATION } }}
      initial={animate.from}
      animate={animate.to}
    />
  ) : (
    <tr {...genericProps} style={{ height }} />
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

export function useDraftTransition(propName: string, value: any) {
  const prevValue = React.useRef()

  React.useEffect(() => {
    prevValue.current = value
  }, [value])

  return {
    from: { [propName]: prevValue.current || value },
    to: { [propName]: value },
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
  animate?: ReturnType<typeof useDraftTransition>
  onClick?: () => void
}

Row.Cell = Cell

export default Row
