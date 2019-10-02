import { UnparsedItem, ItemTree, ChildKey } from './useTableTreeCheckboxes'

/**
 * Return new state with items toggled
 * @param state
 * @param item
 */
export function getToggledState(
  state: Array<ItemTree>,
  item: ItemTree,
  childsKey: string = 'children'
): Array<ItemTree> {
  const stateIncludesItem = state.some(row => row.id === item.id)

  const bulkFilter = (row: ItemTree) =>
    !getFlat(item, [], childsKey).some(equalsId(row))

  const filter = (row: ItemTree) => row.id !== item.id

  const bulkCheck = (state: Array<ItemTree>, item: ItemTree) => {
    const reduction = (acc: Array<ItemTree>, item: ItemTree) =>
      acc.some(equalsId(item)) ? acc : [...acc, item]

    return [...state, ...getFlat(item, [], childsKey)].reduce(reduction, [])
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
  tree: ItemTree,
  arr: Array<ItemTree> = [],
  childsKey: string = 'children'
) {
  arr.push(tree)
  if (tree[childsKey])
    (tree[childsKey] as Array<ItemTree>).forEach(child =>
      getFlat(child, arr, childsKey)
    )
  return arr
}

/**
 * Get a tree from unparsed items array
 */
export function getItemTree(
  items: Array<UnparsedItem>,
  childsKey: string = 'children'
) {
  function parseTree(item: UnparsedItem, index: number, path: string = '') {
    if (!item[childsKey]) return { id: `${path}.${index}`, ...item }

    const parsedChilden = (item[childsKey] as Array<ItemTree>).map(
      (child, i) => {
        return parseTree(child, i, `${path}.${index}`)
      }
    )

    return {
      ...item,
      id: `${path}.${index}`,
      [childsKey]: parsedChilden,
    }
  }
  return { id: 'root', [childsKey]: items.map((item, i) => parseTree(item, i)) }
}

/** Compares ids  */
export const equalsId = (item: any) => (candidate: any) =>
  item.id === candidate.id
