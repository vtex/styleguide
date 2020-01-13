type itemWithID = {
  id: string
}

export const defaultComparatorCurry = (item: itemWithID) => (
  candidate: itemWithID
) => item.id === candidate.id

export const ROOT_KEY = 'id'
export const ROOT_VALUE = 'VTEX_CheckboxTreeRoot'
