import { useState, useCallback } from 'react'

const useDisclosure = (open = false) => {
  const [isOpen, setIsOpen] = useState(open)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), [])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}

export default useDisclosure
