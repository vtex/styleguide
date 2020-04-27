import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  return { isOpen, close, open }
}

export default useModal
