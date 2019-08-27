export const NAMESPACE_PREFIX = 'vtex-table-v2'
export const NAMESPACES = {
  CONTAINER: `${NAMESPACE_PREFIX}__container`,
  TABLE: `${NAMESPACE_PREFIX}`,
  HEADER: `${NAMESPACE_PREFIX}__header`,
  ROW: `${NAMESPACE_PREFIX}__row`,
  CELL: `${NAMESPACE_PREFIX}__cell`,
  TOOLBAR: {
    CONTAINER: `${NAMESPACE_PREFIX}__toolbar__container`,
    BUTTON_GROUP: `${NAMESPACE_PREFIX}__toolbar__button-group`,
    BUTTON_DENSITY: `${NAMESPACE_PREFIX}__toolbar__button-density`,
    BUTTON_DOWNLOAD: `${NAMESPACE_PREFIX}__toolbar__button-donwload`,
    BUTTON_UPLOAD: `${NAMESPACE_PREFIX}__toolbar__button-upload`,
    BUTTON_NEWLINE: `${NAMESPACE_PREFIX}__toolbar__button-newline`,
    BUTTON_EXTRA_ACTIONS: `${NAMESPACE_PREFIX}__toolbar__button-extra-actions`,
  },
}
export const TABLE_DENSITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}
export const TABLE_HEADER_HEIGHT = 36
export const EMPTY_STATE_SIZE_IN_ROWS = 5
export const DEFAULT_SCROLLBAR_WIDTH = 17
export const FIELDS_BOX_ITEM_HEIGHT = 36
export const ICON_SIZE = {
  HEAVY: 13,
  MEDIUM: 14,
  LIGHT: 16,
}
export const DENSITY_OPTIONS = [
  TABLE_DENSITIES.LOW,
  TABLE_DENSITIES.MEDIUM,
  TABLE_DENSITIES.HIGH,
]
export const NESTED_ROW_PREFIX_WIDTH = 36
