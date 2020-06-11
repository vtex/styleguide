import React from 'react'

import IconUpload from '../icon/Upload'
import Button, { ButtonProps, IconSize } from './Button'

function ButtonUpload(props: ButtonProps) {
  return <Button icon={<IconUpload size={IconSize.Heavy} />} {...props} />
}

export default ButtonUpload
