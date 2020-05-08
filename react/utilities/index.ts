import { useState } from 'react'

export const useDisclosure = (open = false) => {
  const [isOpen, setIsOpen] = useState(open)

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen(!isOpen),
  }
}
