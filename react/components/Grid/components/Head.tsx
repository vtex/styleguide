import React, { Fragment, ReactNode } from 'react'

import { useMeasuresContext } from '../context/measures'
import Heading from './Heading'

interface RenderProps {
  ctx: {
    computedStyle: Record<string, number | string>
    computedClassName: string
  }
}

interface Props {
  children: (props: RenderProps) => ReactNode
}

function Head({ children }: Props) {
  const { headerHeight } = useMeasuresContext()

  const computedClassName = 'w-100 ph4 truncate overflow-x-hidden c-muted-2 f6'

  const computedStyle = {
    height: headerHeight,
  }

  return (
    <Fragment>
      {children({
        ctx: { computedStyle, computedClassName },
      })}
    </Fragment>
  )
}

Head.Row = Heading

export default Head
