import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Alert from './index'

describe('Alert', () => {
  describe('action button', () => {
    it('should be displayed if props are passed', () => {
      const label = 'Action'
      const onClick = jest.fn()

      const { getByText } = render(
        <Alert type="error" action={{ label, onClick }}>
          Foo
        </Alert>
      )

      const actionButton = getByText(label)

      expect(actionButton).toBeDefined()

      fireEvent.click(actionButton)

      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('onClose', () => {
    it('should be called on click close button', () => {
      const onClose = jest.fn()

      const { getByTitle } = render(
        <Alert type="error" onClose={onClose}>
          Foo
        </Alert>
      )

      const closeButton = getByTitle('Close')

      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalled()
    })

    it('should be called after autoClose time passes', () => {
      jest.useFakeTimers()
      const onClose = jest.fn()

      render(
        <Alert type="error" autoClose={1} onClose={onClose}>
          Foo
        </Alert>
      )

      jest.runAllTimers()

      expect(onClose).toHaveBeenCalled()
    })

    it('should not be called if no click happens or autoClose time is not defined', () => {
      jest.useFakeTimers()
      const onClose = jest.fn()

      render(
        <Alert type="error" onClose={onClose}>
          Foo
        </Alert>
      )

      jest.runAllTimers()

      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
