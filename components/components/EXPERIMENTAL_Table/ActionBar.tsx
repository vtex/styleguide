import React, { FC } from 'react'
import classnames from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import { E2ETestable } from './types'

const ActionBar: FC<ActionBarProps> = ({
  id = NAMESPACES.GENERIC_ACTION_BAR,
  testId = '',
  order = ORDER_CLASSNAMES.GENERIC_ACTION_BAR,
  className,
  noMargin = false,
  children,
  ...props
}) => {
  const classes = classnames(className, { mb5: !noMargin }, order)
  return (
    <div id={id} data-testid={testId} className={classes} {...props}>
      {children}
    </div>
  )
}

type Div = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type Props = {
  id?: string
  order?: string
  className?: string
  noMargin?: boolean
}

export type ActionBarProps = Div & E2ETestable & Props

export default ActionBar
