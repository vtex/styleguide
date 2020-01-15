import { ROOT_KEY } from './constants'
import useCheckboxTree from '.'

export type ChildKey<T> = { [key: string]: Array<T> }

export type comparatorCurry<T> = (item: T) => (candidate: T) => boolean

export type Checkboxes<T> = ReturnType<typeof useCheckboxTree>

export type Tree<T> = { [x: string]: string | T[]; [ROOT_KEY]: string } | T

export type toggleCallback<T> = {
  checkedItems: Array<unknown>
  disabledItems: Array<T>
  item: T | Tree<T>
}

export type useCheckboxesInput<T> = {
  items: Array<T>
  onToggle?: (callback: toggleCallback<T>) => void
  nodesKey?: string
  checked?: Array<T>
  comparator?: comparatorCurry<Tree<T>>
  isDisabled?: (item: T | Tree<T>) => boolean
}
