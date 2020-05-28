import { comparatorCurry, Tree } from './types'

/**
 * Checks nested items
 * @param checked
 * @param item
 * @param nodesKey
 * @param comparator
 */
export function getBulkChecked<T>(
  checked: Array<Tree<T>>,
  item: T,
  nodesKey = 'children',
  comparator: comparatorCurry<Tree<T>>,
  isDisabled: (item: T | Tree<T>) => boolean
): Array<Tree<T>> {
  const notDisabled = (item: T | Tree<T>) => !isDisabled(item)
  return [...checked, ...getFlat(item, [], nodesKey)]
    .filter(notDisabled)
    .reduce(
      (acc: Array<Tree<T>>, item: T) =>
        acc.some(comparator(item)) ? acc : [...acc, item],
      []
    ) as Array<Tree<T>>
}

/**
 * Unchecks nested items
 * @param checked
 * @param item
 * @param nodesKey
 * @param comparator
 */
export function getBulkUnchecked<T>(
  checked: Array<Tree<T>>,
  item: T,
  nodesKey = 'children',
  comparator: comparatorCurry<Tree<T>>
): Array<Tree<T>> {
  const flatCurry = (item: T, nodesKey: string) => getFlat(item, [], nodesKey)
  const flat = flatCurry(item, nodesKey)
  const bulkFilter = (row: T) => !flat.some(comparator(row))
  return checked.filter(bulkFilter)
}

/**
 * Return new state with items toggled
 * @param state
 * @param item
 */
export function getToggledState<T>(
  state: Array<Tree<T>>,
  item: T,
  nodesKey = 'children',
  comparator: comparatorCurry<Tree<T>>,
  isDisabled: (item: T | Tree<T>) => boolean
): Array<Tree<T>> {
  const stateIncludesItem = state.some(comparator(item))
  const filter = (row: T) => !comparator(row)(item)

  if (stateIncludesItem) {
    return item[nodesKey]
      ? getBulkUnchecked<T>(state, item, nodesKey, comparator)
      : state.filter(filter)
  }
  return item[nodesKey]
    ? getBulkChecked<T>(state, item, nodesKey, comparator, isDisabled)
    : ([...state, item] as Array<Tree<T>>)
}

/**
 * Represents a tree section on a single array.
 */
export function getFlat<T>(
  tree: Tree<T>,
  arr: Array<Tree<T>> = [],
  nodesKey = 'children'
): Array<T> {
  arr.push(tree)
  if (tree[nodesKey])
    (tree[nodesKey] as Array<Tree<T>>).forEach(child =>
      getFlat(child, arr, nodesKey)
    )
  return arr as T[]
}
