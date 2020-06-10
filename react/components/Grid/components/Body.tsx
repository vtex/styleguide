import React, { ReactNode } from 'react'
import classNames from 'classnames'

import Loop from './Loop'
import { useMeasuresContext } from '../context/measures'
import { useDataContext } from '../context/data'
import { useBodyContext } from '../context/body'
import Row from './Row'

const LIGHT_BLUE = '#DBE9FD'

interface RenderProps<T> {
  data: T
  index: number
  ctx: {
    computedStyle: Record<string, number | string>
    computedClassName: string
    handleClick: (data: T) => void
  }
}

interface Props<T> {
  children: (props: RenderProps<T>) => ReactNode
}

function Body<T>({ children }: Props<T>) {
  const { baseHeight } = useMeasuresContext()
  const { items } = useDataContext()
  const { highlightOnHover, isRowActive, onRowClick, rowKey } = useBodyContext()

  const computedClassName = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': onRowClick,
    'hover-bg-muted-5': highlightOnHover || !!onRowClick,
  })

  return (
    <Loop list={items} getKey={rowKey}>
      {(item, index) => {
        const bg = isRowActive?.(item) ? { backgroundColor: LIGHT_BLUE } : {}

        const computedStyle = {
          height: baseHeight,
          ...bg,
        }

        const handleClick = onRowClick ? () => onRowClick(item) : () => null

        return children({
          data: item,
          index,
          ctx: { computedStyle, computedClassName, handleClick },
        })
      }}
    </Loop>
  )
}

Body.Row = Row

export default Body
