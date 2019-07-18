import React, { useReducer, useMemo, useEffect } from 'react'
import reduce from 'lodash/reduce'

import CheckboxContainer from '../CheckboxContainer'
import reducer from './reducer'
import types from './actionTypes'
import { getRowHeight, getInitialHiddenFieldsFromSchema } from '../util'

const useTableState = (schema, items, density, bulkActions) => {
  const [state, dispatch] = useReducer(reducer, {
    tableRowHeight: getRowHeight(density),
    selectedRows: [],
    allLinesSelected: false,
    selectedDensity: density,
    hiddenFields: getInitialHiddenFieldsFromSchema(schema),
  })

  const hasPrimaryBulkAction = useMemo(
    () =>
      bulkActions &&
      bulkActions.main &&
      typeof bulkActions.main.handleCallback === 'function',
    [bulkActions]
  )

  const hasSecondaryBulkActions = useMemo(
    () => bulkActions.others && bulkActions.others.length > 0,
    [bulkActions]
  )

  const hasBulkActions = hasPrimaryBulkAction || hasSecondaryBulkActions

  const data = useMemo(() => {
    return hasBulkActions ? items.map((item, i) => ({ id: i, ...item })) : items
  }, [items])

  const staticSchema = useMemo(
    () =>
      hasBulkActions
        ? {
            ...schema,
            properties: {
              bulk: {
                width: 40,
                // eslint-disable-next-line
                headerRenderer: () => {
                  const selectedRowsLength = state.selectedRows.length
                  const itemsLength = data.length

                  const isChecked = selectedRowsLength === itemsLength
                  const isPartial =
                    selectedRowsLength > 0 && selectedRowsLength < itemsLength

                  return (
                    <CheckboxContainer
                      checked={isChecked}
                      onClick={() => selectAllVisibleRows(data)}
                      id="all"
                      partial={isPartial}
                    />
                  )
                },
                // eslint-disable-next-line
                cellRenderer: ({ rowData }) => (
                  <CheckboxContainer
                    checked={state.selectedRows.some(
                      row => row.id === rowData.id
                    )}
                    onClick={() => selectRow(rowData)}
                    id={rowData.id}
                    disabled={state.allLinesSelected}
                  />
                ),
              },
              ...schema.properties,
            },
          }
        : schema,
    [state.selectedRows, state.allLinesSelected]
  )

  const displaySchema = useMemo(() => {
    return {
      ...staticSchema,
      properties: reduce(
        staticSchema.properties,
        (acc, value, key) => {
          if (state.hiddenFields.includes && state.hiddenFields.includes(key)) {
            return acc
          }
          return { ...acc, [key]: value }
        },
        {}
      ),
    }
  }, [state.hiddenFields, state.selectedRows])

  useEffect(() => {
    if (bulkActions && bulkActions.onChange) {
      const selectedParameters = state.allLinesSelected
        ? { allLinesSelected: true }
        : { selectedRows: state.selectedRows }
      bulkActions.onChange(selectedParameters)
    }
  }, [state.selectedRows, state.allLinesSelected, bulkActions])

  const setDensity = density => {
    dispatch({ type: types.SET_DENSITY, density })
  }

  const toggleColumn = key => {
    dispatch({ type: types.HIDE_COLUMN, key: key })
  }

  const showAllColumns = () => {
    dispatch({ type: types.UNHIDE_ALL_COLUMNS })
  }

  const hideAllColumns = properties => {
    dispatch({
      type: types.HIDE_ALL_COLUMNS,
      hiddenFields: properties,
    })
  }

  const selectAllRows = data => {
    dispatch({
      type: types.SELECT_ALL_LINES,
      selectedRows: data,
    })
  }

  const deselectAllRows = () => {
    dispatch({ type: types.DESELECT_ALL_LINES })
  }

  const selectAllVisibleRows = data => {
    if (
      state.selectedRows.length <= data.length &&
      state.selectedRows.length !== 0
    ) {
      deselectAllRows()
    } else {
      dispatch({
        type: types.SELECT_ALL_LINES,
        selectedRows: data,
      })
    }
  }

  const selectRow = row => {
    dispatch({ type: types.SELECT_LINE, row })
  }

  return {
    state,
    dispatch,
    setDensity,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    displaySchema,
    data,
    staticSchema,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,
    hasBulkActions,
  }
}

export default useTableState
