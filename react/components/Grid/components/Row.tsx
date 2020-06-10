import React, { ReactNode } from 'react'
import pick from 'lodash/pick'

import { Column } from '../types'
import { useDataContext } from '../context/data'
import { useMeasuresContext } from '../context/measures'
import Loop from './Loop'

interface RenderProps<T> {
  data: T
  index: number
  ctx: {
    computedStyle: Record<string, string | number>
    computedClassName: string
  }
}

interface Props<T> {
  data: T
  children: (props: RenderProps<T>) => ReactNode
}

function Row<T>({ children, data }: Props<T>) {
  const { columns } = useDataContext()
  const { baseHeight, density } = useMeasuresContext()

  return (
    <Loop list={columns}>
      {(column, index) => {
        const { width } = column

        const computedClassName = 'v-mid ph3 pv0 tl bb b--muted-4'

        const computedStyle = {
          width,
          height: baseHeight,
        }

        const content = getCellContent<T>(data, column, {
          rowHeight: baseHeight,
          density,
        })

        return children({
          data: content,
          index,
          ctx: { computedStyle, computedClassName },
        })
      }}
    </Loop>
  )
}

function getCellContent<T>(
  data: T,
  column: Column<T>,
  render: { rowHeight: number; density: string }
) {
  const { id, cellRenderer, condensed, extended } = column

  const cellData = condensed
    ? pick(data, condensed)
    : extended
    ? data
    : data[id]

  const content = cellRenderer
    ? cellRenderer({
        data: cellData,
        ...render,
      })
    : cellData

  return content
}

export default Row
