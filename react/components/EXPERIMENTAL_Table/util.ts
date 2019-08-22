import {
  DEFAULT_SCROLLBAR_WIDTH,
  EMPTY_STATE_SIZE_IN_ROWS,
  TABLE_HEADER_HEIGHT,
} from './constants'

export const getScrollbarWidth = () => {
  if (!window || !document || !document.documentElement)
    return DEFAULT_SCROLLBAR_WIDTH
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  return isNaN(scrollbarWidth) ? DEFAULT_SCROLLBAR_WIDTH : scrollbarWidth
}

export const calculateTableHeight = (
  tableRowHeight: number,
  totalItems: number
): number => {
  const multiplicator = totalItems !== 0 ? totalItems : EMPTY_STATE_SIZE_IN_ROWS
  return (
    TABLE_HEADER_HEIGHT + tableRowHeight * multiplicator + getScrollbarWidth()
  )
}
