import { createContext } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'

const CheckboxesContext = createContext<checkboxesHookReturn>(null)

const { Provider: CheckboxesProvider } = CheckboxesContext
export default CheckboxesContext
export { CheckboxesProvider }
