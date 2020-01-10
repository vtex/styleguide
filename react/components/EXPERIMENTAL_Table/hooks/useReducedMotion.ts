import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

export default function useReducedMotion(init = false) {
  const [reduced, setReduced] = useState(init)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const handleChange = () => {
      setReduced(mql.matches)
    }
    mql.addEventListener('change', throttle(handleChange))
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [])
  return reduced
}
