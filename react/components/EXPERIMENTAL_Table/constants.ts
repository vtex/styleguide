export const ORDER_CLASSNAMES = {
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
  FILTER_BAR: `${NAMESPACE_PREFIX}__filter-bar`,
  TOTALIZER: `${NAMESPACE_PREFIX}__totalizer`,
  BULK_ACTIONS: `${NAMESPACE_PREFIX}__bulk-actions`,
  CHECKBOX: `${NAMESPACE_PREFIX}__checkbox`,
  PAGINATION: `${NAMESPACE_PREFIX}__pagination`,
  GENERIC_ACTION_BAR: `${NAMESPACE_PREFIX}__action-bar`,
}
