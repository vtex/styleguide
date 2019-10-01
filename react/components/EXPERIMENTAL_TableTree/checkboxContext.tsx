import { createContext } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'

const CheckboxesContext = createContext<Partial<checkboxesHookReturn>>({})

const { Provider: CheckboxesProvider } = CheckboxesContext
export default CheckboxesContext
export { CheckboxesProvider }
