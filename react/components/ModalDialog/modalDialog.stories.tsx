import React from 'react'
import { withA11y } from '@storybook/addon-a11y'

import Button from '../Button'
import ModalDialog from '.'
import useModal from '../Modal/useModal'

export default {
  title: 'Components|ModalDialog',
  decorators: [withA11y],
}

export const Default = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open} type="button">
        Open
      </Button>
      <ModalDialog
        isOpen={isOpen}
        onClose={close}
        confirmation={{
          label: 'Confirm',
          onClick: close,
          isDangerous: true,
        }}
        cancelation={{
          label: 'Cancel',
          onClick: close,
        }}
      >
        Content
      </ModalDialog>
    </>
  )
}
