import { Item } from './useTableTreeCheckboxes'

/**
 * Return new state with items toggled
 * @param state
 * @param item
 */
export function getToggledState(
  state: Array<Item>,
  item: Item,
  childsKey: string = 'children',
  unicityKey: string = 'id'
): Array<Item> {
  const equalsKey = eqProp(unicityKey)

  const stateIncludesItem = state.some(equalsKey(item))

  const bulkFilter = (row: Item) =>
    !getFlat(item, [], childsKey).some(equalsKey(row))

  const filter = (row: Item) => row[unicityKey] !== item[unicityKey]

  const bulkCheck = (state: Array<Item>, item: Item): Array<Item> => {
    return [...state, ...getFlat(item, [], childsKey)].reduce(
      (acc: Array<Item>, item: Item) =>
        acc.some(equalsKey(item)) ? acc : [...acc, item],
      []
    ) as Array<Item>
  }

  if (stateIncludesItem) {
    return item[childsKey] ? state.filter(bulkFilter) : state.filter(filter)
  } else {
    return item[childsKey] ? bulkCheck(state, item) : [...state, item]
  }
}

/**
 * Represents a tree section on a single array.
 */
export function getFlat(
  tree: Item,
  arr: Array<Item> = [],
  childsKey: string = 'children'
) {
  arr.push(tree)
  if (tree[childsKey])
    (tree[childsKey] as Array<Item>).forEach(child =>
      getFlat(child, arr, childsKey)
    )
  return arr
}

/** Compares one prop of item and candidate  */
export const eqProp = (prop: string) => (item: any) => (candidate: any) =>
  item[prop] === candidate[prop]
