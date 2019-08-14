import { createContext, useContext } from 'react'

interface MenuContext {
  isBoxVisible: boolean
  setBoxVisible: (isBoxVisible: boolean) => void
}

const MenuContext = createContext<MenuContext>(null)
const { Provider: MenuProvider } = MenuContext

const useMenuContext = () => {
  const context = useContext(MenuContext)
  return context
}

export default MenuContext
export { MenuProvider, useMenuContext }
