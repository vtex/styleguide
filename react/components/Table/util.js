export const constants = {
  TABLE_HEADER_HEIGHT: 36,
  EMPTY_STATE_SIZE_IN_ROWS: 5,
  DEFAULT_SCROLLBAR_WIDTH: 17,
  DENSITY_OPTIONS: ['low', 'medium', 'high'],
  FIELDS_BOX_ITEM_HEIGHT: 36,
  BOX_SHADOW_STYLE: { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' },
  MEDIUM_ICON_SIZE: 14,
  MAX_FIELDS_BOX_HEIGHT: 192,
  FIELDS_BOX_WIDTH: 292,
  LIGHT_ICON_SIZE: 16,
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

export const calculateTableHeight = (tableRowHeight, totalItems) => {
  const multiplicator =
    totalItems !== 0 ? totalItems : constants.EMPTY_STATE_SIZE_IN_ROWS
  return (
    constants.TABLE_HEADER_HEIGHT +
    tableRowHeight * multiplicator +
    getScrollbarWidth()
  )
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
