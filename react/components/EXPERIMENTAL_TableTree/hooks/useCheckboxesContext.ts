import { useContext } from 'react'

import CheckboxesContext from '../checkboxContext'

const useCheckboxesContext = () => {
  const context = useContext(CheckboxesContext)
  return context
}

export default useCheckboxesContext
