import React from 'react'
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"

import Tooltip from '.'
import Button from '../Button'

export default {
  title: 'Components|Tooltip',
  component: Tooltip,
  decorators: [withKnobs]
}

export const Default = () => (
  <Tooltip
    label={text('Label', 'Tooltip Label')}
    trigger={select('Trigger', ['click', 'hover', 'focus'], 'hover')}
    wordBreak={select('Word Break', ['normal', 'break-all', 'keep-all', 'break-word'], 'normal')}
    position={select('Position', ['top', 'left', 'right', 'bottom'], 'left')}
  >
    <Button>Button</Button>
  </Tooltip>
)

export const AlwaysVisible = () => (
  <Tooltip label="Tooltip Label" trigger="focus">
    <Button autoFocus={true}>Button with focus</Button>
  </Tooltip>
)
