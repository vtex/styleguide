import React from 'react'
import { withA11y } from '@storybook/addon-a11y'

import Button from '../Button'
import ModalDialog from '.'
import useDisclosure from '../../utilities/useDisclosure'

export default {
  title: 'Components|ModalDialog',
  decorators: [withA11y],
}

export const Default = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} type="button">
        Open
      </Button>
      <ModalDialog
        isOpen={isOpen}
        onClose={onClose}
        confirmation={{
          label: 'Confirm',
          onClick: onClose,
          isDangerous: true,
        }}
        cancelation={{
          label: 'Cancel',
          onClick: onClose,
        }}
      >
        Content
      </ModalDialog>
    </>
  )
}
