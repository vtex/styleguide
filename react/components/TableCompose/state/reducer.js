import types from './actionTypes'
import { getRowHeight } from '../util'

export default (state, action) => {
  switch (action.type) {
    case types.SET_DENSITY: {
      return {
        ...state,
        selectedDensity: action.density,
        tableRowHeight: getRowHeight(action.density),
      }
    }
    case types.DESELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case types.SELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case types.SELECT_LINE: {
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
    case types.HIDE_COLUMN: {
      const index = state.hiddenFields.indexOf(action.key)

      return index === -1
        ? {
            ...state,
            hiddenFields: [...state.hiddenFields, action.key],
          }
        : {
            ...state,
            hiddenFields: state.hiddenFields.filter(
              field => field !== action.key
            ),
          }
    }
    case types.HIDE_ALL_COLUMNS: {
      return {
        ...state,
        hiddenFields: action.hiddenFields,
      }
    }
    case types.UNHIDE_ALL_COLUMNS: {
      return {
        ...state,
        hiddenFields: [],
      }
    }
    default: {
      return state
    }
  }
}
