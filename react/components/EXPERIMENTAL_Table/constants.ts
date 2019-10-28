export const ORDER_CLASSNAMES = {
  TOOLBAR: 'order-0',
  TOOLBAR_CHILD: {
    INPUT: 'order-0',
    BUTTON_GROUP: 'order-1',
    BUTTON_GROUP_CHILD: {
      COLUMNS: 'order-0',
      DENSITY: 'order-1',
      DOWNLOAD: 'order-2',
      UPLOAD: 'order-3',
      EXTRA_ACTIONS: 'order-4',
      NEWLINE: 'order-5',
    },
  },
  FILTER_BAR: 'order-1',
  BULK_ACTIONS: 'order-2',
  TABLE: 'order-3',
  PAGINATION: 'order-4',
}

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
    BUTTON_COLUMNS: `${NAMESPACE_PREFIX}__toolbar__button-columns`,
    BUTTON_DENSITY: `${NAMESPACE_PREFIX}__toolbar__button-density`,
    BUTTON_DOWNLOAD: `${NAMESPACE_PREFIX}__toolbar__button-donwload`,
    BUTTON_UPLOAD: `${NAMESPACE_PREFIX}__toolbar__button-upload`,
    BUTTON_NEWLINE: `${NAMESPACE_PREFIX}__toolbar__button-newline`,
    BUTTON_EXTRA_ACTIONS: `${NAMESPACE_PREFIX}__toolbar__button-extra-actions`,
  },
  FILTER_BAR: `${NAMESPACE_PREFIX}__filter-bar`,
  BULK_ACTIONS: `${NAMESPACE_PREFIX}__bulk-actions`,
  CHECKBOX: `${NAMESPACE_PREFIX}__checkbox`,
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

export const COLUMNS_BOX = {
  MAX_HEIGHT: 192,
  WIDTH: 292,
  ITEM_HEIGHT: 36,
}

export const FIELDS_BOX_ITEM_HEIGHT = 36
export const TABLE_HEADER_HEIGHT = 36
export const EMPTY_STATE_SIZE_IN_ROWS = 5
export const NESTED_ROW_PREFIX_WIDTH = 36
export const BULK_ACTIONS_HEIGHT = 56
export const BULK_ACTIONS_TRANSITION =
  'height 0.2s ease-in-out, padding 0.2s ease-in-out'

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
