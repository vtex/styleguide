import { UnparsedItem, ItemTree } from './useTableTreeCheckboxes'

/**
 * Return new state with items toggled
 * @param state
 * @param item
 */
export function getToggledState(
  state: Array<ItemTree>,
  item: ItemTree
): Array<ItemTree> {
  const stateIncludesItem = state.some(row => row.id === item.id)

  const bulkFilter = (row: ItemTree) => !getFlat(item).some(equalsId(row))

  const filter = (row: ItemTree) => row.id !== item.id

  const bulkCheck = (state: Array<ItemTree>, item: ItemTree) => {
    const reduction = (acc: Array<ItemTree>, item: ItemTree) =>
      acc.some(equalsId(item)) ? acc : [...acc, item]

    return [...state, ...getFlat(item)].reduce(reduction, [])
  }

  if (stateIncludesItem) {
    return item.children ? state.filter(bulkFilter) : state.filter(filter)
  } else {
    return item.children ? bulkCheck(state, item) : [...state, item]
  }
}

/**
 * Represents a tree section on a single array.
 */
export function getFlat(tree: ItemTree, arr: Array<ItemTree> = []) {
  arr.push(tree)
  if (!tree.children) return arr
  else {
    tree.children.forEach(child => getFlat(child, arr))
    return arr
  }
}

/**
 * Get a tree from unparsed items array
 */
export function getItemTree(items: Array<UnparsedItem>) {
  function parseTree(item: UnparsedItem, index: number, path: string = '') {
    const { children, ...rest } = item

    if (!children) return { id: `${path}.${index}`, ...item }

    const parsedChilden = children.map((child, i) => {
      return parseTree(child, i, `${path}.${index}`)
    })

    return {
      id: `${path}.${index}`,
      children: parsedChilden,
      ...rest,
    }
  }
  return { id: 'root', children: items.map((item, i) => parseTree(item, i)) }
}

/** Compares ids  */
export const equalsId = (item: any) => (candidate: any) =>
  item.id === candidate.id
