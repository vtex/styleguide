import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'
import Toggle from '../Toggle'
const BOX_WIDTH = 292
const MAX_BOX_HEIGHT = 192
const BOX_ITEM_HEIGHT = 36

class Menu extends Component {
  constructor(props) {
    super(props)
    this.menuBtnRef = React.createRef()
    this.state = {
      isBoxOpen: false,
      isHoveringButton: false,
    }
  }

  handleMenuClick = () => {
    const { isBoxOpen } = this.state
    if (isBoxOpen) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
    this.setState({ isBoxOpen: !isBoxOpen })
  }

  handleClickOutside = (e) => {
    if (
      this.menuBtnRef &&
      this.menuBtnRef.current &&
      !this.menuBtnRef.current.contains(e.target) &&
      this.state.isBoxOpen
    ) {
      this.handleMenuClick()
    }
  }

  calculateBoxHeight = () => {
    const { options } = this.props
    const estimate = options.length * BOX_ITEM_HEIGHT
    return estimate > MAX_BOX_HEIGHT ? MAX_BOX_HEIGHT : estimate
  }

  handleHover = (isHovering) => {
    const { isBoxOpen, isHoveringButton } = this.state
    if (!isBoxOpen || isHovering !== isHoveringButton) {
      this.setState({ isHoveringButton: isHovering })
    }
  }

  renderIcon(icon) {
    if (!icon) return null
    return (
      <div className="mr2 pt2 self-center">
        {icon}
      </div>
    )
  }

  render() {
    const { icon, label, options, boxWidth, align } = this.props
    const { isBoxOpen, isHoveringButton } = this.state

    return (
      <Fragment>
        <div
          ref={this.menuBtnRef}
          className="relative">
          <Button
            variation={isBoxOpen || isHoveringButton ? 'secondary' : 'tertiary'}
            size="small"
            onMouseOver={() => this.handleHover(true)}
            onMouseOut={() => this.handleHover(false)}
            onClick={this.handleMenuClick}
          >
            <span className="flex align-baseline items-center">
              {this.renderIcon(icon)}
              <span className="mr3">
                {label}
              </span>
              {isBoxOpen
                ? <IconCaretUp size={13} color="currentColor" />
                : <IconCaretDown size={13} color="currentColor" />
              }
            </span>
          </Button>
          {isBoxOpen && (
            <div
              className={`absolute z-999 ba b--light-gray br2 shadow-1 mt4 ${
                align === 'right' ? 'right-0' : 'left-0'
              }`}>
              <div
                className="b2 br2 bg-base"
                style={{ width: boxWidth || BOX_WIDTH }}>
                <div
                  style={{ height: this.calculateBoxHeight() }}
                  className={(options.length * BOX_ITEM_HEIGHT) > MAX_BOX_HEIGHT ? 'overflow-scroll' : ''}
                >
                  {
                    options.map((option, index) => (
                      <div
                        key={index}
                        className="flex justify-between ph6 pv3 pointer hover-bg-light-silver"
                        onClick={() => {
                          option.handleCallback(option)
                          if (option.closeBoxOnClick) {
                            this.handleMenuClick()
                          }
                        }}>
                        <span className={option.toggle ? 'w-70 truncate' : 'w-100 truncate'}>
                          {option.label}
                        </span>
                        {option.toggle && (
                          <Toggle
                            size="small"
                            semantic={option.toggle.semantic}
                            checked={option.toggle.checked}
                          />
                        )}
                      </div>
                    ))
                  }
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
}

Menu.propTypes = {
  /** Menu Button label */
  label: PropTypes.string.isRequired,
  /** Menu Button icon */
  icon: PropTypes.element,
  /** Menu Box width (default is 292px) */
  boxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Menu options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
      /** whether option has inline toggle */
      toggle: PropTypes.shape({
        checked: PropTypes.bool,
        semantic: PropTypes.bool,
      }),
      /** if clicking on this opption should close the box */
      closeBoxOnClick: PropTypes.bool,
    })
  ),
  /** Menu Box align (default is right) */
  align: PropTypes.oneOf(['right', 'left']),
}

export default Menu
