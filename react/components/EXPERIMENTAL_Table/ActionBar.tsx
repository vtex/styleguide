import React, { FC } from 'react'
import classnames from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from './constants'

const ActionBar: FC<ActionBarProps> = ({
  id = NAMESPACES.GENERIC_ACTION_BAR,
  order = ORDER_CLASSNAMES.GENERIC_ACTION_BAR,
  className,
  noMargin = false,
  children,
  ...props
}) => {
  const classes = classnames(className, { mb5: !noMargin }, order)
  return (
    <div id={id} className={classes} {...props}>
      {children}
    </div>
  )
}

export interface ActionBarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  id?: string
  order?: string
  className?: string
  noMargin?: boolean
}

export default ActionBar
