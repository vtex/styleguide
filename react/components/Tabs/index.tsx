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
import Menu from '../Menu'
import OptionsDots from '../icon/OptionsDots'

const RESIZE_DELAY_TIME = 125

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
  const [tabsMenuOpen, setTabsMenuOpen] = useState(false)

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
            childIndex = childrens.length
          }

          setShowMoreTabsButton(hideTabs)
          setLastShowTab(childIndex)
          setTabsMenuOpen(false) // close every resize
        }
      },
      RESIZE_DELAY_TIME,
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

  const getHiddenTabProps = (child: Tab) => {
    const { label, onClick } = child.props
    return { label, onClick }
  }

  const getAllHiddenTabs = () =>
    childrenArray.slice(lastShownTab).map(getHiddenTabProps)

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
          <Menu
            options={getAllHiddenTabs()}
            open={tabsMenuOpen}
            onClose={() => {
              setTabsMenuOpen(false)
            }}>
            <button
              onClick={() => {
                setTabsMenuOpen(true)
              }}
              className={`
                vtex-tab__button
                vtex-tab__button--inactive
                over-c-action-primary
                hover-c-action-primary
                c-muted-1
                b--transparent 
                bt-0 bl-0 br-0 bb-0
                v-mid
                pointer
                relative
                h-regular
                t-body
                bg-transparent
                outline-0 
              `}>
              <OptionsDots color="currentColor" />
            </button>
          </Menu>
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
