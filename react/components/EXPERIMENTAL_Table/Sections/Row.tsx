import React, { forwardRef, Ref, FC } from 'react'
import classNames from 'classnames'
import pick from 'lodash/pick'
import get from 'lodash/get'

import useTableMotion from '../hooks/useTableMotion'
import { Column, RenderProps, NativeTr } from '../types'
import { useDataContext } from '../context/data'
import { useBodyContext } from '../context/body'
import { useMeasuresContext } from '../context/measures'
import Cell, { ComposableCell } from './Cell'

interface RowRenderProps {
  props: {
    width?: number | string
  }
  key: string
  data?: object
  column: Column
  motion?: ReturnType<typeof useTableMotion>
  index: number
}

interface SpecificProps extends NativeTr {
  height: number
  motion?: ReturnType<typeof useTableMotion>
  data?: object
}

type Props = RenderProps<SpecificProps, RowRenderProps>

function Row(
  { children, motion, data, height, ...props }: Props,
  ref: Ref<HTMLTableRowElement>
) {
  const LIGHT_BLUE = '#DBE9FD'
  const { rowHeight, density } = useMeasuresContext()
  const { columns } = useDataContext()
  const { highlightOnHover, isRowActive, onRowClick } = useBodyContext()
  const className = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': onRowClick,
    'hover-bg-muted-5': highlightOnHover ?? !!onRowClick,
  })
  const rowColor =
    data && isRowActive && isRowActive(data)
      ? { backgroundColor: LIGHT_BLUE }
      : {}
  const clickable = onRowClick
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
          })
        }

        const { cellRenderer, condensed, extended } = column
        const cellData = condensed
          ? pick(data, condensed)
          : extended
          ? data
          : get(data, id)

        const content = cellRenderer
          ? cellRenderer({
              data: cellData,
              rowHeight: rowHeight ?? 0,
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
  Cell: ComposableCell
}

export type ComposableRow = FC<Props> & Composites

const FowardedRow = (forwardRef(Row) as unknown) as ComposableRow

FowardedRow.Cell = Cell

export default FowardedRow
