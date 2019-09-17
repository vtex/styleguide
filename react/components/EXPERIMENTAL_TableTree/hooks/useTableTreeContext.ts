import useTableContext from '../../EXPERIMENTAL_Table/hooks/useTableContext'

const useTableTreeContext = () => {
  const tableContext = useTableContext()
  console.log(tableContext)
  return tableContext
}

export default useTableContext
