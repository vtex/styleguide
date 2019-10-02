import { createContext, useContext } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'
import { TreeProps, TreeState } from './index'

export const CheckboxesContext = createContext<Partial<checkboxesHookReturn>>(
  {}
)

export const TreeContext = createContext<Partial<TreeProps & TreeState>>({})

export const useCheckboxesContext = () => useContext(CheckboxesContext)
export const useTreeContext = () => useContext(TreeContext)
