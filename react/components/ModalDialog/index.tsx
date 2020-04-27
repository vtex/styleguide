import React, { FC } from 'react'

import Modal, { Props as ModalProps } from '../Modal'
import Button from '../Button'

type DialogOption = {
  label: string
  onClick: () => unknown
}

type Props = Pick<
  ModalProps,
  'children' | 'isOpen' | 'onClose' | 'onCloseTransitionFinish'
> & {
  loading?: boolean
  confirmation: DialogOption & { isDangerous?: boolean }
  cancelation: DialogOption
}

const ModalDialog: FC<Props> = ({
  children,
  confirmation,
  cancelation,
  loading,
  ...props
}) => {
  const handleCancelation = () => {
    cancelation.onClick?.()
  }

  const handleConfirmation = () => {
    confirmation.onClick?.()
  }

  return (
    <Modal
      {...props}
      bottomBar={
        <div>
          <Button
            size="small"
            type="button"
            variation="tertiary"
            disabled={loading}
            onClick={handleCancelation}
          >
            {cancelation.label}
          </Button>
          <Button
            size="small"
            type="button"
            variation={confirmation.isDangerous ? 'danger' : 'primary'}
            isLoading={loading}
            onClick={handleConfirmation}
          >
            {confirmation.label}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}

export default ModalDialog
