import React, { cloneElement } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Tab from './Tab'
import OptionsDots from '../icon/OptionsDots'

const propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  sticky: PropTypes.bool,
}

const Tabs: React.FC<InferProps<typeof propTypes>> = ({
  children,
  fullWidth,
  sticky,
}) => {
  const tabsContainerRef = React.useRef(null)
  const [showMoreTabsButton, setShowMoreTabsButton] = React.useState(false)

  const childrenArray = [].concat(children)

  const selectedTab: Tab = childrenArray.find(
    child => (child as Tab).props.active
  )
  const content = selectedTab && selectedTab.props.children

  const handleResizeWindow = React.useCallback(() => {
    if (tabsContainerRef.current) {
      const tabsContainerWidth = tabsContainerRef.current.clientWidth
      let hideTabs = false

      const childrens = tabsContainerRef.current.children
      let sumTabWidths = 0
      for (let childIndex = 0; childIndex < childrens.length; childIndex++) {
        const child = childrens[childIndex]
        sumTabWidths += child.clientWidth
        if (!hideTabs && sumTabWidths > tabsContainerWidth) {
          hideTabs = true
          break
        }
      }

      setShowMoreTabsButton(hideTabs)
    }
  }, [tabsContainerRef])

  React.useEffect(() => {
    const hasWindow = !(
      typeof window === 'undefined' || typeof window.Element === 'undefined'
    )
    hasWindow && handleResizeWindow() // this line will have effect if tabs has minimum width, need it
    hasWindow && window.addEventListener('resize', handleResizeWindow)

    return () => {
      hasWindow && window.removeEventListener('resize', handleResizeWindow)
    }
  }, [handleResizeWindow])

  return (
    <div
      data-testid={testId}
      className={`vtex-tabs w-100 h-100 flex flex-column ${
        sticky ? 'overflow-y-hidden' : ''
      }`}>
      <div className="flex">
        <div
          className="vtex-tabs__nav inline-flex flex-row bb b--muted-4 w-100"
          ref={tabsContainerRef}>
          {childrenArray.map((child, index) =>
            cloneElement(child, {
              fullWidth,
              key: child.props.key != null ? child.props.key : index,
            })
          )}
        </div>
        {showMoreTabsButton && (
          <button className="vtex-tab__button bt-0 bl-0 br-0 bb-0">
            <OptionsDots />
          </button>
        )}
      </div>
      <div
        className={`vtex-tabs__content w-100 ${
          sticky ? 'overflow-y-auto' : ''
        }`}
      >
        {content}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  fullWidth: false,
  sticky: false,
}

Tabs.propTypes = propTypes

export default Tabs
