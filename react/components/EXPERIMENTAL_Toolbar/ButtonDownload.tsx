import React from 'react'

import IconDownload from '../icon/Download'
import Button, { ButtonProps, IconSize } from './Button'

function ButtonDownload(props: ButtonProps) {
  return <Button icon={<IconDownload size={IconSize.Heavy} />} {...props} />
}

export default ButtonDownload
