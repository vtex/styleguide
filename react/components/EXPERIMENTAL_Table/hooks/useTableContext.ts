import { useContext } from 'react'

import Context from '../context'

const useTableContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Ooops! Table composites cannot be used outside of it')
  }
  return context
}

export default useTableContext
