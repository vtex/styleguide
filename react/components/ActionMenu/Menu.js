import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../Toggle'
const BOX_WIDTH = 292
const MAX_BOX_HEIGHT = 192
const BOX_ITEM_HEIGHT = 40

const BOX_SHADOW_STYLE = { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' }

class Menu extends Component {
  constructor(props) {
    super(props)
    this.menuBtnRef = React.createRef()
  }

  calculateBoxHeight = () => {
    const { options } = this.props
    const estimate = options.length * BOX_ITEM_HEIGHT
    return estimate > MAX_BOX_HEIGHT ? MAX_BOX_HEIGHT : estimate
  }

  render() {
    const { options, menuWidth, align, isOpen, onMenuClose } = this.props

    return (
      <Fragment>
        <div ref={this.menuBtnRef} className="relative">
          {isOpen && (
            <div
              style={BOX_SHADOW_STYLE}
              className={`absolute z-999 ba b--muted-4 br2 shadow-1 mt4 ${
                align === 'right' ? 'right-0' : 'left-0'
              }`}>
              <div
                className="b2 br2 bg-base"
                style={{ width: menuWidth || BOX_WIDTH }}>
                <div
                  style={{ height: this.calculateBoxHeight() }}
                  className={
                    options.length * BOX_ITEM_HEIGHT > MAX_BOX_HEIGHT
                      ? 'overflow-scroll'
                      : ''
                  }>
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center ph6 h-regular pointer hover-bg-muted-5"
                      onClick={() => {
                        option.handleCallback(option)
                        if (onMenuClose) {
                          onMenuClose()
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
                            onChange={option.toggle.handleChange}
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
      </Fragment>
    )
  }
}

Menu.defaultProps = {
  options: [],
  align: 'right',
  isOpen: false,
}

Menu.propTypes = {
  /** Menu visibility (default is false) */
  isOpen: PropTypes.bool,
  /** Menu Box width (default is 292px) */
  menuWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Menu options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
      /** whether option has inline toggle */
      toggle: PropTypes.shape({
        checked: PropTypes.bool,
        semantic: PropTypes.bool,
        handleChange: PropTypes.func,
      }),
    })
  ),
  /** function to close the menu after clicking an option */
  onMenuClose: PropTypes.func,
  /** Menu Box align (default is right) */
  align: PropTypes.oneOf(['right', 'left']),
}

export default Menu
