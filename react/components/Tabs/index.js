import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import withDevice from '../utils/withDeviceHoc'

import './tabs.css'

class Tabs extends Component {
  constructor(props) {
    super(props)

    this.myRef = React.createRef()

    this.state = {
      container: null,
      allItems: null,
      primaryItems: null,
      secondaryItems: null,
      tabsId: uuid(),
    }
  }

  componentDidMount() {
    this.handleResponsiveTabs()
  }

  handleResponsiveTabs() {
    const { tabsId } = this.state

    const container = document.querySelector(`.vtex-tabs-${tabsId}`)
    const primary = container.querySelector(`.vtex-tabs__nav-${tabsId}`)

    const primaryItems = container.querySelectorAll(
      `.vtex-tabs__nav-${tabsId} > div:not(.-more)`
    )
    container.classList?.add('--jsfied')

    primary.insertAdjacentHTML(
      'beforeend',
      `<div class="-more">
        <button type="button" aria-haspopup="true" aria-expanded="false">
          <span>&hellip;</span>
        </button>
        <div class="-secondary -secondary-${tabsId}">
          ${this.myRef.current.innerHTML}
        </div>
      </div>`
    )
    const secondary = container.querySelector(`.-secondary-${tabsId}`)
    const secondaryItems = secondary.querySelectorAll('div')
    const allItems = container.querySelectorAll('div')

    this.setState({ container, allItems, primaryItems, secondaryItems })

    const moreLi = primary.querySelector('.-more')
    const moreBtn = moreLi.querySelector('button')
    moreBtn.addEventListener('click', e => {
      e.preventDefault()
      container.classList.toggle('--show-secondary')
      moreBtn &&
        moreBtn.setAttribute(
          'aria-expanded',
          container.classList.contains('--show-secondary')
        )
    })

    window.addEventListener('resize', this.adaptLayout)

    document.addEventListener('click', e => {
      let el = e.target
      while (el) {
        if (el === secondary || el === moreBtn) {
          return
        }
        el = el.parentNode
      }
      container.classList?.remove('--show-secondary')
      moreBtn && moreBtn.setAttribute('aria-expanded', false)
    })
  }

  adaptLayout = () => {
    // reveal all items for the calculation
    let { container, primary, moreBtn, moreLi } = this.state
    const { allItems, primaryItems, secondaryItems, tabsId } = this.state

    if (!container) {
      container = document.querySelector(`.vtex-tabs-${tabsId}`)
    }
    if (!primary) {
      primary = container.querySelector(`.vtex-tabs__nav-${tabsId}`)
    }
    if (!moreBtn) {
      moreLi = primary.querySelector('.-more')
      moreBtn = moreLi.querySelector('button')
    }

    if (allItems) {
      allItems.forEach(item => {
        item.classList?.remove('--hidden')
      })
    }

    // hide items that won't fit in the Primary
    let stopWidth = moreBtn.offsetWidth
    const hiddenItems = []
    const primaryWidth = primary.offsetWidth

    if (primaryItems) {
      primaryItems.forEach((item, i) => {
        if (primaryWidth >= stopWidth + item.offsetWidth) {
          stopWidth += item.offsetWidth
        } else {
          item.classList?.add('--hidden')
          hiddenItems.push(i)
        }
      })
    }

    // // toggle the visibility of More button and items in Secondary
    if (!hiddenItems.length) {
      moreLi.classList?.add('--hidden')
      container.classList?.remove('--show-secondary')
      moreBtn && moreBtn.setAttribute('aria-expanded', false)
    } else {
      if (secondaryItems) {
        secondaryItems.forEach((item, i) => {
          if (!hiddenItems.includes(i)) {
            item.classList?.add('--hidden')
          }
        })
      }
    }
  }

  render() {
    const { children, fullWidth, sticky, isMobile } = this.props
    const { container, tabsId } = this.state
    if (container) {
      this.adaptLayout()
    }

    const childrenArray = [].concat(children)
    const selectedTab = childrenArray.find(child => child.props.active)
    const content = selectedTab && selectedTab.props.children

    const tabStyles = {}
    let tabClasses = ''
    if (isMobile && !fullWidth) {
      tabStyles.flexGrow = 1
    }
    if (fullWidth) {
      tabClasses += ' w-100'
    }

    return (
      <div
        className={`vtex-tabs vtex-tabs-${tabsId} relative w-100 _h-100 flex flex-column ${
          sticky ? '_overflow-y-hidden' : ''
        }`}>
        <div
          ref={this.myRef}
          className={`vtex-tabs__nav vtex-tabs__nav-${tabsId} _flex _flex-row bb b--muted-4`}>
          {childrenArray.map((child, index) => (
            <div style={tabStyles} className={tabClasses} key={index}>
              {cloneElement(child, {
                fullWidth,
                key: child.props.key != null ? child.props.key : index,
              })}
            </div>
          ))}
        </div>
        <div
          className={`vtex-tabs__content w-100 ${
            sticky ? 'overflow-y-auto' : ''
          }`}>
          {content}
        </div>
      </div>
    )
  }
}

Tabs.defaultProps = {
  fullWidth: false,
  sticky: false,
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  fullWidth: PropTypes.bool,
  sticky: PropTypes.bool,
  isMobile: PropTypes.bool,
}

export default withDevice(Tabs)
