import React from 'react'
import { withKnobs, text, boolean, select, number } from "@storybook/addon-knobs"

import Tooltip from '.'
import Button from '../Button'

export default {
  title: 'Components|Tooltip',
  component: Tooltip,
  decorators: [withKnobs]
}

const positions = ['top', 'left', 'right', 'bottom']

export const Default = () => (
  <Tooltip
    label={text('Label', 'Tooltip Label')}
    trigger={select('Trigger', ['click', 'hover', 'focus'], 'hover')}
    wordBreak={select('Word Break', ['normal', 'break-all', 'keep-all', 'break-word'], 'normal')}
    position={select('Position', positions, 'left')}
    delay={number('Delay(ms)', 0)}
    fallbackPosition={select('Fallback Position', positions, 'right')}
  >
    <Button>Button</Button>
  </Tooltip>
)

export const AlwaysVisible = () => (
  <Tooltip label="Tooltip Label" trigger="focus">
    <Button autoFocus={true}>Button with focus</Button>
  </Tooltip>
)
