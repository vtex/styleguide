import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Menu from '../Menu'
import Button from '../Button'

import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'

class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.menuBtnRef = React.createRef()
    this.state = {
      isBoxOpen: false,
      isHoveringButton: false,
    }
  }

  handleClick = () => {
    const { isBoxOpen } = this.state
    if (isBoxOpen) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
    this.setState({ isBoxOpen: !isBoxOpen })
  }

  handleClickOutside = e => {
    if (
      this.menuBtnRef &&
      this.menuBtnRef.current &&
      !this.menuBtnRef.current.contains(e.target) &&
      this.state.isBoxOpen
    ) {
      this.handleClick()
    }
  }

  handleHover = isHovering => {
    const { isBoxOpen, isHoveringButton } = this.state
    if (!isBoxOpen || isHovering !== isHoveringButton) {
      this.setState({ isHoveringButton: isHovering })
    }
  }

  render() {
    const {
      icon,
      label,
      options,
      boxWidth,
      align,
      isSimpleIcon,
      showCaretIcon,
      shouldCloseOnClick,
    } = this.props

    const { isBoxOpen, isHoveringButton } = this.state

    const iconMenu = icon && <div onClick={this.handleClick}>{icon}</div>

    const iconCaret = isBoxOpen ? (
      <IconCaretUp size={13} color="currentColor" />
    ) : (
      <IconCaretDown size={13} color="currentColor" />
    )

    const buttonMenu = (
      <Button
        variation={isBoxOpen || isHoveringButton ? 'secondary' : 'tertiary'}
        size="small"
        onMouseOver={() => this.handleHover(true)}
        onMouseOut={() => this.handleHover(false)}
        onClick={this.handleClick}>
        <span className="flex align-baseline items-center">
          {icon && (
            <div className={`pt2 self-center ${showCaretIcon ? 'mr2' : ''}`}>
              {icon}
            </div>
          )}

          {label && (
            <span className={`${showCaretIcon ? 'mr3' : ''}`}>{label}</span>
          )}

          {showCaretIcon && iconCaret}
        </span>
      </Button>
    )

    return (
      <Fragment>
        <div ref={this.menuBtnRef} className="relative pointer">
          <div
            className={`flex ${
              align === 'left' ? 'justify-start' : 'justify-end'
            }`}>
            {isSimpleIcon ? iconMenu : buttonMenu}
          </div>
          <Menu
            isOpen={isBoxOpen}
            align={align}
            boxWidth={boxWidth}
            options={options}
            onMenuClose={shouldCloseOnClick ? this.handleClick : null}
          />
        </div>
      </Fragment>
    )
  }
}

ActionMenu.defaultProps = {
  options: [],
  align: 'right',
  showCaretIcon: true,
}

ActionMenu.propTypes = {
  /** ActionMenu alignment (default is right) */
  align: PropTypes.oneOf(['right', 'left']),
  /** if should close the menu after clicking an option */
  shouldCloseOnClick: PropTypes.bool,
  /** if it's a simple icon, not a button */
  isSimpleIcon: PropTypes.bool,
  /** ActionMenu Button label */
  label: PropTypes.string.isRequired,
  /** ActionMenu Button icon */
  icon: PropTypes.element,
  /** If should show Caret icon */
  showCaretIcon: PropTypes.bool,
  /** Menu width (default is 292px) */
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
    })
  ),
}

export default ActionMenu
