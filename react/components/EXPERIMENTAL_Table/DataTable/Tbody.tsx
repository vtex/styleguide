import React, {
  RefForwardingComponent,
  forwardRef,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import pick from 'lodash/pick'

import {
  useHeadContext,
  useBodyContext,
  useLoadingContext,
  useTestingContext,
  useMeasuresContext,
} from '../context'
import useTableMotion from '../hooks/useTableMotion'
import Row, { ROW_TRANSITIONS } from './Row'
import Cell from './Cell'
import { Column } from '../types'

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer?: (props: any) => React.ReactNode
}

const Tbody: RefForwardingComponent<HTMLTableSectionElement, Props> = (
  { renderer, ...rest },
  ref
) => {
  const { columns } = useHeadContext()
  const {
    onRowClick,
    isRowActive,
    items,
    rowKey,
    highlightOnHover,
  } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const { rowHeight, currentDensity } = useMeasuresContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
      {items.map((rowData, rowIndex: number) => {
        const clickable = onRowClick
          ? {
              onClick: () => onRowClick({ rowData }),
              highlightOnHover: true,
            }
          : { highlightOnHover }

        const rp = {
          rowData,
          rowIndex,
          rowProps: {
            ...clickable,
            height: rowHeight,
            active: isRowActive && isRowActive(rowData),
            key: rowKey({ rowData }),
            motion,
            children: columns.map((column: Column) => {
              const { cellRenderer, width } = column
              const data = column.condensed
                ? pick(rowData, column.condensed)
                : column.extended
                ? rowData
                : rowData[column.id]
              const content = cellRenderer
                ? cellRenderer({
                    data,
                    rowHeight,
                    currentDensity,
                    motion,
                  })
                : data
              return (
                <Cell key={column.id} width={width}>
                  {content}
                </Cell>
              )
            }),
          },
        }
        return renderer(rp)
      })}
    </tbody>
  ) : null
}

// TODO: type this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fowardedTbody: any = forwardRef(Tbody)

fowardedTbody.Row = Row

export default fowardedTbody
