import getRowHeight from './getRowHeight'
import actionTypes from './actionTypes'

export default (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DENSITY: {
      return {
        ...state,
        selectedDensity: action.density,
        tableRowHeight: getRowHeight(action.density),
      }
    }
    case actionTypes.DESELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case actionTypes.SELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case actionTypes.SELECT_LINE: {
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
    case actionTypes.HIDE_COLUMN: {
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
    case actionTypes.HIDE_ALL_COLUMNS: {
      return {
        ...state,
        hiddenFields: action.hiddenFields,
      }
    }
    case actionTypes.UNHIDE_ALL_COLUMNS: {
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
