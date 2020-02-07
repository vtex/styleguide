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
  TOTALIZER: 'order-2',
  GENERIC_ACTION_BAR: 'order-3',
  BULK: 'order-4',
  BULK_CHILD: {
    ACTIONS: 'order-0',
    ACTIONS_CHILD: {
      PRIMARY: 'order-0',
      SECONDARY: 'order-1',
    },
    POSITION_FIXER: 'order-1',
    RIGHT: 'order-2',
  },
  TABLE: 'order-5',
  PAGINATION: 'order-6',
}

export const NAMESPACE_PREFIX = 'vtex-table-v2'
export const NAMESPACES = {
  CONTAINER: `${NAMESPACE_PREFIX}__container`,
  TABLE: `${NAMESPACE_PREFIX}`,
  HEADER: `${NAMESPACE_PREFIX}__header`,
  BODY: `${NAMESPACE_PREFIX}__body`,
  ROW: `${NAMESPACE_PREFIX}__row`,
  CELL: `${NAMESPACE_PREFIX}__cell`,
  TOOLBAR: {
    CONTAINER: `${NAMESPACE_PREFIX}__toolbar`,
    INPUT_SEARCH: `${NAMESPACE_PREFIX}__toolbar__input-search`,
    BUTTON_GROUP: `${NAMESPACE_PREFIX}__toolbar__button-group`,
    BUTTON_COLUMNS: `${NAMESPACE_PREFIX}__toolbar__button-columns`,
    BUTTON_DENSITY: `${NAMESPACE_PREFIX}__toolbar__button-density`,
    BUTTON_DOWNLOAD: `${NAMESPACE_PREFIX}__toolbar__button-download`,
    BUTTON_UPLOAD: `${NAMESPACE_PREFIX}__toolbar__button-upload`,
    BUTTON_NEWLINE: `${NAMESPACE_PREFIX}__toolbar__button-newline`,
    BUTTON_EXTRA_ACTIONS: `${NAMESPACE_PREFIX}__toolbar__button-extra-actions`,
  },
  FILTER_BAR: `${NAMESPACE_PREFIX}__filter-bar`,
  TOTALIZER: `${NAMESPACE_PREFIX}__totalizer`,
  BULK_ACTIONS: `${NAMESPACE_PREFIX}__bulk-actions`,
  CHECKBOX: `${NAMESPACE_PREFIX}__checkbox`,
  PAGINATION: `${NAMESPACE_PREFIX}__pagination`,
  GENERIC_ACTION_BAR: `${NAMESPACE_PREFIX}__action-bar`,
}
