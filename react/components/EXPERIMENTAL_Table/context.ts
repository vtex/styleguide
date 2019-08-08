import { createContext } from 'react'

const Context = createContext<TableState>(null)
const { Provider } = Context

export default Context
export { Provider as TableProvider }
