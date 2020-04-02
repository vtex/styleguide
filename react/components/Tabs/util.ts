const DEFAULT_TAB_WIDTH = 128

interface HandleHideTabsInput {
  tabs?: HTMLCollection
  tabsContainerWidth: number
  tabsContainerFullWidth?: number
  selectedTabIndex: number
  tabsOrderList: number[]
  fullWidth?: boolean
  isMobile?: boolean
}

interface HandleHideTabsOutput {
  hideTabs: boolean
  tabIndex: number
}

interface HandleShowSelectedHiddenTabInput extends HandleHideTabsOutput {
  tabsOrderList: number[]
  selectedTabIndex: number
}

export const mapArrayToIndex: <T>(array: T[]) => number[] = array =>
  array.map((_, index) => index)

export function handleHideTabs({
  tabsContainerWidth = 0,
  tabsContainerFullWidth = 0,
  tabs, // list with rendered tabs
  selectedTabIndex,
  tabsOrderList,
  fullWidth,
  isMobile,
}: HandleHideTabsInput): HandleHideTabsOutput {
  if (!tabs) return { hideTabs: false, tabIndex: 0 }
  let hideTabs = false
  let tabIndex = 0
  if (isMobile || fullWidth) {
    // handle fullwidth
    const numberOfTabs = tabsContainerFullWidth / DEFAULT_TAB_WIDTH
    tabIndex = numberOfTabs - (numberOfTabs % 1)
    hideTabs = tabIndex < tabsOrderList.length
  } else {
    const normalizedIndex = tabsOrderList.indexOf(selectedTabIndex)
    let sumTabsWidth = tabs[normalizedIndex]?.clientWidth ?? 0

    // verify if is necessary hide tabs
    for (; tabIndex < tabs.length; tabIndex++) {
      const childWidth = tabs[tabIndex]?.clientWidth ?? 0
      if (tabIndex !== normalizedIndex) {
        sumTabsWidth += childWidth || DEFAULT_TAB_WIDTH
      }

      if (sumTabsWidth > tabsContainerWidth) {
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
      tabIndex + 1 === tabs.length &&
      sumTabsWidth <= tabsContainerFullWidth
    ) {
      hideTabs = false
      tabIndex = tabs.length
    }
  }

  return { hideTabs, tabIndex }
}

export function handleShowSelectedHiddenTab({
  tabsOrderList,
  hideTabs,
  selectedTabIndex,
  tabIndex,
}: HandleShowSelectedHiddenTabInput): number[] {
  if (hideTabs && selectedTabIndex >= tabIndex) {
    const leftList = tabsOrderList.slice(0, tabIndex - 1)
    const rightList = tabsOrderList
      .slice(tabIndex - 1)
      .filter(i => i !== selectedTabIndex)
    return leftList.concat([selectedTabIndex]).concat(rightList)
  }
  return tabsOrderList
}
