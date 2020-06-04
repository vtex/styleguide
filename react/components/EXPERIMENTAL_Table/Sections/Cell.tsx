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

import CaretDown from '../../icon/CaretDown/index.js'
import CaretUp from '../../icon/CaretUp/index.js'

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
  tag: CellTag
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

type Props = PropsWithChildren<SpecificProps>

function Cell(
  {
    children,
    width,
    onClick,
    className: classNameProp,
    sorting = false,
    sortable = false,
    sticky = false,
    header = false,
  }: Props,
  ref: Ref<HTMLTableCellElement>
) {
  const Container = sortable ? HoverableCell : DefaultCell
  const containerProps = {
    onClick,
    tag: header ? CellTag.Th : CellTag.Td,
    className: classNames('v-mid ph3 pv0 tl bb b--muted-4', classNameProp, {
      pointer: onClick,
      'c-on-base': sorting,
      'bg-base': header,
      'top-0 z3': sticky && header,
      z1: !sticky,
    }),
    style: {
      position: sticky ? 'sticky' : 'static',
      width,
    } as CSSProperties,
  }

  return (
    <Container ref={ref} {...containerProps}>
      {children}
    </Container>
  )
}

function HoverProvider({
  children,
  value,
}: PropsWithChildren<{ value: boolean }>) {
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

function Eyesight({
  children,
  visible,
}: PropsWithChildren<{ visible: boolean }>) {
  const SUFIX_GAP = 0.5
  const className = classNames({ dn: !visible, inline: visible }, 'absolute')
  return (
    <span className={className} style={{ marginLeft: `${SUFIX_GAP}rem` }}>
      {children}
    </span>
  )
}

interface SuffixProps {
  sorting?: boolean
  ascending?: boolean
}

function Suffix({ sorting, ascending }: SuffixProps) {
  const Caret = ascending ? CaretDown : CaretUp
  const hover = useContext(HoverContext)
  return (
    <Eyesight visible={sorting ?? hover}>
      <Caret className="ml2" size={10} />
    </Eyesight>
  )
}

interface Composites {
  Suffix: FC<SuffixProps>
}

interface SpecificProps {
  width?: number | string | React.ReactText
  className?: string
  onClick?: () => void
  sortable?: boolean
  sorting?: boolean
  sticky?: boolean
  header?: boolean
}

export type ComposableCell = FC<Props> & Composites

const ForwardedCell = (forwardRef(Cell) as unknown) as ComposableCell

ForwardedCell.Suffix = Suffix

export default ForwardedCell
