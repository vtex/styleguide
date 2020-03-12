import { ROOT_KEY } from './constants'
import useCheckboxTree from '.'

export type ChildKey<T> = { [key: string]: T[] }

export type comparatorCurry<T> = (item: T) => (candidate: T) => boolean

export type Checkboxes = ReturnType<typeof useCheckboxTree>

export type Tree<T> = { [x: string]: string | T[]; [ROOT_KEY]: string } | T

export type toggleCallback<T> = {
  checkedItems: unknown[]
  disabledItems: T[]
  item: T | Tree<T>
}

export type useCheckboxesInput<T> = {
  items: T[]
  onToggle?: (callback: toggleCallback<T>) => void
  nodesKey?: string
  checked?: T[]
  comparator?: comparatorCurry<Tree<T>>
  isDisabled?: (item: T | Tree<T>) => boolean
}
