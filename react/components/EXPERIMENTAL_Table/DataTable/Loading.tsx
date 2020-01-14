import React, { FC } from 'react'

import Spinner from '../../Spinner/index.js'
import useTableMotion from '../hooks/useTableMotion'

const Loading: FC<Props> = ({ height, motion, children }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height, ...motion }}>
      {children || <Spinner />}
    </div>
  )
}

type Props = { height: number; motion: ReturnType<typeof useTableMotion> }

export default Loading
