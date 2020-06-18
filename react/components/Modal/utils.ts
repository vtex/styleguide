import { useLayoutEffect, useEffect } from 'react'

export const canUseDOM =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

export const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

export enum Key {
  TAB = 'Tab',
  SHIFT = 16,
  ESCAPE = 'Escape',
  ESC = 'Esc',
  SPACE = ' ',
  ENTER = 'Enter',
}
