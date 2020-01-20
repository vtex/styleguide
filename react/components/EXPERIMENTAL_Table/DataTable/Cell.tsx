import React, { FC } from 'react'
import styled from 'styled-components'
import csx from 'classnames'

import CaretDown from '../../icon/CaretDown/index.js'
import Checkbox, { CheckboxProps } from '../Checkbox'

const PREFIX_GAP = 35
const SUFIX_GAP = 0.5

const VisuallyHidden = styled.span`
  display: none;
  margin-left: ${SUFIX_GAP}rem;
  position: absolute;
`

const Container = styled.td`
  &:hover ${VisuallyHidden} {
    display: inline;
  }
`

const Cell: FC<CellProps> & CellComposites = ({
  children,
  width,
  onClick,
  as = 'td',
  className = '',
}) => {
  const classNames = csx('v-mid ph3 pv0 tl bb b--muted-4', className, {
    'pointer hover-c-link hover-bg-muted-5': onClick,
  })
  return (
    <Container
      as={as}
      onClick={onClick}
      style={{ width }}
      className={classNames}>
      {children}
    </Container>
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

const Suffix: FC = () => {
  return (
    <VisuallyHidden>
      <CaretDown size={10} />
    </VisuallyHidden>
  )
}

Cell.Prefix = Prefix
Cell.Suffix = Suffix
Prefix.Checkbox = Checkbox

type PrefixComposites = {
  Checkbox?: FC<CheckboxProps>
}

type PrefixProps = {
  depth?: number
}

export type CellComposites = {
  Prefix?: FC<PrefixProps> & PrefixComposites
  Suffix?: FC
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
