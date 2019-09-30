import { createContext } from 'react'
import { checkboxesHookReturn } from './hooks/useTableTreeCheckboxes'

const CheckboxesContext = createContext<checkboxesHookReturn>(null)
const { Provider } = CheckboxesContext

export default CheckboxesContext
export { Provider as CheckboxesProvider }
