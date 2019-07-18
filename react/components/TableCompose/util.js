const TABLE_HEADER_HEIGHT = 36
const EMPTY_STATE_SIZE_IN_ROWS = 5
const DEFAULT_SCROLLBAR_WIDTH = 17

export const getRowHeight = density => {
  switch (density) {
    case 'low':
      return 76
    case 'medium':
      return 48
    case 'high':
      return 32
    default:
      return 45
  }
}

export const getInitialHiddenFieldsFromSchema = schema => {
  const hiddenFields = []
  Object.keys(schema.properties).forEach(key => {
    if (schema.properties[key].hidden) {
      hiddenFields.push(key)
    }
  })
  return hiddenFields
}

export const getScrollbarWidth = () => {
  if (!window || !document || !document.documentElement)
    return DEFAULT_SCROLLBAR_WIDTH
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  return isNaN(scrollbarWidth) ? DEFAULT_SCROLLBAR_WIDTH : scrollbarWidth
}

export const calculateTableHeight = (tableRowHeight, totalItems) => {
  const multiplicator = totalItems !== 0 ? totalItems : EMPTY_STATE_SIZE_IN_ROWS
  return (
    TABLE_HEADER_HEIGHT + tableRowHeight * multiplicator + getScrollbarWidth()
  )
}
