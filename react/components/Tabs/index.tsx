import React, {
  cloneElement,
  FC,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  Children,
  useEffect,
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

const mapArrayToIndex: <T>(array: T[]) => number[] = array =>
  array.map((_, index) => index)

const Tabs: FC<InferProps<typeof propTypes>> = ({
  children,
  fullWidth,
  sticky,
}) => {
  const childrenArray: Tab[] = Children.toArray(children)

  const [showMoreTabsButton, setShowMoreTabsButton] = useState(false)
  const [tabsMenuOpen, setTabsMenuOpen] = useState(false)
  const [lastShownTab, setLastShowTab] = useState(childrenArray.length)
  const [tabsOrderList, setTabsOrderList] = useState(
    mapArrayToIndex(childrenArray)
  )

  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabsFullContainerRef = useRef<HTMLDivElement>(null)
  const moreTabsButtonRef = useRef<HTMLButtonElement>(null)

  const selectedTabIndex: number = childrenArray.reduce(
    (resultTabIndex: number, tab: Tab, index: number) =>
      tab.props.active ? index : resultTabIndex,
    0
  )
  const selectedTab: Tab = childrenArray[selectedTabIndex]
  const content = selectedTab && selectedTab.props.children

  const handleResizeWindow = useCallback(
    debounce(
      () => {
        if (tabsContainerRef.current) {
          const { clientWidth: tabsContainerWidth } = tabsContainerRef.current
          let hideTabs = false

          // verify if is necessary hide tabs
          const childrens = tabsContainerRef.current.children
          const normalizedIndex = tabsOrderList.indexOf(selectedTabIndex)
          let sumTabWidths = childrens[normalizedIndex].clientWidth
          let tabIndex = 0
          // debugger
          for (; tabIndex < childrens.length; tabIndex++) {
            const { clientWidth: childWidth } = childrens[tabIndex]
            if (tabIndex !== normalizedIndex) {
              sumTabWidths += childWidth
            }

            if (sumTabWidths > tabsContainerWidth) {
              hideTabs = true
              if (tabIndex <= normalizedIndex) {
                tabIndex++
              }
              break
            }
          }

          // verify if the last tab can fit without more tabs button
          if (
            hideTabs &&
            tabIndex + 1 === childrens.length &&
            sumTabWidths <= tabsFullContainerRef.current?.clientWidth
          ) {
            hideTabs = false
            tabIndex = childrens.length
          }

          // change display tabs order - every hidden selected tab should be displayed
          const newTabsOrderList = mapArrayToIndex(childrenArray)
          if (hideTabs && selectedTabIndex >= tabIndex) {
            const leftList = newTabsOrderList.slice(0, tabIndex - 1)
            const rightList = newTabsOrderList
              .slice(tabIndex - 1)
              .filter(i => i !== selectedTabIndex)
            setTabsOrderList(
              leftList.concat([selectedTabIndex]).concat(rightList)
            )
          } else {
            setTabsOrderList(newTabsOrderList)
          }

          setShowMoreTabsButton(hideTabs)
          setLastShowTab(tabIndex)
          setTabsMenuOpen(false) // close every resize
        }
      },
      RESIZE_DELAY_TIME,
      { trailing: true }
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabsContainerRef, tabsFullContainerRef, selectedTabIndex]
  )

  useLayoutEffect(() => {
    const handleChangeSelectedTab = () => {
      if (tabsContainerRef.current) {
        const { clientWidth: tabsContainerWidth } = tabsContainerRef.current
        let hideTabs = false

        // verify if is necessary hide tabs
        const childrens = tabsContainerRef.current.children
        const normalizedIndex = tabsOrderList.indexOf(selectedTabIndex)
        let sumTabWidths = childrens[normalizedIndex].clientWidth
        let tabIndex = 0
        // debugger
        for (; tabIndex < childrens.length; tabIndex++) {
          const { clientWidth: childWidth } = childrens[tabIndex]
          if (tabIndex !== normalizedIndex) {
            sumTabWidths += childWidth
          }

          if (sumTabWidths > tabsContainerWidth) {
            hideTabs = true
            if (tabIndex <= normalizedIndex) {
              tabIndex++
            }
            break
          }
        }

        // verify if the last tab can fit without more tabs button
        if (
          hideTabs &&
          tabIndex + 1 === childrens.length &&
          sumTabWidths <= tabsFullContainerRef.current?.clientWidth
        ) {
          hideTabs = false
          tabIndex = childrens.length
        }

        // change display tabs order - every hidden selected tab should be displayed
        const newTabsOrderList = mapArrayToIndex(childrenArray)
        if (hideTabs && selectedTabIndex >= tabIndex) {
          const leftList = newTabsOrderList.slice(0, tabIndex - 1)
          const rightList = newTabsOrderList
            .slice(tabIndex - 1)
            .filter(i => i !== selectedTabIndex)
          setTabsOrderList(
            leftList.concat([selectedTabIndex]).concat(rightList)
          )
        } else {
          setTabsOrderList(newTabsOrderList)
        }

        setShowMoreTabsButton(hideTabs)
        setLastShowTab(tabIndex)
      }
    }

    handleChangeSelectedTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabIndex])

  useLayoutEffect(() => {
    const hasWindow = !(
      typeof window === 'undefined' || typeof window.Element === 'undefined'
    )
    if (hasWindow) {
      window.addEventListener('resize', handleResizeWindow)
    }

    return () => {
      hasWindow && window.removeEventListener('resize', handleResizeWindow)
    }
  }, [handleResizeWindow])

  useEffect(() => {
    const handleClickOutsideMenu = event => {
      if (moreTabsButtonRef.current?.contains(event.target)) {
        return
      }
      setTabsMenuOpen(false)
    }

    handleResizeWindow()
    document.addEventListener('mousedown', handleClickOutsideMenu, false)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getHiddenTabProps = (tabIndex: number) => {
    const { label, onClick } = childrenArray[tabIndex].props
    return { label, onClick }
  }

  const getAllHiddenTabs = () =>
    tabsOrderList.slice(lastShownTab).map(getHiddenTabProps)

  const renderTabs = tabsOrderList.map((tabIndex, index) => {
    const child: Tab = childrenArray[tabIndex]
    return cloneElement(child, {
      fullWidth,
      key: child.props.key != null ? child.props.key : index,
      className: `${index >= lastShownTab ? 'o-0' : ''}`,
    })
  })

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
          {renderTabs}
        </div>
        {showMoreTabsButton && (
          <Menu
            ref={moreTabsButtonRef}
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
