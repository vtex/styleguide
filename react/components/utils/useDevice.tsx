import { useMemo } from 'react'
import { useMedia } from 'use-media'

export enum Device {
  phone = 'phone',
  tablet = 'tablet',
  desktop = 'desktop',
}

export default function useDevice() {
  const isScreenMedium = useMedia({ minWidth: '40rem' })
  const isScreenLarge = useMedia({ minWidth: '64.1rem' })

  const device = useMemo(
    () =>
      isScreenLarge
        ? Device.desktop
        : isScreenMedium
        ? Device.tablet
        : Device.phone,
    [isScreenLarge, isScreenMedium]
  )

  const isMobile = useMemo(() => device.toLowerCase() === 'phone', [device])

  return {
    isMobile,
    device,
  }
}
