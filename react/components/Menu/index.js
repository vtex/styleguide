import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../Toggle'
const MENU_DEFAULT_WIDTH = 292
const MENU_MARGIN = 6

const BOX_SHADOW_STYLE = {
  boxShadow:
    '0px 1px 18px rgba(0, 0, 0, 0.14), 0px 15px 40px 10px rgba(0,0,0,0.06)',
}

class Menu extends Component {
  constructor(props) {
    super(props)
    this.containerElement = React.createRef()
    this.menuElement = React.createRef()
  }

  state = {
    hasCalculatedSize: false, // hides the menu while calculating its size and position
    isUpwards: false,
    menuHeight: 0,
    isVisible: false,
  }

  getMenuBounds = () =>
    this.menuElement.current &&
    this.menuElement.current.getBoundingClientRect &&
    this.menuElement.current.getBoundingClientRect()

  updateMenu() {
    const menuBounds = this.getMenuBounds()

    let menuHeight = menuBounds ? menuBounds.height : 0
    const isOutOfBounds =
      menuBounds && menuBounds.top + menuHeight > window.innerHeight
    const isUpwards = isOutOfBounds && menuBounds.top > window.innerHeight / 2
    const windowMargin = 10
    menuHeight = Math.min(
      menuHeight,
      isUpwards
        ? menuBounds.top - 40 - MENU_MARGIN * 2 - windowMargin
        : window.innerHeight - menuBounds.top - windowMargin
    )

    this.setState(
      {
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
        isUpwards: false,
        hasCalculatedSize: false,
        menuHeight: 0,
        isVisible: false,
      })
    }
  }

  render() {
    const { options, width, align, open, onClose, children } = this.props
    const { isUpwards, hasCalculatedSize, menuHeight, isVisible } = this.state

    return (
      <div ref={this.containerElement} className="relative">
        {children}
        {open && (
          <div
            ref={this.menuElement}
            style={{
              ...BOX_SHADOW_STYLE,
              [isUpwards ? 'bottom' : 'top']: 40 + MENU_MARGIN,
              transform:
                !hasCalculatedSize || isVisible
                  ? 'scale(1)'
                  : 'scale(0.7, 0.25)',
              transformOrigin: `${align === 'right' ? '80%' : '20%'} ${
                isUpwards ? '100%' : '0'
              }`,
              transition: isVisible ? 'transform 100ms, opacity 80ms' : 'none',
            }}
            className={`absolute z-999 ba b--muted-4 br2 ${
              align === 'right' ? 'right-0' : 'left-0'
            }
            ${isVisible ? 'o-100' : 'o-0'}`}>
            <div
              className="b2 br2 bg-base"
              style={{ width: width || MENU_DEFAULT_WIDTH }}>
              <div
                style={{ height: menuHeight || 'auto' }}
                className={menuHeight ? 'overflow-scroll' : ''}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center ph6 h-regular pointer hover-bg-muted-5"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  /** Menu Box width (default is 292px) */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Menu options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
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

export default Menu
