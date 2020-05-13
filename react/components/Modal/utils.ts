import { useLayoutEffect, useEffect } from 'react'

export const canUseDOM =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

export const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect
