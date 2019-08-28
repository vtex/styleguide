import React from 'react'

const useTablePagination = (items: Array<unknown>, tableLength: number) => {
  const totalItems = items.length
  const [state, setState] = React.useState({
    ts: tableLength,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: tableLength,
    slicedItems: [...items].slice(0, tableLength),
  })

  const onNextClick = () => {
    const newPage = state.currentPage + 1
    const itemFrom = state.currentItemTo + 1
    const itemTo = state.ts * newPage
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }

  const onPrevClick = () => {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - state.ts
    const itemTo = state.currentItemFrom - 1
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }

  const onRowsChange = (e: any, value: any) => {
    const ts = parseInt(value)
    const newItems = [...items].slice(state.currentItemFrom, ts)
    setState(state => ({
      ...state,
      tableSize: ts,
      currentItemTo: ts,
      slicedItems: newItems,
    }))
  }

  return {
    currentItemFrom: state.currentItemFrom,
    currentItemTo: state.currentItemTo,
    slicedItems: state.slicedItems,
    totalItems,
    onNextClick,
    onPrevClick,
    onRowsChange,
  }
}

export default useTablePagination
