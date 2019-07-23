import React, { useReducer, useMemo, useEffect } from 'react'
import reduce from 'lodash/reduce'

import CheckboxContainer from '../CheckboxContainer'
import reducer, { actionTypes } from '../reducer'
import {
  getRowHeight,
  getInitialHiddenFieldsFromSchema,
  calculateTableHeight,
} from '../util'

const useTableState = (schema, items, density, bulkActions, pagination) => {
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
    () => bulkActions && bulkActions.others && bulkActions.others.length > 0,
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
                      onClick={selectAllVisibleRows}
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

  const isEmptyState = useMemo(() => {
    const properties = Object.keys(staticSchema.properties)
    return !!(
      properties.length === 0 || properties.length === state.hiddenFields.length
    )
  }, [staticSchema, state.hiddenFields])

  const tableHeight = useMemo(
    () => calculateTableHeight(state.tableRowHeight, data.length),
    [state.tableRowHeight, pagination]
  )

  const tablePagination = useMemo(() => {
    if (pagination && hasBulkActions) {
      const paginationClone = Object.assign({}, pagination)
      paginationClone.onNextClick = () => {
        deselectAllRows()
        pagination.onNextClick()
      }
      paginationClone.onPrevClick = () => {
        deselectAllRows()
        pagination.onPrevClick()
      }
      return paginationClone
    }

    return pagination
  }, [pagination])

  useEffect(() => {
    if (bulkActions && bulkActions.onChange) {
      const selectedParameters = state.allLinesSelected
        ? { allLinesSelected: true }
        : { selectedRows: state.selectedRows }
      bulkActions.onChange(selectedParameters)
    }
  }, [state.selectedRows, state.allLinesSelected, bulkActions])

  const setDensity = density => {
    dispatch({ type: actionTypes.SET_DENSITY, density })
  }

  const setTableRowHeight = tableRowHeight => {
    dispatch({ type: actionTypes.SET_TABLE_ROW_HEIGHT, tableRowHeight })
  }

  const setSelectedRows = selectedRows => {
    dispatch({ type: actionTypes.SET_SELECTED_ROWS, selectedRows })
  }

  const setAllLinesSelected = allLinesSelected => {
    dispatch({ type: actionTypes.SET_ALL_LINES_SELECTED, allLinesSelected })
  }

  const setHiddenFields = hiddenFields => {
    dispatch({ type: actionTypes.SET_HIDDEN_FIELDS, hiddenFields })
  }

  const toggleColumn = key => {
    dispatch({ type: actionTypes.HIDE_COLUMN, key: key })
  }

  const showAllColumns = () => {
    dispatch({ type: actionTypes.UNHIDE_ALL_COLUMNS })
  }

  const hideAllColumns = () => {
    dispatch({
      type: actionTypes.HIDE_ALL_COLUMNS,
      hiddenFields: Object.keys(staticSchema.properties),
    })
  }

  const selectAllRows = () => {
    dispatch({
      type: actionTypes.SELECT_ALL_ROWS,
      selectedRows: data,
    })
  }

  const deselectAllRows = () => {
    dispatch({ type: actionTypes.DESELECT_ALL_ROWS })
  }

  const selectAllVisibleRows = () => {
    if (
      state.selectedRows.length <= data.length &&
      state.selectedRows.length !== 0
    ) {
      deselectAllRows()
    } else {
      setSelectedRows(data)
    }
  }

  const selectRow = row => {
    dispatch({ type: actionTypes.SELECT_ROW, row })
  }

  return {
    state,
    data,
    staticSchema,
    displaySchema,
    setDensity,
    setTableRowHeight,
    setSelectedRows,
    setAllLinesSelected,
    setHiddenFields,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,
    hasBulkActions,
    tablePagination,
    isEmptyState,
    tableHeight,
  }
}

export default useTableState
