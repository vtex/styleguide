export const defaultComparatorCurry = (item: any) => (candidate: any) =>
  item.id === candidate.id

export const ROOT_KEY = 'id'
export const ROOT_VALUE = 'VTEX_CheckboxTreeRoot'
