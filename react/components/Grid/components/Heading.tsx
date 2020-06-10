import React, { ReactNode } from 'react'
import classNames from 'classnames'

import { useDataContext } from '../context/data'
import { useMeasuresContext } from '../context/measures'
import Loop from './Loop'
import { useHeadContext } from '../context/head'

interface RenderProps {
  data: string | Function | Element
  index: number
  ctx: {
    computedStyle: Record<string, string | number>
    computedClassName: string
  }
}

interface Props {
  children: (props: RenderProps) => ReactNode
}

function Heading({ children }: Props) {
  const { columns } = useDataContext()
  const { headerHeight } = useMeasuresContext()
  const { stickyHeader } = useHeadContext()

  return (
    <Loop list={columns}>
      {(column, index) => {
        const { title, width } = column

        const computedClassName = classNames(
          'v-mid ph3 pv0 tl bb b--muted-4 normal bg-base bt',
          {
            z1: !stickyHeader,
            'top-0 z3': stickyHeader,
          }
        )

        const computedStyle = {
          width,
          height: headerHeight,
          position: stickyHeader ? 'sticky' : 'static',
        }

        return children({
          data: title,
          index,
          ctx: { computedStyle, computedClassName },
        })
      }}
    </Loop>
  )
}

export default Heading
