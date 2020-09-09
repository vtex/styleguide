import React from 'react'
import PropTypes from 'prop-types'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { propTypes } from '.'

type ButtonProps = PropTypes.InferProps<typeof propTypes>

const variations = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'danger-tertiary',
  'inverted-tertiary',
]
const sizes = ['small', 'regular', 'large']

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variation: {
      control: {
        type: 'select',
        options: variations,
      },
    },
    size: {
      control: {
        type: 'inline-radio',
        options: sizes,
      },
    },
    onClick: {
      action: 'button-click',
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} type="button" />

export const Default = Template.bind({})
Default.args = {
  variation: 'primary',
  isLoading: false,
  disabled: false,
  block: false,
  size: 'regular',
  children: 'Button',
}

export const withLoadingState = Template.bind({})
withLoadingState.args = {
  ...Default.args,
  isLoading: true,
}

export const withDifferentVariations = () => (
  <>
    {variations.map(variation => (
      <>
        <Button type="button" variation={variation}>
          {variation}
        </Button>
        <br />
        <br />
      </>
    ))}
  </>
)

export const withOnMouseEvents = Template.bind({})
withOnMouseEvents.args = {
  ...Default.args,
  onMouseDown: action('button-on-mouse-down'),
  onMouseEnter: action('button-on-mouse-enter'),
  onMouseOver: action('button-on-mouse-over'),
  onMouseLeave: action('button-on-mouse-leave'),
  onMouseOut: action('button-on-mouse-out'),
  onMouseUp: action('button-on-mouse-up'),
}

export const withDifferentSizes = () => (
  <>
    {sizes.map(size => (
      <>
        <Button type="button" size={size}>
          {size}
        </Button>
        <br />
        <br />
      </>
    ))}
  </>
)
