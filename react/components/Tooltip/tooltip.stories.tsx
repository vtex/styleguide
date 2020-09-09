import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Position } from './TooltipPopup'
import Tooltip, { Props } from '.'
import Button from '../Button'

const positions: Position[] = ['top', 'left', 'right', 'bottom']

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: positions,
      },
    },
    fallbackPosition: {
      control: {
        type: 'select',
        options: positions,
      },
    },
    trigger: {
      control: {
        type: 'inline-radio',
        options: ['click', 'hover', 'focus'],
      },
    },
    wordBreak: {
      control: {
        type: 'select',
        options: ['normal', 'break-all', 'keep-all', 'break-word'],
      },
    },
  },
} as Meta

const Template: Story<Props> = args => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Tooltip Label',
  trigger: 'hover',
  wordBreak: 'normal',
  position: 'bottom',
  delay: 0,
  fallbackPosition: 'right',
  children: <Button type="button">Button</Button>,
  size: 'small',
}
