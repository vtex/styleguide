import React, { FC } from 'react'

import IconDownload from '../../icon/Download/index.js'
import { NAMESPACES } from '../constants'
import Button, { IconSize, ButtonProps } from './Button'
import { useButtonGroupContext } from './context'

const ButtonDownload: FC<ButtonProps> = props => {
  const { testId } = useButtonGroupContext()
  return (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_DOWNLOAD}
      testId={`${testId}__download`}
      icon={<IconDownload size={IconSize.Heavy} />}
      {...props}
    />
  )
}

export default ButtonDownload
