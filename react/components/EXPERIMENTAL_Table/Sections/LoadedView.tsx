import React, { FC, PropsWithChildren } from 'react'

import { useLoadingContext } from '../context/loading'

function LoadedView({ children }: PropsWithChildren<{}>) {
  const { empty, loading } = useLoadingContext()
  return !empty && !loading ? <>{children}</> : null
}

export type LoadedViewSection = FC

export default LoadedView
