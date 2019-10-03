import React, { createContext, useContext, FC } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'
import { TreeProps, TreeState } from './index'
import useTreeState from './hooks/useTreeState'

export const CheckboxesContext = createContext<Partial<checkboxesHookReturn>>(
  {}
)

export const TreeContext = createContext<Partial<TreeProps & TreeState>>({})

export const useCheckboxesContext = () => useContext(CheckboxesContext)
export const useTreeContext = () => useContext(TreeContext)

export const TreeProvider: FC<TreeProps> = ({ children, ...props }) => {
  const state = useTreeState()
  return (
    <TreeContext.Provider value={{ ...state, ...props }}>
      {children}
    </TreeContext.Provider>
  )
}
