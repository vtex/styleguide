import React, { PropsWithChildren, Fragment } from 'react'

import { useLoadingContext } from '../context/loading'

function LoadedView({ children }: PropsWithChildren<{}>) {
  const { empty, loading } = useLoadingContext()
  return !empty && !loading ? <Fragment>{children}</Fragment> : null
}

export default LoadedView
