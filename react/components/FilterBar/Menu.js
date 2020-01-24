import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Close from '../icon/Close'
import withDevice from '../utils/withDeviceHoc'

const DEFAULT_WIDTH = 292
const CONTAINER_MARGIN = 6
const WINDOW_MARGIN = 10

class Menu extends Component {
  constructor(props) {
    super(props)
    this.containerElement = React.createRef()
    this.menuElement = React.createRef()
  }

  state = {
    hasCalculatedSize: false, // hides the menu while calculating its size and position
    isUpwards: false, // opens the menu from bottom to top, if it doesn't fit on the screen otherwise
    isVisible: false, // triggers the opening animation
    menuHeight: 0,
    containerHeight: 0,
  }

  getMenuBounds = () =>
    this.menuElement.current &&
    this.menuElement.current.getBoundingClientRect &&
    this.menuElement.current.getBoundingClientRect()

  getContainerBounds = () =>
    this.containerElement.current &&
    this.containerElement.current.getBoundingClientRect &&
    this.containerElement.current.getBoundingClientRect()

  updateMenu() {
    const menuBounds = this.getMenuBounds()
    const containerBounds = this.getContainerBounds()

    if (!menuBounds || !containerBounds) return

    const containerHeight = containerBounds.height

    const initialMenuHeight = menuBounds.height

    const itemHeight = initialMenuHeight / this.props.options.length

    const isOutOfBounds =
      menuBounds.top + initialMenuHeight + containerHeight > window.innerHeight

    const isUpwards =
      isOutOfBounds && containerBounds.top > window.innerHeight / 2

    const maxMenuHeight = isUpwards
      ? menuBounds.top - CONTAINER_MARGIN - WINDOW_MARGIN
      : window.innerHeight -
        menuBounds.top -
        containerHeight -
        CONTAINER_MARGIN -
        WINDOW_MARGIN

    // Makes the height of the menu, if it doesn't entirely fit on the screen,
    // fall in the middle of an item, to hint that the menu scrolls
    const visibleItemsNum = Math.round(maxMenuHeight / itemHeight)
    const adjustedMenuHeight = visibleItemsNum * itemHeight - itemHeight / 2

    const menuHeight =
      maxMenuHeight < initialMenuHeight ? adjustedMenuHeight : 0

    this.setState(
      {
        containerHeight,
        menuHeight,
        isUpwards,
        hasCalculatedSize: true,
      },
      () => {
        // triggers the menu opening animation
        setTimeout(() => {
          this.setState({ isVisible: true })
        }, 1)
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.updateMenu()
    }

    if (prevProps.open && !this.props.open) {
      this.setState({
        hasCalculatedSize: false,
        isUpwards: false,
        isVisible: false,
        menuHeight: 0,
        containerHeight: 0,
      })
    }
  }

  render() {
    const {
      width,
      align,
      open,
      children,
      button,
      isMobile,
      options,
    } = this.props
    const {
      hasCalculatedSize,
      isUpwards,
      isVisible,
      menuHeight,
      containerHeight,
    } = this.state

    const isRight = align === 'right'

    const optionsLabel = (options && options.label) || ''

    let styles = {
      boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)',
    }

    if (isMobile) {
      styles = {
        ...styles,
        top: 0,
        height: '100%',
      }
    }

    if (!isMobile) {
      styles = {
        ...styles,
        transform:
          !hasCalculatedSize || isVisible ? 'scale(1)' : 'scale(0.9, 0.6)',
        transformOrigin: `${isRight ? '75%' : '25%'} ${
          isUpwards ? '100%' : '0'
        }`,
        transition: isVisible
          ? `transform 50ms ease-out, opacity 25ms`
          : 'none',
        [isUpwards ? 'bottom' : 'top']: containerHeight + CONTAINER_MARGIN,
      }
    }

    const openContainerClasses = classNames(
      'fixed absolute-ns w-100 w-auto-ns z-999 ba bw1 b--muted-4 bg-base',
      {
        'right-0': isRight,
        'left-0': !isRight,
        br0: isMobile,
        br2: !isMobile,
        'o-100': isVisible,
        'o-0': !isVisible,
      }
    )

    return (
      <div className="relative">
        <div ref={this.containerElement}>{button}</div>
        {open && (
          <>
            <div
              ref={this.menuElement}
              style={styles}
              className={openContainerClasses}>
              <div
                className="b2-ns br2-ns bg-base h-100 h-auto-ns"
                style={{ width: isMobile ? '100%' : width || DEFAULT_WIDTH }}>
                <div
                  className={
                    menuHeight
                      ? 'overflow-auto h-100 h-auto-ns'
                      : 'h-100 h-auto-ns'
                  }>
                  {isMobile && (
                    <div className="flex justify-between flex-row items-baseline pa6 mh3">
                      <div className="truncate f3 pr6">{optionsLabel}</div>
                      <div onClick={this.props.onBackgroundClick}>
                        <Close size={20} color="currentColor" />
                      </div>
                    </div>
                  )}
                  {children}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

Menu.defaultProps = {
  options: [],
  align: 'right',
  open: false,
}

Menu.propTypes = {
  /** The element which will open the menu--the menu will
   * be positioned around this element */
  children: PropTypes.node,
  /** Menu visibility (default is false) */
  open: PropTypes.bool,
  options: PropTypes.array,
  button: PropTypes.element,
  /** Menu Box width (default is 292px) */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** function to close the menu after clicking an option */
  onClose: PropTypes.func,
  /** Menu Box align (default is right) */
  align: PropTypes.oneOf(['right', 'left']),
  /** Function to handle callback on overlay click */
  onBackgroundClick: PropTypes.func,
  /** Boolean if the device is mobile  */
  isMobile: PropTypes.bool,
}

export default withDevice(Menu)
