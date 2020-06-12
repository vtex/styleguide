import React, { ReactNode, Fragment } from 'react'
import classNames from 'classnames'

import Loop from './Loop'
import { useMeasuresContext } from '../context/measures'
import { useDataContext } from '../context/data'
import { useBodyContext } from '../context/body'
import Row from './Row'
import { useLoadingEmptyContext } from '../context/loadingEmpty'

const LIGHT_BLUE = '#DBE9FD'

interface DynamicRenderProps<T> {
  data: T
  index: number
  ctx: {
    computedStyle: Record<string, number | string>
    computedClassName: string
    handleClick: (data: T) => void
  }
}

interface StaticRenderProps<T> {
  data: T[]
  ctx: {
    getComputedStyle: (item: T) => Record<string, number | string>
    computedClassName: string
    handleClick?: (data: T) => void
  }
}

type StaticChildren<T> = (props: StaticRenderProps<T>) => ReactNode
type DynamicChildren<T> = (props: DynamicRenderProps<T>) => ReactNode

interface Props<T> {
  children: DynamicChildren<T> | StaticChildren<T>
  dynamic: boolean
}

function Body<T>({ dynamic = true, children }: Props<T>) {
  const { baseHeight } = useMeasuresContext()
  const { items } = useDataContext()
  const {
    highlightOnHover,
    isRowActive,
    onRowClick,
    getRowKey,
  } = useBodyContext()
  const { empty, loading } = useLoadingEmptyContext()

  const showBody = !empty && !loading

  const computedClassName = classNames('w-100 truncate overflow-x-hidden', {
    'pointer hover-c-link': onRowClick,
    'hover-bg-muted-5': highlightOnHover || !!onRowClick,
  })

  const getComputedStyle = (item: T): Record<string, number | string> => {
    const bg = isRowActive?.(item) ? { backgroundColor: LIGHT_BLUE } : {}
    return {
      height: baseHeight,
      ...bg,
    }
  }

  if (!showBody) {
    return null
  }

  if (!dynamic) {
    const staticChildren = children as StaticChildren<T>
    return (
      <Fragment>
        {staticChildren({
          data: items,
          ctx: {
            handleClick: onRowClick,
            computedClassName,
            getComputedStyle,
          },
        })}
      </Fragment>
    )
  }

  return (
    <Loop list={items} getKey={getRowKey}>
      {(item, index) => {
        const handleClick = onRowClick ? () => onRowClick(item) : () => null
        const dynamicChildren = children as DynamicChildren<T>
        return dynamicChildren({
          data: item,
          index,
          ctx: {
            computedStyle: getComputedStyle(item),
            computedClassName,
            handleClick,
          },
        })
      }}
    </Loop>
  )
}

Body.Row = Row

export default Body
