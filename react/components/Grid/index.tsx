import React, { PropsWithChildren } from 'react'

import { Column } from './types'
import { Measures, MeasuresProvider } from './context/measures'
import { DataProvider } from './context/data'
import { BodyProvider, BodyProps } from './context/body'
import Body from './components/Body'
import ScrollView from './components/ScrollView'
import Head from './components/Head'
import { HeadProvider, HeadProps } from './context/head'

interface Props<T> extends BodyProps<T>, HeadProps {
  columns: Column<T>[]
  measures: Measures
  items?: T[]
}

function Grid<T>(props: PropsWithChildren<Props<T>>) {
  const {
    children,
    measures,
    columns,
    items,
    onRowClick,
    highlightOnHover,
    getRowKey,
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
            getRowKey={getRowKey}
            isRowActive={isRowActive}>
            {children}
          </BodyProvider>
        </HeadProvider>
      </MeasuresProvider>
    </DataProvider>
  )
}

Grid.defaultProps = {
  items: [],
  onRowClick: () => null,
  highlightOnHover: false,
  getRowKey: (item: { id: 'string ' }) => item.id,
  isRowActive: () => false,
  stickyHeader: false,
}

Grid.Head = Head
Grid.Body = Body
Grid.ScrollView = ScrollView

export default Grid
