import React, {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
  Children,
} from 'react'

import Checkbox from '../../EXPERIMENTAL_Table/Checkbox'

const WIDTH = 40

const useTableTreeCheckboxes = ({ items, columns }: hookInput) => {
  const parseTree = (
    item: { children?: Array<any> },
    index: number,
    path: string = ''
  ) => {
    const { children, ...rest } = item

    if (!children) return { id: `${path}.${index}`, ...item }

    const parsedChilden = children.map((child, i) => {
      return parseTree(child, i, `${path}.${index}`)
    })

    return {
      id: `${path}.${index}`,
      children: parsedChilden,
      ...rest,
    }
  }

  const bulkedItems = useMemo(() => {
    return items.map((item, i) => parseTree(item, i))
  }, [items, columns])

  return { bulkedItems }
}

function reducer(state: BulkState, action: Action) {
  switch (action.type) {
    case ActionType.SetSelectedRows: {
      return {
        ...state,
        selectedRows: action.selectedRows,
      }
    }
    case ActionType.SetAllLinesSelected: {
      return {
        ...state,
        allLinesSelected: action.allLinesSelected,
      }
    }
    case ActionType.DeselectAllRows: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case ActionType.SelectAllRows: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case ActionType.SelectRow: {
      return state.selectedRows.some(
        selectedRow => selectedRow.id === action.row.id
      )
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

enum ActionType {
  SetSelectedRows,
  SetAllLinesSelected,
  DeselectAllRows,
  SelectAllRows,
  SelectRow,
}

type Action = {
  type: ActionType
  selectedRows?: Array<BulkedItem>
  allLinesSelected?: boolean
  row?: BulkedItem
}

type Item = {
  children?: Array<Item>
}

type hookInput = {
  items: Array<Item>
  columns: Array<Column>
}

type hookReturn = {
  bulkedColumns?: Array<Column>
  bulkedItems?: Array<BulkedItem>
  bulkState?: BulkState
  hasBulkActions?: boolean
  hasPrimaryBulkAction?: boolean
  hasSecondaryBulkActions?: boolean
  selectAllRows?: () => void
  deselectAllRows?: () => void
  selectRow?: (row: BulkedItem) => void
  setSelectedRows?: (selectedRows: Array<BulkedItem>) => void
  setAllLinesSelected?: (allLinesSelected: boolean) => void
  selectAllVisibleRows?: () => void
}

export default useTableTreeCheckboxes
