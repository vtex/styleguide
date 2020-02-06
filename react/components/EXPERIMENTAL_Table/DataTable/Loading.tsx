import React, { FC } from 'react'

import Spinner from '../../Spinner/index.js'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable } from '../types'

const Loading: FC<Props> = ({ height, motion, children, testId }) => {
  return (
    <div
      data-testid={testId}
      className="flex justify-center items-center"
      style={{ height, ...motion }}>
      {children || <Spinner />}
    </div>
  )
}

type Props = E2ETestable & {
  height: number
  motion: ReturnType<typeof useTableMotion>
}

export default Loading
