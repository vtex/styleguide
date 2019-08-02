import { getRowHeight } from './util'

const actionTypes = {
  SET_DENSITY: 0,
  SET_SELECTED_ROWS: 1,
  SET_ALL_LINES_SELECTED: 2,
  SET_HIDDEN_FIELDS: 3,
  SET_TABLE_ROW_HEIGHT: 4,
  DESELECT_ALL_ROWS: 5,
  SELECT_ALL_ROWS: 6,
  SELECT_ROW: 7,
  HIDE_COLUMN: 8,
  HIDE_ALL_COLUMNS: 9,
  UNHIDE_ALL_COLUMNS: 10,
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DENSITY: {
      return {
        ...state,
        selectedDensity: action.density,
        tableRowHeight: getRowHeight(action.density),
      }
    }
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
    case actionTypes.SET_HIDDEN_FIELDS: {
      return {
        ...state,
        hiddenFields: action.hiddenFields,
      }
    }
    case actionTypes.SET_TABLE_ROW_HEIGHT: {
      return {
        ...state,
        tableRowHeight: action.tableRowHeight,
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

export default reducer
export { actionTypes }
