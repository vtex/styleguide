import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  Ref,
  forwardRef,
  FC,
} from 'react'
import classNames from 'classnames'
import omit from 'lodash/omit'

import CaretDown from '../../icon/CaretDown/index.js'
import CaretUp from '../../icon/CaretUp/index.js'
import { ComposableWithRef } from '../types'

const HoverContext = createContext<boolean>(false)

export enum CellTag {
  Td = 'td',
  Th = 'th',
}

interface CellContainer
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  tag?: CellTag
}

const HoverableCell = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<CellContainer>
>(({ children, tag: Tag, ...props }, ref) => {
  const { hover, ...events } = useHover()
  return (
    <Tag {...events} {...props} ref={ref}>
      <HoverProvider value={hover}>{children}</HoverProvider>
    </Tag>
  )
})

HoverableCell.displayName = 'HoverableCell'

const DefaultCell = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<CellContainer>
>(({ children, tag: Tag, ...props }, ref) => {
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
})

DefaultCell.displayName = 'DefaultCell'

type Props = PropsWithChildren<SpecificProps & CellContainer>

function Cell(
  {
    children,
    onClick,
    className: classNameProp,
    width = 0,
    height = 0,
    sorting = false,
    sortable = false,
    sticky = false,
    header = false,
    style = {},
    ...props
  }: Props,
  ref: Ref<HTMLTableCellElement>
) {
  const Container = sortable ? HoverableCell : DefaultCell
  const containerProps = {
    onClick,
    tag: header ? CellTag.Th : CellTag.Td,
    className: classNames('v-mid pv0 tl bb b--muted-4', classNameProp, {
      ph3: width !== '0%',
      pointer: onClick,
      'c-on-base': sorting,
      'bg-base bt': header,
      'top-0 z3': sticky && header,
      z1: !sticky,
    }),
    style: {
      position: sticky ? 'sticky' : 'static',
      width,
      height,
      transition: 'width 500ms',
      ...style,
    } as CSSProperties,
    ...omit(props, ['ref']),
  }

  return (
    <Container ref={ref} {...containerProps}>
      {children}
    </Container>
  )
}

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

function Eyesight({ children, visible }) {
  const SUFIX_GAP = 0.5
  const className = classNames({ dn: !visible, inline: visible }, 'absolute')
  return (
    <span className={className} style={{ marginLeft: `${SUFIX_GAP}rem` }}>
      {children}
    </span>
  )
}

interface SuffixProps {
  sorting: boolean
  ascending: boolean
}

function Suffix({ sorting, ascending }: SuffixProps) {
  const Caret = ascending ? CaretDown : CaretUp
  const hover = useContext(HoverContext)
  return (
    <Eyesight visible={sorting || hover}>
      <Caret className="ml2" size={10} />
    </Eyesight>
  )
}

interface Composites {
  Suffix: FC<SuffixProps>
}

interface SpecificProps {
  width?: number | string | React.ReactText
  height?: number
  className?: string
  onClick?: () => void
  sortable?: boolean
  sorting?: boolean
  sticky?: boolean
  header?: boolean
}

export type ComposableCell = ComposableWithRef<
  HTMLTableCellElement,
  Props,
  Composites
>

const ForwardedCell: ComposableCell = forwardRef(Cell)

ForwardedCell.Suffix = Suffix

export default ForwardedCell
