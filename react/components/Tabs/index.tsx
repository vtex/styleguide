import React, {
  cloneElement,
  FC,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  Children,
} from 'react'
import PropTypes, { InferProps } from 'prop-types'
import debounce from 'lodash/debounce'

import Tab from './Tab'
import OptionsDots from '../icon/OptionsDots'

const propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  sticky: PropTypes.bool,
}

const Tabs: FC<InferProps<typeof propTypes>> = ({
  children,
  fullWidth,
  sticky,
}) => {
  const childrenArray = Children.toArray(children)

  const [showMoreTabsButton, setShowMoreTabsButton] = useState(false)
  const [lastShownTab, setLastShowTab] = useState(childrenArray.length)

  const tabsContainerRef = useRef(null)
  const tabsFullContainerRef = useRef(null)

  const selectedTab: Tab = childrenArray.find(
    child => (child as Tab).props.active
  )
  const content = selectedTab && selectedTab.props.children

  const handleResizeWindow = useCallback(
    debounce(
      () => {
        if (tabsContainerRef.current) {
          const { clientWidth: tabsContainerWidth } = tabsContainerRef.current
          let hideTabs = false

          // verify if is necessary hide tabs
          const childrens = tabsContainerRef.current.children
          let sumTabWidths = 0
          let childIndex = 0
          for (; childIndex < childrens.length; childIndex++) {
            const { clientWidth: childWidth } = childrens[childIndex]
            sumTabWidths += childWidth
            if (sumTabWidths > tabsContainerWidth) {
              hideTabs = true
              break
            }
          }

          // verify if the last tab can fit without more tabs button
          if (
            childIndex + 1 === childrens.length &&
            sumTabWidths <= tabsFullContainerRef.current?.clientWidth
          ) {
            hideTabs = false
          }

          setLastShowTab(childIndex)
          setShowMoreTabsButton(hideTabs)
        }
      },
      125,
      { trailing: true }
    ),
    [tabsContainerRef, tabsFullContainerRef]
  )

  useLayoutEffect(() => {
    const hasWindow = !(
      typeof window === 'undefined' || typeof window.Element === 'undefined'
    )
    if (hasWindow) {
      handleResizeWindow()
      window.addEventListener('resize', handleResizeWindow)
    }

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
          className="vtex-tabs__nav inline-flex flex-row bb b--muted-4 w-100 overflow-hidden"
          ref={tabsContainerRef}>
          {childrenArray.map((child: Tab, index) =>
            cloneElement(child, {
              fullWidth,
              key: child.props.key != null ? child.props.key : index,
              className: `${index >= lastShownTab ? 'o-0' : ''}`,
            })
          )}
        </div>
        {showMoreTabsButton && (
          <button className="vtex-tab__nav bt-0 bl-0 br-0 bb-0">
            <OptionsDots />
          </button>
        )}
      </div>
      <div ref={tabsFullContainerRef} className="w-100"></div>
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
