import { useLayoutEffect } from 'react'

const useOutsideClick = (ref, handlerFn, listenTrigger) => {
  const handle = e =>
    ref && ref.current && !ref.current.contains(e.target) && handlerFn(e)

  useLayoutEffect(() => {
    listenTrigger && document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [listenTrigger])
}

export default useOutsideClick
