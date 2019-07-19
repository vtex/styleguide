import constants from './constants'
import getScrollbarWidth from './getScrollbarWidth'

export default (tableRowHeight, totalItems) => {
  const multiplicator =
    totalItems !== 0 ? totalItems : constants.EMPTY_STATE_SIZE_IN_ROWS
  return (
    constants.TABLE_HEADER_HEIGHT +
    tableRowHeight * multiplicator +
    getScrollbarWidth()
  )
}
