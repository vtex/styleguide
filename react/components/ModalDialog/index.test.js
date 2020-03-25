import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import ModalDialog from '.'

describe('ModalDialog', () => {
  it('should have a default export', () => {
    expect(typeof ModalDialog).toBe('function')
  })

  describe('cancelation', () => {
    it('should render label', () => {
      const onCancel = jest.fn()
      const cancelLabel = 'cancel'
      const { getByText, container } = render(
        <ModalDialog
          isOpen
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
        { container: document.body }
      )
      expect(getByText(cancelLabel)).not.toBeNull()
      expect(container).toMatchSnapshot()
    })

    it('onClick should be called on cancelation button click', () => {
      const onCancel = jest.fn()
      const cancelLabel = 'cancel'
      const { getByText } = render(
        <ModalDialog
          isOpen
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
        { container: document.body }
      )

      fireEvent.click(getByText(cancelLabel))
      expect(onCancel).toHaveBeenCalled()
    })
  })

  describe('confirmation', () => {
    it('should render label', () => {
      const onConfirm = jest.fn()
      const confirmLabel = 'cancel'
      const { getByText, container } = render(
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
      expect(getByText(confirmLabel)).not.toBeNull()
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
      const onConfirm = jest.fn()
      const confirmLabel = 'cancel'
      const { container } = render(
        <ModalDialog
          isOpen
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: confirmLabel,
            onClick: onConfirm,
            isDangereous: true,
          }}
        >
          Foo
        </ModalDialog>,
        { container: document.body }
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('loading', () => {
    it('CSS', () => {
      const { container } = render(
        <ModalDialog
          isOpen
          loading
          cancelation={{
            label: 'cancel',
            onClick: () => null,
          }}
          confirmation={{
            label: 'confirm',
            onClick: () => null,
            isDangereous: true,
          }}
        >
          Foo
        </ModalDialog>,
        { container: document.body }
      )

      expect(container).toMatchSnapshot()
    })
  })
})
