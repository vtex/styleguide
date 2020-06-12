import React, { PropsWithChildren } from 'react'

import { Column } from './types'
import { Measures, MeasuresProvider } from './context/measures'
import { DataProvider } from './context/data'
import { BodyProvider, BodyProps } from './context/body'
import Body from './components/Body'
import ScrollView from './components/ScrollView'
import Head from './components/Head'
import { HeadProvider, HeadProps } from './context/head'
import { LoadingEmptyProvider, LoadingEmptyProps } from './context/loadingEmpty'
import LoadingView from './components/LoadingView'
import EmptyView from './components/EmptyView'

interface Props<T> extends BodyProps<T>, HeadProps, LoadingEmptyProps {
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
    loading,
    empty,
  } = props
  return (
    <DataProvider columns={columns} items={items}>
      <LoadingEmptyProvider loading={loading} empty={empty}>
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
      </LoadingEmptyProvider>
    </DataProvider>
  )
}

Grid.defaultProps = {
  items: [],
  highlightOnHover: false,
  getRowKey: (item: { id: 'string ' }) => item.id,
  stickyHeader: false,
  loading: false,
  empty: false,
}

Grid.Head = Head
Grid.Body = Body
Grid.ScrollView = ScrollView
Grid.LoadingView = LoadingView
Grid.EmptyView = EmptyView

export default Grid
