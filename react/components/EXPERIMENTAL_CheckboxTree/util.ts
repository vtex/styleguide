import { Item, comparatorCurry } from './'

/**
 * Checks nested items
 * @param checked
 * @param item
 * @param nodesKey
 * @param comparator
 */
export function getBulkChecked(
  checked: Array<Item>,
  item: Item,
  nodesKey: string = 'children',
  comparator: comparatorCurry
): Array<Item> {
  return [...checked, ...getFlat(item, [], nodesKey)].reduce(
    (acc: Array<Item>, item: Item) =>
      acc.some(comparator(item)) ? acc : [...acc, item],
    []
  ) as Array<Item>
}

/**
 * Unchecks nested items
 * @param checked
 * @param item
 * @param nodesKey
 * @param comparator
 */
export function getBulkUnchecked(
  checked: Array<Item>,
  item: Item,
  nodesKey: string = 'children',
  comparator: comparatorCurry
): Array<Item> {
  const flatCurry = (item: Item, nodesKey: string) =>
    getFlat(item, [], nodesKey)
  const flat = flatCurry(item, nodesKey)
  const bulkFilter = (row: Item) => !flat.some(comparator(row))
  return checked.filter(bulkFilter)
}

/**
 * Return new state with items toggled
 * @param state
 * @param item
 */
export function getToggledState(
  state: Array<Item>,
  item: Item,
  nodesKey: string = 'children',
  comparator: comparatorCurry
): Array<Item> {
  const stateIncludesItem = state.some(comparator(item))
  const filter = (row: Item) => !comparator(row)(item)

  if (stateIncludesItem) {
    return item[nodesKey]
      ? getBulkUnchecked(state, item, nodesKey, comparator)
      : state.filter(filter)
  }
  return item[nodesKey]
    ? getBulkChecked(state, item, nodesKey, comparator)
    : [...state, item]
}

/**
 * Represents a tree section on a single array.
 */
export function getFlat(
  tree: Item,
  arr: Array<Item> = [],
  nodesKey: string = 'children'
) {
  arr.push(tree)
  if (tree[nodesKey])
    (tree[nodesKey] as Array<Item>).forEach(child =>
      getFlat(child, arr, nodesKey)
    )
  return arr
}
