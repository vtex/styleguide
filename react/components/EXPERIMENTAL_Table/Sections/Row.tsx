import React, { forwardRef, Ref } from 'react'
import classNames from 'classnames'
import pick from 'lodash/pick'

import useTableMotion from '../hooks/useTableMotion'
import { ComposableWithRef, Column, RenderProps, NativeTr } from '../types'
import { useDataContext } from '../context/data'
import { useBodyContext } from '../context/body'
import { useMeasuresContext } from '../context/measures'
import Cell, { ComposableCell } from './Cell'

interface RowRenderProps {
  props: {
    width: number | string
  }
  key: string
  data: unknown
  column: Column
  motion: ReturnType<typeof useTableMotion>
  index: number
  header: boolean
}

interface SpecificProps extends NativeTr {
  height: number
  motion?: ReturnType<typeof useTableMotion>
  data?: unknown
  header?: boolean
}

type Props = RenderProps<SpecificProps, RowRenderProps>

function Row(
  { children, motion, data, height, header = false, ...props }: Props,
  ref: Ref<HTMLTableRowElement>
) {
  const LIGHT_BLUE = '#DBE9FD'
  const { rowHeight, density } = useMeasuresContext()
  const { columns } = useDataContext()
  const { highlightOnHover, isRowActive, onRowClick } = useBodyContext()
  const className = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': !header && onRowClick,
    'hover-bg-muted-5': !header && (highlightOnHover || !!onRowClick),
  })
  const rowColor =
    data && isRowActive && isRowActive(data)
      ? { backgroundColor: LIGHT_BLUE }
      : {}
  const clickable =
    !header && onRowClick
      ? {
          onClick: () => onRowClick({ rowData: data }),
        }
      : {}
  const style = {
    height,
    ...props.style,
    ...motion,
    ...rowColor,
  }

  return (
    <tr {...props} ref={ref} style={style} {...clickable} className={className}>
      {columns.map((column: Column, index: number) => {
        const { id, width } = column

        if (children) {
          return children({
            props: {
              width,
            },
            key: id,
            data,
            column,
            motion,
            index,
            header,
          })
        }

        const { cellRenderer, condensed, extended } = column
        const cellData = condensed
          ? pick(data, condensed)
          : extended
          ? data
          : data[id]

        const content = cellRenderer
          ? cellRenderer({
              data: cellData,
              rowHeight,
              density,
              motion,
            })
          : cellData
        return (
          <Cell key={id} width={width}>
            {content}
          </Cell>
        )
      })}
    </tr>
  )
}

export const ROW_TRANSITIONS = [
  {
    prop: 'height',
    duration: 200,
    func: 'ease-in-out',
    delay: 0,
    optimize: true,
  },
]

interface Composites {
  Cell?: ComposableCell
}

export type ComposableRow = ComposableWithRef<
  HTMLTableRowElement,
  Props,
  Composites
>

const FowardedRow: ComposableRow = forwardRef(Row)

FowardedRow.Cell = Cell

export default FowardedRow
