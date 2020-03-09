import React, { DetailedHTMLProps, forwardRef, FC } from 'react'
import classNames from 'classnames'
import pick from 'lodash/pick'

import useTableMotion from '../hooks/useTableMotion'
import { ComposableWithRef, Column, RFCRP } from '../types'
import { useDataContext } from '../context/data'
import { useBodyContext } from '../context/body'
import { useMeasuresContext } from '../context/measures'
import Cell, { CellComposites, CellProps } from './Cell'

const Row: RFCRP<HTMLTableRowElement, RowProps> = (
  { children, motion, data, height, ...props },
  ref
) => {
  const { rowHeight, density } = useMeasuresContext()
  const { columns } = useDataContext()
  const { highlightOnHover, isRowActive, onRowClick } = useBodyContext()
  const className = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': onRowClick,
    'hover-bg-muted-5': highlightOnHover || !!onRowClick,
    'bg-action-secondary': isRowActive && isRowActive(data),
  })
  const clickable = onRowClick && {
    onClick: () => onRowClick({ rowData: data }),
  }
  const style = {
    height,
    ...props.style,
    ...motion,
  }
  return (
    <tr {...props} ref={ref} style={style} {...clickable} className={className}>
      {columns.map((column: Column, index: number) => {
        const { id, width } = column

        if (children) {
          return children({
            props: {
              key: id,
              width,
            },
            data,
            column,
            motion,
            index,
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

type NativeTr = DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>

export interface RowProps extends NativeTr {
  height: number
  motion?: ReturnType<typeof useTableMotion>
  data: unknown
}

interface Composites {
  Cell?: FC<CellProps> & CellComposites
}

export type ComposableRow = ComposableWithRef<
  HTMLTableRowElement,
  RowProps,
  Composites
>

const FowardedRow: ComposableRow = forwardRef(Row)

FowardedRow.Cell = Cell

export default FowardedRow
