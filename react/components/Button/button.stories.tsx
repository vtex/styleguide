import React from 'react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"
import { action } from '@storybook/addon-actions'

import Button from '.'

export default {
  title: 'Components|Button',
  component: Button,
  decorators: [withA11y, withKnobs]
}

const variations = ['primary', 'secondary', 'tertiary', 'danger', 'danger-tertiary', 'inverted-tertiary']

export const Default = () => (
  <Button
    variation={select('Variation', variations, 'primary')}
    isLoading={boolean('Is loading', false)}
    disabled={boolean('Disabled', false)}
    block={boolean('Block', false)}
    size={select('Size', ['small', 'regular', 'large'], 'regular')}
    onClick={action('button-click')}
    onFocus={action('button-focus')}
  >
    {text("Label", "With a text")}
  </Button>
)

export const withLoadingState = () => (
  <Button
    isLoading={true}
  >
    Loading
  </Button>
)

export const withDiffentVariations = () => (
  <>
    {variations.map(variation => (
      <>
        <Button variation={variation}>{variation}</Button>
        <br/>
        <br/>
      </>
    ))}
  </>
)

export const withOnMouseEvents = () => (
  <Button
    onMouseDown={action('button-on-mouse-down')}
    onMouseEnter={action('button-on-mouse-enter')}
    onMouseOver={action('button-on-mouse-over')}
    onMouseLeave={action('button-on-mouse-leave')}
    onMouseOut={action('button-on-mouse-out')}
    onMouseUp={action('button-on-mouse-up')}
  >
    Button
  </Button>
)
