import React from 'react'
import classNames from 'classnames'

import Actions from './Actions'
import Tail from './Tail'

type NativeDiv = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

interface Props extends NativeDiv {
  active?: boolean
  height?: number | string
}

function BulkActions({
  active = false,
  children,
  className,
  style,
  height = 56,
  ...props
}: Props) {
  const positionFixer =
    React.Children.count(children) > 1 ? null : <div className="order-1" />
  return (
    <div
      {...props}
      className={classNames(
        'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
        {
          pv4: active,
        },
        className
      )}
      style={{
        height: active ? height : 0,
        overflow: active ? 'auto' : 'hidden',
        transition: 'padding ease-in-out 200ms, height ease-in-out 200ms',
        ...style,
      }}>
      {children}
      {positionFixer}
    </div>
  )
}

BulkActions.Actions = Actions
BulkActions.Tail = Tail

export default BulkActions
