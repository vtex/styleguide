import React from 'react'
import classNames from 'classnames'

import ButtonColumns from './ButtonColumns'
import ButtonDensity from './ButtonDensity'
import ButtonDownload from './ButtonDownload'
import ButtonUpload from './ButtonUpload'
import ButtonExtraActions from './ButtonExtraActions'
import ButtonNewLine from './ButtonNewLine'

function ButtonGroup({ children, className, ...props }: NativeDiv) {
  return (
    <div
      {...props}
      className={classNames(
        'flex flex-row flex-wrap items-center order-2 w-60',
        className
      )}>
      {children}
    </div>
  )
}

ButtonGroup.Columns = ButtonColumns
ButtonGroup.Density = ButtonDensity
ButtonGroup.Download = ButtonDownload
ButtonGroup.Upload = ButtonUpload
ButtonGroup.ExtraActions = ButtonExtraActions
ButtonGroup.NewLine = ButtonNewLine

export default ButtonGroup
