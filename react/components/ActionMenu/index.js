import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconCaretDown from '../icon/CaretDown'
import Menu from '../Menu'

class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.menuBtnRef = React.createRef()
    this.state = {
      isBoxOpen: false,
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

  render() {
    const {
      icon,
      label,
      options,
      menuWidth,
      align,
      buttonProps,
      hideCaretIcon,
      shouldCloseOnClick,
    } = this.props

    const { isBoxOpen } = this.state

    const iconCaret = <IconCaretDown size={12} color="currentColor" />

    const buttonMenu = (
      <Button {...buttonProps} onClick={this.handleClick}>
        <span className="flex align-baseline items-center">
          {icon && (
            <div className={`pt2 self-center ${hideCaretIcon ? '' : 'mr2'}`}>
              {icon}
            </div>
          )}

          {label && (
            <span className={`${hideCaretIcon ? '' : 'mr3'}`}>{label}</span>
          )}

          {!hideCaretIcon && <span>{iconCaret}</span>}
        </span>
      </Button>
    )

    return (
      <div ref={this.menuBtnRef}>
        {buttonMenu}
        <Menu
          isOpen={isBoxOpen}
          align={align}
          menuWidth={menuWidth}
          options={options}
          onMenuClose={shouldCloseOnClick ? this.handleClick : null}
        />
      </div>
    )
  }
}

ActionMenu.defaultProps = {
  options: [],
  align: 'right',
  hideCaretIcon: false,
  menuWidth: '100%',
  shouldCloseOnClick: true,
}

ActionMenu.propTypes = {
  /** Menu alignment in relation to the button*/
  align: PropTypes.oneOf(['right', 'left']),
  /** If should close the menu after clicking an option */
  shouldCloseOnClick: PropTypes.bool,
  /** Respecting button props contract. */
  buttonProps: PropTypes.shape({ ...Button.propTypes }),
  /** Button icon */
  icon: PropTypes.element,
  /** Button text label */
  label: PropTypes.string,
  /** Hide the automatic caret icon */
  hideCaretIcon: PropTypes.bool,
  /** Menu width*/
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
      }),
    })
  ),
}

export default ActionMenu
