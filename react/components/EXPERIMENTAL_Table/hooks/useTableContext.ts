import { useContext } from 'react'

import Context from '../context'
import { OUT_OF_SCOPE_COMPOSITES_ERROR } from '../errors'

const useTableContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw OUT_OF_SCOPE_COMPOSITES_ERROR
  }
  return context
}

export default useTableContext
