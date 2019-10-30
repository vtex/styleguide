import React, { FC } from 'react'
import Spinner from '../../Spinner/index.js'

const Loading: FC<Props> = ({ height, children }) => {
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      {children || <Spinner />}
    </div>
  )
}

type Props = { height: number }

export default Loading
