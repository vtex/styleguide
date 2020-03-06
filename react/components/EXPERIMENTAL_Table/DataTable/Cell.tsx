import React, {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  CSSProperties,
} from 'react'
import classNames from 'classnames'

import CaretDown from '../../icon/CaretDown/index.js'
import CaretUp from '../../icon/CaretUp/index.js'
import Checkbox, { CheckboxProps } from '../Checkbox'

const PREFIX_GAP = 35
const SUFIX_GAP = 0.5

const HoverContext = createContext<boolean>(false)

function HoverProvider({ children, value }) {
  return <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
}

function useHover(init = false) {
  const [hover, setHover] = useState(init)

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)

  return {
    hover,
    onMouseEnter,
    onMouseLeave,
  }
}

const Cell: FC<CellProps> & CellComposites = ({
  children,
  width,
  onClick,
  className: classNameProp,
  sorting,
  sortable = false,
  sticky = false,
  header,
}) => {
  const className = classNames(
    'v-mid ph3 pv0 tl bb b--muted-4',
    classNameProp,
    {
      pointer: onClick,
      'c-on-base': sorting,
      'bg-base': header,
      'top-0 z3': sticky && header,
      z1: !sticky,
    }
  )
  const tag = header ? 'th' : 'td'
  const style = {
    position: sticky ? 'sticky' : 'static',
    width,
  } as CSSProperties
  const Container = sortable ? HoverableCell : DefaultCell

  return (
    <Container tag={tag} onClick={onClick} style={style} className={className}>
      {children}
    </Container>
  )
}

interface CellContainer
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  > {
  tag: string
}

function HoverableCell({
  children,
  tag: Tag,
  ...props
}: PropsWithChildren<CellContainer>) {
  const { hover, ...events } = useHover()
  return (
    <Tag {...events} {...props}>
      <HoverProvider value={hover}>{children}</HoverProvider>
    </Tag>
  )
}

function DefaultCell({
  children,
  tag: Tag,
  ...props
}: PropsWithChildren<CellContainer>) {
  return <Tag {...props}>{children}</Tag>
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

function Eyesight({ children, visible }) {
  const className = classNames({ dn: !visible, inline: visible }, 'absolute')
  return (
    <span className={className} style={{ marginLeft: `${SUFIX_GAP}rem` }}>
      {children}
    </span>
  )
}

const Suffix: FC<SuffixProps> = ({ sorting, ascending }) => {
  const Caret = ascending ? CaretDown : CaretUp
  const hover = useContext(HoverContext)
  return (
    <Eyesight visible={sorting || hover}>
      <Caret className="ml2" size={10} />
    </Eyesight>
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
  sorting: boolean
  ascending: boolean
}

export type CellComposites = {
  Prefix?: FC<PrefixProps> & PrefixComposites
  Suffix?: FC<SuffixProps>
}

export type CellProps = {
  id?: string
  width?: number | string | React.ReactText
  className?: string
  onClick?: () => void
  showArrow?: boolean
  sortable?: boolean
  sorting?: boolean
  sticky?: boolean
  header?: boolean
}

export default Cell
