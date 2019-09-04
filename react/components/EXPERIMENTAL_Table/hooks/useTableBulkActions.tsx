import React, { useMemo, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../BulkActions/Checkbox'

const actionTypes = {
  SET_SELECTED_ROWS: 0,
  SET_ALL_LINES_SELECTED: 1,
  DESELECT_ALL_ROWS: 2,
  SELECT_ALL_ROWS: 3,
  SELECT_ROW: 4,
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ROWS: {
      return {
        ...state,
        selectedRows: action.selectedRows,
      }
    }
    case actionTypes.SET_ALL_LINES_SELECTED: {
      return {
        ...state,
        allLinesSelected: action.allLinesSelected,
      }
    }
    case actionTypes.DESELECT_ALL_ROWS: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case actionTypes.SELECT_ALL_ROWS: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case actionTypes.SELECT_ROW: {
      return state.selectedRows.some(el => el.id === action.row.id)
        ? {
            ...state,
            selectedRows: state.selectedRows.filter(
              row => row.id !== action.row.id
            ),
            allLinesSelected: false,
          }
        : {
            ...state,
            selectedRows: [...state.selectedRows, action.row],
          }
    }
    default: {
      return state
    }
  }
}

const useTableBulkActions = ({ items, columns, bulkActions }) => {
  const [bulkState, dispatch] = useReducer(reducer, {
    selectedRows: [],
    allLinesSelected: false,
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

  useEffect(() => {
    if (bulkActions && bulkActions.onChange) {
      const selectedParameters = bulkState.allLinesSelected
        ? { allLinesSelected: true }
        : { selectedRows: bulkState.selectedRows }
      bulkActions.onChange(selectedParameters)
    }
  }, [bulkState.selectedRows, bulkState.allLinesSelected, bulkActions])

  const bulkedItems = useMemo(() => {
    return hasBulkActions && items.map((item, i) => ({ id: i, ...item }))
  }, [items, columns])

  const bulkedColumns = useMemo(() => {
    const BulkHeader = () => {
      const selectedRowsLength = bulkState.selectedRows.length
      const itemsLength = bulkedItems.length

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
    }

    const BulkCell = ({ rowData }) => (
      <CheckboxContainer
        checked={bulkState.selectedRows.some(row => row.id === rowData.id)}
        onClick={() => selectRow(rowData)}
        id={rowData.id}
        disabled={bulkState.allLinesSelected}
      />
    )

    return hasBulkActions
      ? [
          {
            id: 'bulk',
            width: 40,
            headerRender: BulkHeader,
            cellRender: BulkCell,
          },
          ...columns,
        ]
      : columns
  }, [bulkState.selectedRows, bulkState.allLinesSelected])

  function selectAllRows() {
    dispatch({
      type: actionTypes.SELECT_ALL_ROWS,
      selectedRows: bulkedItems,
    })
  }

  function deselectAllRows() {
    dispatch({ type: actionTypes.DESELECT_ALL_ROWS })
  }

  function selectAllVisibleRows() {
    if (
      bulkState.selectedRows.length <= bulkedItems.length &&
      bulkState.selectedRows.length !== 0
    ) {
      deselectAllRows()
    } else {
      setSelectedRows(bulkedItems)
    }
  }

  function selectRow(row) {
    dispatch({ type: actionTypes.SELECT_ROW, row })
  }

  function setSelectedRows(selectedRows) {
    dispatch({ type: actionTypes.SET_SELECTED_ROWS, selectedRows })
  }

  function setAllLinesSelected(allLinesSelected) {
    dispatch({ type: actionTypes.SET_ALL_LINES_SELECTED, allLinesSelected })
  }

  return {
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,

    /** state */
    bulkState,

    /** data */
    bulkedColumns,
    bulkedItems,
    bulkActions,

    /** handler fn */
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    setSelectedRows,
    setAllLinesSelected,
  }
}

export default useTableBulkActions
