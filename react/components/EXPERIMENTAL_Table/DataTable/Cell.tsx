import React, { FC } from 'react'
import csx from 'classnames'

import Checkbox, { CheckboxProps } from '../Checkbox'

const PREFIX_GAP = 35

const Cell: FC<CellProps> & CellComposites = ({
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

const Prefix: FC<PrefixProps> & PrefixComposites = ({
  children,
  depth = 0,
}) => {
  const width = PREFIX_GAP * depth
  return (
    <>
      <div className="dib" style={{ width }} />
      <div className="dib pr3 v-mid">
        <div className="flex w-100 items-center">{children}</div>
      </div>
    </>
  )
}

Cell.Prefix = Prefix
Prefix.Checkbox = Checkbox

type PrefixComposites = {
  Checkbox?: FC<CheckboxProps>
}

type PrefixProps = {
  depth?: number
}

export type CellComposites = {
  Prefix?: FC<PrefixProps> & PrefixComposites
}

export type CellProps = {
  id?: string
  width?: number | string | React.ReactText
  as?: 'td' | 'th' | 'div' | 'li'
  className?: string
  onClick?: () => void
  showArrow?: boolean
}

export default Cell
