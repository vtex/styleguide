import React, { FC } from 'react'

import ButtonWithIcon from '../../ButtonWithIcon'
import Close from '../../icon/Close'

const DismissButton: FC<DismissButtonProps> = ({ onClick }) => {
  return <ButtonWithIcon icon={<Close />} onClick={onClick} />
}

export type DismissButtonProps = {
  onClick: () => void
}

export default DismissButton
