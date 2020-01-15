import { useState, useEffect, useMemo } from 'react'
import throttle from 'lodash/throttle'

const defaultTransition: Transition[] = [
  {
    prop: 'all',
    duration: 200,
    func: 'ease-in-out',
    delay: 0,
    optimize: false,
  },
]

export default function useTableMotion(transitions = defaultTransition) {
  const reducedMotion = useReducedMotion()
  const motion = useMemo(() => {
    if (reducedMotion) return {}

    const draftTransitions = transitions.reduce((acc, transition, index) => {
      const { prop, duration, func, delay } = transition
      const draftTransition = `${prop} ${duration}ms ${func} ${delay}ms`
      return index === 0 ? draftTransition : `${acc}, ${draftTransition}`
    }, '')

    const draftWillChange = transitions.reduce(
      (acc, transition) => {
        const { prop, optimize } = transition
        const skip = !optimize || acc.props.includes(prop)
        const firstItem = acc.props.length === 0
        return skip
          ? acc
          : {
              willChange: firstItem ? prop : `${acc.willChange}, ${prop}`,
              props: [...acc.props, prop],
            }
      },
      {
        willChange: '',
        props: [],
      }
    )

    const noOptimizations = draftWillChange.props.length === 0
    const optimization = noOptimizations
      ? {}
      : { willChange: draftWillChange.willChange }

    return {
      ...optimization,
      transition: draftTransitions,
    }
  }, [reducedMotion, transitions])

  return motion
}

function useReducedMotion(init = false) {
  const [reduced, setReduced] = useState(init)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const handleChange = () => {
      setReduced(mql.matches)
    }
    mql.addEventListener('change', throttle(handleChange, 200))
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [])
  return reduced
}

type Transition = {
  prop: string
  duration: number
  func: string
  delay: number
  optimize?: boolean
}
