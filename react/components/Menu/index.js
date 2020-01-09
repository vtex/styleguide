import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Overlay } from 'react-overlays'

import Toggle from '../Toggle'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

const DEFAULT_WIDTH = 292
const CONTAINER_MARGIN = 6
const WINDOW_MARGIN = 10
const DEFAULT_DOCUMENT_ELEMENT = {
  scrollTop: 0,
  scrollLeft: 0,
  clientWidth: 0,
  clientHeight: 0,
}

class Menu extends Component {
  constructor(props) {
    super(props)
    this.containerElement = React.createRef()
    this.menuElement = props.forwardedRef || React.createRef()
  }

  state = {
    hasCalculatedSize: false, // hides the menu while calculating its size and position
    isUpwards: false, // opens the menu from bottom to top, if it doesn't fit on the screen otherwise
    isVisible: false, // triggers the opening animation
    menuHeight: 0,
    containerHeight: 0,
  }

  onWindowResize = () => this.forceUpdate()

  componentDidMount() {
    if (window) window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    if (window) window.removeEventListener('resize', this.onWindowResize)
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
      ? menuBounds.top - CONTAINER_MARGIN - WINDOW_MARGIN - containerHeight
      : window.innerHeight - menuBounds.top - CONTAINER_MARGIN - WINDOW_MARGIN

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
    const { options, align, open, onClose, children, width } = this.props
    const { hasCalculatedSize, isUpwards, isVisible, menuHeight } = this.state

    const isRight = align === 'right'

    return (
      <div className="relative">
        <div ref={this.containerElement}>{children}</div>
        <Overlay show={open}>
          {() => {
            const { top, left, right, height } = this.getContainerBounds()

            const {
              scrollTop,
              scrollLeft,
              clientWidth,
              clientHeight,
            } = document ? document.documentElement : DEFAULT_DOCUMENT_ELEMENT

            return (
              <div
                ref={this.menuElement}
                style={{
                  transform:
                    !hasCalculatedSize || isVisible
                      ? 'scale(1)'
                      : 'scale(0.9, 0.6)',
                  transformOrigin: `${isRight ? '75%' : '25%'} ${
                    isUpwards ? '100%' : '0'
                  }`,
                  transition: isVisible
                    ? 'transform 50ms ease-out, opacity 25ms'
                    : 'none',
                  [isUpwards ? 'bottom' : 'top']: isUpwards
                    ? clientHeight - (top + scrollTop - CONTAINER_MARGIN)
                    : top + scrollTop + height + CONTAINER_MARGIN,
                  [isRight ? 'right' : 'left']: isRight
                    ? clientWidth - right
                    : left + scrollLeft,
                  width: width || DEFAULT_WIDTH,
                }}
                className={`absolute z-999 ba b--muted-4 br2 shadow-5 ${
                  isRight ? 'right-0' : 'left-0'
                }
              ${isVisible ? 'o-100' : 'o-0'}`}>
                <div className="b2 br2 bg-base">
                  <div
                    style={{ height: menuHeight || 'auto' }}
                    className={menuHeight ? 'overflow-auto' : ''}>
                    {options.map((option, index) => (
                      <button
                        key={index}
                        className="flex justify-between items-center t-body ph6 h-regular pointer hover-bg-muted-5 ma0 bg-transparent bn w-100 tl"
                        onClick={() => {
                          option.onClick(option)
                          if (onClose) {
                            onClose()
                          }
                        }}>
                        <span
                          className={`${
                            option.toggle ? 'w-70 truncate' : 'w-100 truncate'
                          } ${option.isDangerous ? 'c-danger' : ''}`}>
                          {option.label}
                        </span>
                        {option.toggle && (
                          <div style={{ pointerEvents: 'none' }}>
                            <Toggle
                              size="regular"
                              semantic={option.toggle.semantic}
                              checked={option.toggle.checked}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          }}
        </Overlay>
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
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Menu visibility (default is false) */
  open: PropTypes.bool,
  /** Menu Box width (default is 292px) */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Menu options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      onClick: PropTypes.func,
      /** whether option has inline toggle */
      toggle: PropTypes.shape({
        checked: PropTypes.bool,
        semantic: PropTypes.bool,
      }),
    })
  ),
  /** function to close the menu after clicking an option */
  onClose: PropTypes.func,
  /** Menu Box align (default is right) */
  align: PropTypes.oneOf(['right', 'left']),
}

export default withForwardedRef(Menu)
