import React, {
  cloneElement,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  Children,
  useEffect,
  PropsWithChildren,
} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import { TabProps } from './Tab'
import Menu from '../Menu'
import OptionsDots from '../icon/OptionsDots'
import useDevice from '../utils/useDevice'
import {
  mapArrayToIndex,
  handleHideTabs,
  handleShowSelectedHiddenTab,
} from './util'

const RESIZE_DELAY_TIME = 125

type Props = PropsWithChildren<{
  fullWidth?: boolean
  sticky?: boolean
}>

function Tabs({ children, fullWidth = false, sticky = false }: Props) {
  const childrenArray = React.useMemo(
    () => Children.toArray(children) as Array<React.ReactElement<TabProps>>,
    [children]
  )
  const { isMobile } = useDevice()

  // enable or desable menu with tabs that's hidden
  const [showMoreTabsButton, setShowMoreTabsButton] = useState(false)
  const [tabsMenuOpen, setTabsMenuOpen] = useState(false)
  const [lastShownTab, setLastShowTab] = useState(childrenArray.length)
  const [tabsOrderList, setTabsOrderList] = useState(
    mapArrayToIndex(childrenArray)
  )

  // Handle tabs width to calculate if should hide them
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabsFullContainerRef = useRef<HTMLDivElement>(null)
  // Handle tabs menu actions
  const moreTabsButtonRef = useRef<HTMLButtonElement>(null)
  const tabsMenuRef = useRef<HTMLElement>(null)

  const selectedTabIndex: number = childrenArray.reduce(
    (resultTabIndex, tab, index) =>
      tab?.props.active ? index : resultTabIndex,
    0
  )
  const selectedTab = childrenArray[selectedTabIndex]
  const content = selectedTab?.props.children

  const handleOpenTabMenu = () => {
    !tabsMenuOpen && setTabsMenuOpen(true)
  }

  const calculateTabsVisibility = useCallback(() => {
    const tabsContainerWidth = tabsContainerRef.current?.clientWidth ?? 0
    const tabs = tabsContainerRef?.current?.children

    // verify if is necessary hide tabs
    const { hideTabs, tabIndex } = handleHideTabs({
      tabsContainerWidth,
      tabsContainerFullWidth: tabsFullContainerRef.current?.clientWidth,
      tabs,
      selectedTabIndex,
      tabsOrderList: childrenArray.map((_, index) => index),
      fullWidth,
      isMobile,
    })

    const newOrderList = handleShowSelectedHiddenTab({
      tabsOrderList: childrenArray.map((_, index) => index),
      hideTabs,
      tabIndex,
      selectedTabIndex,
    })

    setTabsOrderList(newOrderList)
    setShowMoreTabsButton(hideTabs)
    setLastShowTab(tabIndex)
  }, [fullWidth, isMobile, selectedTabIndex, childrenArray])

  const handleResizeWindow = useCallback(
    debounce(
      () => {
        if (!tabsContainerRef.current) return

        calculateTabsVisibility()
        setTabsMenuOpen(false) // close every resize
      },
      RESIZE_DELAY_TIME,
      { trailing: true }
    ),
    [tabsContainerRef, tabsFullContainerRef, selectedTabIndex]
  )

  useLayoutEffect(() => {
    const handleChangeSelectedTab = () => {
      if (tabsContainerRef.current) {
        calculateTabsVisibility()
      }
    }

    handleChangeSelectedTab()
  }, [calculateTabsVisibility, selectedTabIndex])

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
    function handleClickOutsideMenu(event: MouseEvent) {
      if (
        moreTabsButtonRef.current?.contains(event.target) ||
        tabsMenuRef.current?.contains(event.target)
      ) {
        return
      }
      setTabsMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutsideMenu, false)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu, false)
    }
  }, [])

  const getHiddenTabProps = (tabIndex: number) => {
    const { label, onClick } = childrenArray[tabIndex].props
    return { label, onClick }
  }

  const getAllHiddenTabs = () =>
    tabsOrderList.slice(lastShownTab).map(getHiddenTabProps)

  const renderTabs = tabsOrderList.map((tabIndex, index) => {
    const child = childrenArray[tabIndex]
    const hidden = index >= lastShownTab

    return (
      !(hidden && (fullWidth || isMobile)) &&
      cloneElement(child, {
        fullWidth,
        key: index,
        hidden,
      })
    )
  })

  return (
    <div
      className={`vtex-tabs w-100 h-100 flex flex-column ${
        sticky ? 'overflow-y-hidden' : ''
      }`}
    >
      <div className="flex">
        <div
          className="vtex-tabs__nav inline-flex flex-row bb b--muted-4 w-100 overflow-hidden"
          ref={tabsContainerRef}
        >
          {renderTabs}
        </div>
        {showMoreTabsButton && (
          <Menu
            ref={tabsMenuRef}
            options={getAllHiddenTabs()}
            open={tabsMenuOpen}
            onClose={() => {
              setTabsMenuOpen(false)
            }}
          >
            <button
              ref={moreTabsButtonRef}
              onClick={handleOpenTabMenu}
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
              `}
            >
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

Tabs.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  sticky: PropTypes.bool,
}

export default Tabs
