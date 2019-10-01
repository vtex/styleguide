import { createContext, useContext } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'

export const CheckboxesContext = createContext<Partial<checkboxesHookReturn>>(
  {}
)

export const useCheckboxesContext = () => useContext(CheckboxesContext)
