import React from 'react'
import { addParameters, addDecorator } from '@storybook/react'
import '@storybook/addon-console'
import 'vtex-tachyons'

addParameters({
  options: {
    showNav: true,
    showPanel: true,
  },
})

addDecorator(story => (<div style={{padding: '10px'}}>{story()}</div>)) // Add padding in the canvas