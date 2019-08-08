export const constants = {
  TABLE_HEADER_HEIGHT: 36,
  ROW_HEIGHT: 48,
  EMPTY_STATE_SIZE_IN_ROWS: 5,
  DEFAULT_SCROLLBAR_WIDTH: 17,
}

export const getScrollbarWidth = () => {
  if (!window || !document || !document.documentElement)
    return constants.DEFAULT_SCROLLBAR_WIDTH
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  return isNaN(scrollbarWidth)
    ? constants.DEFAULT_SCROLLBAR_WIDTH
    : scrollbarWidth
}

export const calculateTableHeight = (
  tableRowHeight: number,
  totalItems: number
): number => {
  const multiplicator =
    totalItems !== 0 ? totalItems : constants.EMPTY_STATE_SIZE_IN_ROWS
  return (
    constants.TABLE_HEADER_HEIGHT +
    tableRowHeight * multiplicator +
    getScrollbarWidth()
  )
}
