import React from 'react'
import { render } from '@testing-library/react'
import { toHaveClass } from '@testing-library/jest-dom/matchers'

import Tabs from '../index'
import Tab from '../Tab'

describe('Tabs', () => {
  expect.extend({ toHaveClass })
  const tabsId = 'tabs'

  describe('CSS API', () => {
    it('props: default', () => {
      const { getByTestId, getByText } = render(
        <Tabs testId={tabsId}>
          <Tab label="label 1" active>
            Tab 1
          </Tab>
          <Tab label="label 2" />
        </Tabs>
      )

      const tabs = getByTestId(tabsId)
      expect(tabs).not.toHaveClass('overflow-y-hidden')

      const tabsContent = getByText('Tab 1')
      expect(tabsContent).toBeTruthy()
      expect(tabsContent).not.toHaveClass('overflow-y-auto')

      expect(getByText('label 1')).not.toHaveClass('w-100')
    })

    it('prop: sticky', () => {
      const { getByTestId, getByText } = render(
        <Tabs testId={tabsId} sticky>
          <Tab label="label 1" active>
            Tab 1
          </Tab>
          <Tab label="label 2" />
        </Tabs>
      )

      expect(getByTestId(tabsId)).toHaveClass('overflow-y-hidden')
      expect(getByText('Tab 1')).toHaveClass('overflow-y-auto')
    })

    it('prop: fullWidth', () => {
      const { getByText } = render(
        <Tabs testId={tabsId} fullWidth>
          <Tab label="label 1" active>
            Tab 1
          </Tab>
          <Tab label="label 2">Tab 2</Tab>
          <Tab label="label 3">Tab 3</Tab>
        </Tabs>
      )

      expect(getByText('label 1')).toHaveClass('w-100')
      expect(getByText('label 2')).toHaveClass('w-100')
      expect(getByText('label 3')).toHaveClass('w-100')
    })
  })

  describe('Behavior', () => {
    it('active tab content', () => {
      const { getByText } = render(
        <Tabs testId={tabsId}>
          <Tab label="label 1" active>
            Tab 1
          </Tab>
          <Tab label="label 2">Tab 2</Tab>
        </Tabs>
      )

      expect(getByText('Tab 1')).toBeTruthy()
    })
  })
})
