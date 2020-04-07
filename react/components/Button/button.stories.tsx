import React from 'react'

import Button from '.'

export default {
  title: 'Button',
  component: Button,
}

export const withText = () => (
  <Button type="primary">
    With a text
  </Button>
)
