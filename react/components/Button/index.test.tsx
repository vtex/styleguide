import React from 'react'
import { render } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  describe('CSS API', () => {
    it('primary', () => {
      const { asFragment } = render(<Button variation="primary">Hello</Button>)

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('secondary', () => {
      const { asFragment } = render(
        <Button variation="secondary">Hello</Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('tertiary', () => {
      const { asFragment } = render(<Button variation="tertiary">Hello</Button>)

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('danger', () => {
      const { asFragment } = render(<Button variation="danger">Hello</Button>)

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('danger-tertiary', () => {
      const { asFragment } = render(
        <Button variation="danger-tertiary">Hello</Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('inverted-tertiary', () => {
      const { asFragment } = render(
        <Button variation="inverted-tertiary">Hello</Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('primary disabled', () => {
      const { asFragment } = render(
        <Button variation="primary" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('secondary disabled', () => {
      const { asFragment } = render(
        <Button variation="secondary" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('tertiary disabled', () => {
      const { asFragment } = render(
        <Button variation="tertiary" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('danger disabled', () => {
      const { asFragment } = render(
        <Button variation="danger" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('danger-tertiary disabled', () => {
      const { asFragment } = render(
        <Button variation="danger-tertiary" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })

    it('inverted-tertiary disabled', () => {
      const { asFragment } = render(
        <Button variation="inverted-tertiary" disabled>
          Hello
        </Button>
      )

      const result = asFragment()

      expect(result).toMatchSnapshot()
    })
  })
})
