export const ORDER_CLASSNAMES = {
  TOOLBAR: 'order-0',
  TOOLBAR_CHILD: {
    INPUT: 'order-0',
    POSITION_FIXER: 'order-1',
    BUTTON_GROUP: 'order-2',
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
