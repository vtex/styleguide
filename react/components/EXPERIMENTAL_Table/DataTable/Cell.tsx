import React, { FC } from 'react'
import styled from 'styled-components'
import csx from 'classnames'

import CaretDown from '../../icon/CaretDown/index.js'
import CaretUp from '../../icon/CaretUp/index.js'
import Checkbox, { CheckboxProps } from '../Checkbox'

const PREFIX_GAP = 35
const SUFIX_GAP = 0.5

const VisuallyHidden = styled.span`
  display: none;
  margin-left: ${SUFIX_GAP}rem;
  position: absolute;
`

const Visible = styled(VisuallyHidden)`
  display: inline;
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
  tagName = 'td',
  className = '',
  active = false,
  link = false,
}) => {
  const classNames = csx('v-mid ph3 pv0 tl bb b--muted-4', className, {
    pointer: onClick,
    'hover-c-link hover-bg-muted-5': link,
    'c-on-base': active,
  })
  return (
    <Container
      as={tagName}
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

const Suffix: FC<SuffixProps> = ({ active, ascending }) => {
  const Caret = ascending ? CaretDown : CaretUp
  const Wrapper = active ? Visible : VisuallyHidden
  return (
    <Wrapper>
      <Caret className="ml2" size={10} />
    </Wrapper>
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

type SuffixProps = {
  active: boolean
  ascending: boolean
}

export type CellComposites = {
  Prefix?: FC<PrefixProps> & PrefixComposites
  Suffix?: FC<SuffixProps>
}

export type CellProps = {
  id?: string
  width?: number | string | React.ReactText
  tagName?: 'td' | 'th' | 'div' | 'li'
  className?: string
  onClick?: () => void
  showArrow?: boolean
  active?: boolean
  link?: boolean
}

export default Cell
