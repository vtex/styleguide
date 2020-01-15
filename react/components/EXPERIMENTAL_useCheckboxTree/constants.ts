type ItemWithID = {
  id: string
}

export const defaultComparatorCurry = (item: ItemWithID) => (
  candidate: ItemWithID
) => item.id === candidate.id

export const ROOT_KEY = 'id'
export const ROOT_VALUE = 'VTEX_CheckboxTreeRoot'
