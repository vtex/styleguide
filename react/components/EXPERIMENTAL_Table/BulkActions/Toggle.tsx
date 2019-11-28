import React, {
  createContext,
  FC,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useContext,
} from 'react'

import Button from '../../Button'

const ActiveContext = createContext<{ active: boolean; toggle: Function }>(null)

const Toggle: FC<ToggleProps> & ToggleComposites = ({ children, onToggle }) => {
  const [active, setActive] = useState(false)
  const toggle = useCallback(() => setActive(old => !old), [])

  useEffectAfterMount(() => {
    onToggle && onToggle(active)
  }, [active])

  const value = useMemo(() => ({ active, toggle }), [active])

  return (
    <ActiveContext.Provider value={value}>
      <span className="mr2">{children}</span>
    </ActiveContext.Provider>
  )
}

function useEffectAfterMount(cb, deps) {
  const mounted = useRef(true)
  useEffect(() => {
    if (!mounted.current) return cb()
    mounted.current = false
  }, deps)
}

function Active({ children }) {
  const { active } = useContext(ActiveContext)
  return active ? children : null
}

function Inactive({ children, onClick }) {
  const { active, toggle } = useContext(ActiveContext)

  const handleClick = () => {
    onClick()
    toggle()
  }

  return active ? null : (
    <Button onClick={handleClick}>
      <span className="ttu">{children}</span>
    </Button>
  )
}

export type ToggleProps = {
  onToggle?: (boolean) => void
}

export type ToggleComposites = {
  Active: FC
  Inactive: FC
}

Toggle.Active = Active
Toggle.Inactive = Inactive

export default Toggle
