import React, { useState } from 'react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Modal from '.'
import Button from '../Button'

export default {
  title: 'Components|Modal',
  decorators: [withA11y, withKnobs],
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="button">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="alala"
        responsiveFullScreen
        bottomBar={
          <div className="vtex-modal__confirmation flex justify-end mt8">
            <Button
              size="small"
              type="button"
              variation={'primary'}
              data-testid="modal-confirm-button"
              onClick={() => setIsOpen(false)}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <Button
          size="small"
          type="button"
          variation={'primary'}
          data-testid="modal-confirm-button"
          onClick={() => setIsOpen(false)}
        >
          Confirm
        </Button>
        <Button
          size="small"
          type="button"
          variation={'primary'}
          data-testid="modal-confirm-button"
          onClick={() => setIsOpen(false)}
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}
