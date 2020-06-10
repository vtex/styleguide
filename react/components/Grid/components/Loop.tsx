/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, ReactNode } from 'react'

interface Props<T> {
  list: T[]
  getKey?: (item: T) => string
  children?: (item: T, index: number) => ReactNode
}

function Loop<Item>({
  list,
  getKey = (item: any) => item?.id ?? '',
  children,
}: Props<Item>) {
  return (
    <Fragment>
      {list.map((item, index) => {
        if (!item) return
        const key = getKey(item)
        return <Fragment key={key}>{children(item, index)}</Fragment>
      })}
    </Fragment>
  )
}

export default Loop
