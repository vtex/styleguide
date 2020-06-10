import React, { PropsWithChildren } from 'react'

import { Column } from './types'
import { Measures, MeasuresProvider } from './context/measures'
import { DataProvider } from './context/data'
import { BodyProvider, BodyProps } from './context/body'
import Body from './components/Body'
import ScrollView from './components/ScrollView'
import Head from './components/Head'
import { HeadProvider, HeadProps } from './context/head'
import Loop from './components/Loop'

interface Props<T> extends BodyProps<T>, HeadProps {
  columns: Column<T>[]
  items: T[]
  measures: Measures
}

function AbstractGrid<T>(props: PropsWithChildren<Props<T>>) {
  const {
    children,
    measures,
    columns,
    items,
    onRowClick,
    highlightOnHover,
    rowKey,
    isRowActive,
    stickyHeader,
  } = props
  return (
    <DataProvider columns={columns} items={items}>
      <MeasuresProvider measures={measures}>
        <HeadProvider stickyHeader={stickyHeader}>
          <BodyProvider
            onRowClick={onRowClick}
            highlightOnHover={highlightOnHover}
            rowKey={rowKey}
            isRowActive={isRowActive}>
            {children}
          </BodyProvider>
        </HeadProvider>
      </MeasuresProvider>
    </DataProvider>
  )
}

AbstractGrid.Head = Head
AbstractGrid.Body = Body
AbstractGrid.ScrollView = ScrollView
AbstractGrid.Loop = Loop

export default AbstractGrid
