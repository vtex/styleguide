import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Modal from '.'

describe('Modal', () => {
  jest.spyOn(window, 'scroll').mockImplementation()

  it('should have a default export', () => {
    expect(typeof Modal).toBe('object')
  })

  describe('onClose', () => {
    it('should be called on click close button', () => {
      const onClose = jest.fn()

      const { getByRole } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>
      )

      const closeButton = getByRole('button')

      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalled()
    })

    it('should be called on esc by default', () => {
      const onClose = jest.fn()

      const { getByRole } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>
      )

      fireEvent.keyDown(getByRole('dialog'), { key: 'Escape', keyCode: 27 })

      expect(onClose).toHaveBeenCalled()
    })

    it('should not be called when closeOnEsc prop is false', () => {
      const onClose = jest.fn()

      const { getByRole } = render(
        <Modal isOpen onClose={onClose} closeOnEsc={false}>
          Foo
        </Modal>
      )

      fireEvent.keyDown(getByRole('dialog'), { key: 'Escape', keyCode: 27 })

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should be called when click on the overlay by default', () => {
      const onClose = jest.fn()

      const { container } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>
      )
      fireEvent.click(
        document.querySelector('[data-testid="modal__overlay"]') ?? container
      )
      expect(onClose).toHaveBeenCalled()
    })

    it('should not be called when closeOnOverlayClick prop is false', () => {
      const onClose = jest.fn()

      const { container } = render(
        <Modal isOpen onClose={onClose} closeOnOverlayClick={false}>
          Foo
        </Modal>
      )

      fireEvent.click(
        document.querySelector('[data-testid="modal__overlay"]') ?? container
      )
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('title', () => {
    it('should render title prop', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()
      const title = 'modal title'

      const { getByText, asFragment } = render(
        <Modal
          isOpen
          onClose={onClose}
          title={title}
          container={containerModal}
        >
          Foo
        </Modal>,
        { container: containerModal }
      )
      expect(getByText(title)).not.toBeNull()
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('isOpen', () => {
    it('Should show modal when isOpen is true and hide when is false', () => {
      const onClose = jest.fn()
      const containerModal = document.createElement('div')

      const { rerender, container } = render(
        <Modal isOpen onClose={onClose} container={containerModal}>
          Foo
        </Modal>,
        { container: containerModal }
      )
      expect(container).toMatchSnapshot()

      rerender(
        <Modal isOpen={false} onClose={onClose} container={containerModal}>
          Foo
        </Modal>
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe('bottomBar', () => {
    it('should render bottomBar', () => {
      const onClose = jest.fn()
      const containerModal = document.createElement('div')

      const { getByText, container } = render(
        <Modal
          isOpen
          onClose={onClose}
          bottomBar={<div>Bar</div>}
          container={containerModal}
        >
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(getByText('Bar')).not.toBeNull()
      expect(container).toMatchSnapshot()
    })
  })

  describe('container', () => {
    it('should render modal inside it', () => {
      const onClose = jest.fn()
      const containerModal = document.createElement('div')
      const { container } = render(
        <Modal isOpen onClose={onClose} container={containerModal}>
          Foo
        </Modal>,
        { container: document.body.appendChild(containerModal) }
      )
      expect(
        container.querySelector('[data-testid="modal__modal"]')
      ).not.toBeNull()
      expect(container).toMatchSnapshot()
    })
  })

  describe('onCloseTransitionFinish', () => {
    it('should be called after 500ms', () => {
      jest.useFakeTimers()
      const onClose = jest.fn()
      const onCloseTransitionFinish = jest.fn()

      const { getByRole, rerender } = render(
        <Modal
          isOpen
          onClose={onClose}
          onCloseTransitionFinish={onCloseTransitionFinish}
        >
          Foo
        </Modal>
      )

      fireEvent.keyDown(getByRole('dialog'), { key: 'Escape', keyCode: 27 })
      rerender(
        <Modal
          isOpen={false}
          onClose={onClose}
          onCloseTransitionFinish={onCloseTransitionFinish}
        >
          Foo
        </Modal>
      )

      jest.runAllTimers()
      expect(onCloseTransitionFinish).toHaveBeenCalled()
    })
  })

  describe('CSS API', () => {
    it('default', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()

      const { container } = render(
        <Modal isOpen onClose={onClose} container={containerModal}>
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })

    it('responsiveFullScreen true', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()

      const { container } = render(
        <Modal
          isOpen
          onClose={onClose}
          responsiveFullScreen
          container={containerModal}
        >
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })

    it('showTopBar false', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()

      const { container } = render(
        <Modal
          isOpen
          onClose={onClose}
          showTopBar={false}
          container={containerModal}
        >
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })

    it('showBottomBarBorder false', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()

      const { container } = render(
        <Modal
          isOpen
          onClose={onClose}
          showBottomBarBorder={false}
          container={containerModal}
        >
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })

    it('centered', () => {
      const containerModal = document.createElement('div')
      const onClose = jest.fn()

      const { container } = render(
        <Modal isOpen onClose={onClose} centered container={containerModal}>
          Foo
        </Modal>,
        { container: containerModal }
      )

      expect(container).toMatchSnapshot()
    })
  })
})
