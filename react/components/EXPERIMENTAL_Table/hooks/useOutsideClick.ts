import { useLayoutEffect } from 'react'

const useOutsideClick = (
  ref: React.RefObject<HTMLElement> | null,
  handlerFn: (e: Event) => any,
  listenTrigger: boolean
) => {
  const handle = (e: Event) =>
    ref &&
    ref.current &&
    e.target instanceof Node &&
    !ref.current.contains(e.target) &&
    handlerFn(e)

  useLayoutEffect(() => {
    listenTrigger && document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [listenTrigger])
}

export default useOutsideClick
