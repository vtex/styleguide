import React, { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react'
import classnames from 'classnames'

import { ORDER_CLASSNAMES } from './constants'
import { E2ETestable, RFC } from './types'

const ActionBar: RFC<HTMLDivElement, ActionBarProps> = (
  {
    testId = '',
    order = ORDER_CLASSNAMES.GENERIC_ACTION_BAR,
    className,
    noMargin = false,
    children,
    ...props
  },
  ref
) => {
  const classes = classnames(className, { mb5: !noMargin }, order)
  return (
    <div ref={ref} data-testid={testId} className={classes} {...props}>
      {children}
    </div>
  )
}

interface Props {
  id?: string
  order?: string
  className?: string
  noMargin?: boolean
}

type Div = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ActionBarProps = Div & E2ETestable & Props

export default forwardRef(ActionBar)
