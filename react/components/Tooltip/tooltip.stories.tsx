import React from 'react'
import { withKnobs, text, select, number } from '@storybook/addon-knobs'

import { Position } from './TooltipPopup'
import Tooltip from '.'
import Button from '../Button'

export default {
  title: 'Components|Tooltip',
  component: Tooltip,
  decorators: [withKnobs],
}

const positions: Position[] = ['top', 'left', 'right', 'bottom']

export const defaultExample = () => (
  <Tooltip
    label={text('Label', 'Tooltip Label')}
    trigger={select('Trigger', ['click', 'hover', 'focus'], 'hover')}
    wordBreak={select(
      'Word Break',
      ['normal', 'break-all', 'keep-all', 'break-word'],
      'normal'
    )}
    position={select('Position', positions, 'left') ?? ''}
    delay={number('Delay(ms)', 0)}
    fallbackPosition={select('Fallback Position', positions, 'right') ?? ''}
  >
    <Button type="button">Button</Button>
  </Tooltip>
)
