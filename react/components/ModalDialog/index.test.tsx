import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ModalDialog from '.'

describe('ModalDialog', () => {
  jest.spyOn(window, 'scroll').mockImplementation()
  it('should have a default export', () => {
    expect(typeof ModalDialog).toBe('function')
  })

  describe('cancelation', () => {
    it('should render label', () => {
      const containerModal = document.createElement('div')
      const onCancel = jest.fn()
      const cancelLabel = 'cancel'
      const { getByText, container } = render(
        <ModalDialog
          isOpen
          container={containerModal}
          cancelation={{
            label: cancelLabel,
            onClick: onCancel,
          }}
          confirmation={{
            label: 'confirm',
            onClick: () => null,
          }}
        >
          Foo
        </ModalDialog>,
        { container: containerModal }
      )
      expect(getByText(cancelLabel)).not.toBeNull()
      expect(container).toMatchSnapshot()
    })

    it('onClick should be called on cancelation button click', () => {
      const onCancel = jest.fn()

      const { getByText } = render(
        <ModalDialog
          isOpen
          cancelation={{
            label: 'cancel',
            onClick: onCancel,
          }}
          confirmation={{
            label: 'confirm',
            onClick: () => null,
          }}
        >
          Foo
        </ModalDialog>,
        { container: document.body }
      )

      fireEvent.click(getByText('cancel'))
      expect(onCancel).toHaveBeenCalled()
    })
  })

  describe('confirmation', () => {
    it('should render label', () => {
      const containerModal = document.createElement('div')
      const onConfirm = jest.fn()
      const confirmLabel = 'confirm'
      const { getAllByText, container } = render(
        <ModalDialog
          isOpen
          container={containerModal}
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: confirmLabel,
            onClick: onConfirm,
          }}
        >
          Foo
        </ModalDialog>,
        { container: containerModal }
      )
      expect(getAllByText(confirmLabel)).not.toBeNull()
      expect(container).toMatchSnapshot()
    })

    it('onClick should be called on confirmation button click', () => {
      const onConfirm = jest.fn()
      const confirmLabel = 'confirm'
      const { getByText } = render(
        <ModalDialog
          isOpen
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: confirmLabel,
            onClick: onConfirm,
          }}
        >
          Foo
        </ModalDialog>,
        { container: document.body }
      )

      fireEvent.click(getByText(confirmLabel))
      expect(onConfirm).toHaveBeenCalled()
    })

    it('isDangerous CSS', () => {
      const containerModal = document.createElement('div')
      const onConfirm = jest.fn()
      const confirmLabel = 'cancel'
      const { container } = render(
        <ModalDialog
          isOpen
          container={containerModal}
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: confirmLabel,
            onClick: onConfirm,
            isDangerous: true,
          }}
        >
          Foo
        </ModalDialog>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('loading', () => {
    it('CSS', () => {
      const containerModal = document.createElement('div')
      const { container } = render(
        <ModalDialog
          isOpen
          loading
          container={containerModal}
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: 'confirm',
            onClick: () => null,
            isDangerous: true,
          }}
        >
          Foo
        </ModalDialog>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })
  })
})
