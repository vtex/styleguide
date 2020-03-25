import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Modal from '.'

describe('Modal', () => {
  it('should have a default export', () => {
    expect(typeof Modal).toBe('function')
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

      const { container } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>
      )

      fireEvent.keyDown(container, { key: 'Escape', keyCode: 27 })

      expect(onClose).toHaveBeenCalled()
    })

    it('should not be called when closeOnEsc prop is false', () => {
      const onClose = jest.fn()

      const { container } = render(
        <Modal isOpen onClose={onClose} closeOnEsc={false}>
          Foo
        </Modal>
      )

      fireEvent.keyDown(container, { key: 'Escape', keyCode: 27 })

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should be called when click on the overlay by default', () => {
      const onClose = jest.fn()

      render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>,
        { container: document.body }
      )
      fireEvent.click(document.querySelector('.vtex-modal__overlay'))
      expect(onClose).toHaveBeenCalled()
    })

    it('should not be called when closeOnOverlayClick prop is false', () => {
      const onClose = jest.fn()

      render(
        <Modal isOpen onClose={onClose} closeOnOverlayClick={false}>
          Foo
        </Modal>,
        { container: document.body }
      )
      fireEvent.click(document.querySelector('.vtex-modal__overlay'))
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('title', () => {
    it('should render title prop', () => {
      const onClose = jest.fn()
      const title = 'modal title'

      const { getByText, asFragment } = render(
        <Modal isOpen onClose={onClose} title={title}>
          Foo
        </Modal>
      )
      expect(getByText(title)).not.toBeNull()
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('isOpen', () => {
    it('Should show modal when isOpen is true and hide when is false', () => {
      const onClose = jest.fn()

      const { rerender, container } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>,
        { container: document.body }
      )
      expect(container).toMatchSnapshot()

      rerender(
        <Modal isOpen={false} onClose={onClose}>
          Foo
        </Modal>,
        { container: document.body }
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe('bottomBar', () => {
    it('should render bottomBar', () => {
      const onClose = jest.fn()

      const { getByText, container } = render(
        <Modal isOpen onClose={onClose} bottomBar={<div>Bar</div>}>
          Foo
        </Modal>
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
      expect(container.querySelector('.vtex-modal__modal')).not.toBeNull()
      expect(container).toMatchSnapshot()
    })
  })
  // help it's not working
  // describe('onCloseTransitionFinish', () => {
  //   it('should be called after 500ms', () => {
  //     const onClose = jest.fn()
  //     const onCloseTransitionFinish = jest.fn()

  //     const { container } = render(
  //       <Modal
  //         isOpen
  //         onClose={onClose}
  //         onCloseTransitionFinish={onCloseTransitionFinish}
  //       >
  //         Foo
  //       </Modal>
  //     )

  //     fireEvent.keyDown(container, { key: 'Escape', keyCode: 27 })
  //     jest.runAllTimers()

  //     expect(onCloseTransitionFinish).toHaveBeenCalled()
  //   })
  // })

  describe('CSS API', () => {
    it('default', () => {
      const onClose = jest.fn()

      const { asFragment } = render(
        <Modal isOpen onClose={onClose}>
          Foo
        </Modal>,
        { container: document.body }
      )
      const result = asFragment()
      expect(result).toMatchSnapshot()
    })

    it('responsiveFullScreen true', () => {
      const onClose = jest.fn()

      const { asFragment } = render(
        <Modal isOpen onClose={onClose} responsiveFullScreen>
          Foo
        </Modal>,
        { container: document.body }
      )
      const result = asFragment()
      expect(result).toMatchSnapshot()
    })

    it('showTopBar false', () => {
      const onClose = jest.fn()

      const { asFragment } = render(
        <Modal isOpen onClose={onClose} showTopBar={false}>
          Foo
        </Modal>,
        { container: document.body }
      )
      const result = asFragment()
      expect(result).toMatchSnapshot()
    })

    it('showBottomBarBorder false', () => {
      const onClose = jest.fn()

      const { asFragment } = render(
        <Modal isOpen onClose={onClose} showBottomBarBorder={false}>
          Foo
        </Modal>,
        { container: document.body }
      )
      const result = asFragment()
      expect(result).toMatchSnapshot()
    })

    it('centered', () => {
      const onClose = jest.fn()

      const { asFragment } = render(
        <Modal isOpen onClose={onClose} centered>
          Foo
        </Modal>,
        { container: document.body }
      )
      const result = asFragment()
      expect(result).toMatchSnapshot()
    })
  })
})
