export type SelectOption<T> = {
  label: string
  value: T
}

export type SelectOptionGroup = {
  label: string
  options: SelectOption[]
}

export type GroupedOptions = {
  [group: string]: SelectOption[]
}

export type SelectedOption = {
  group: SelectOptionGroup['label']
  option: SelectOption
}
