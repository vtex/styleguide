import React, { FC } from 'react'

import IconUpload from '../../icon/Upload/index.js'
import { NAMESPACES } from '../constants'
import Button, { IconSize, ButtonProps } from './Button'
import { useButtonGroupContext } from './context'

const ButtonUpload: FC<ButtonProps> = props => {
  const { testId } = useButtonGroupContext()
  return (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_UPLOAD}
      testId={`${testId}__upload`}
      icon={<IconUpload size={IconSize.Heavy} />}
      {...props}
    />
  )
}

export default ButtonUpload
