export const NAMESPACE_PREFIX = 'vtex-table-v2'
export const NAMESPACES = {
  CONTAINER: `${NAMESPACE_PREFIX}__container`,
  TABLE: `${NAMESPACE_PREFIX}`,
  HEADER: `${NAMESPACE_PREFIX}__header`,
  ROW: `${NAMESPACE_PREFIX}__row`,
  CELL: `${NAMESPACE_PREFIX}__cell`,
  TOOLBAR: {
    CONTAINER: `${NAMESPACE_PREFIX}__toolbar__container`,
    INPUT_SEARCH: `${NAMESPACE_PREFIX}__toolbar__input-search`,
    BUTTON_GROUP: `${NAMESPACE_PREFIX}__toolbar__button-group`,
    BUTTON_DENSITY: `${NAMESPACE_PREFIX}__toolbar__button-density`,
    BUTTON_DOWNLOAD: `${NAMESPACE_PREFIX}__toolbar__button-donwload`,
    BUTTON_UPLOAD: `${NAMESPACE_PREFIX}__toolbar__button-upload`,
    BUTTON_NEWLINE: `${NAMESPACE_PREFIX}__toolbar__button-newline`,
    BUTTON_EXTRA_ACTIONS: `${NAMESPACE_PREFIX}__toolbar__button-extra-actions`,
  },
  PAGINATION: `${NAMESPACE_PREFIX}__pagination`,
}

export const TABLE_DENSITIES = {
  LOW: 'low' as Density,
  MEDIUM: 'medium' as Density,
  HIGH: 'high' as Density,
}
export const DENSITY_OPTIONS = [
  TABLE_DENSITIES.LOW,
  TABLE_DENSITIES.MEDIUM,
  TABLE_DENSITIES.HIGH,
]

export const TABLE_HEADER_HEIGHT = 36
export const EMPTY_STATE_SIZE_IN_ROWS = 5
export const DEFAULT_SCROLLBAR_WIDTH = 17
export const FIELDS_BOX_ITEM_HEIGHT = 36
export const NESTED_ROW_PREFIX_WIDTH = 36

export const ICON_SIZE = {
  HEAVY: 13,
  MEDIUM: 14,
  LIGHT: 16,
}

export const BUTTON = {
  SIZE: {
    SMALL: 'small' as Size,
    REGULAR: 'regular' as Size,
    LARGE: 'large' as Size,
  },
  VARIATION: {
    PRIMARY: 'primary' as Variation,
    SECONDARY: 'secondary' as Variation,
    TERTIARY: 'tertiary' as Variation,
  },
}

export const BOX_ALIGNMENT = {
  RIGHT: 'right' as Alignment,
  LEFT: 'left' as Alignment,
}

export const JUSTIFY_OPTIONS = {
  BETWEEN: 'between' as FlexJustify,
  END: 'end' as FlexJustify,
  START: 'start' as FlexJustify,
  AROUND: 'around' as FlexJustify,
  CENTER: 'center' as FlexJustify,
}
