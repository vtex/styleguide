import React from 'react'
import classNames from 'classnames'

import ButtonGroup from './ButtonGroup'
import InputAutocomplete from './InputAutocomplete'
import InputSearch from './InputSearch'

type NativeDiv = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

function Toolbar({ children, className, ...props }: NativeDiv) {
  const positionFixer =
    React.Children.count(children) > 1 ? null : <div className="order-1" />

  return (
    <div
      {...props}
      className={classNames(
        'flex flex-row flex-wrap w-100 justify-between mb5',
        className
      )}>
      {children}
      {positionFixer}
    </div>
  )
}

Toolbar.InputSearch = InputSearch
Toolbar.ButtonGroup = ButtonGroup
Toolbar.InputAutocomplete = InputAutocomplete

export default Toolbar
