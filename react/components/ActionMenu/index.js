import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconCaretDown from '../icon/CaretDown'
import Menu from '../Menu'

class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      isMenuOpen: false,
    }
  }

  openMenu = () => {
    if (this.state.isMenuOpen) return

    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({ isMenuOpen: true })
  }

  closeMenu = () => {
    if (!this.state.isMenuOpen) return

    document.removeEventListener('mousedown', this.handleClickOutside)
    this.setState({ isMenuOpen: false })
  }

  handleClick = () => {
    if (!this.state.isMenuOpen) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  handleClickOutside = e => {
    if (
      this.container &&
      this.container.current &&
      !this.container.current.contains(e.target) &&
      this.state.isMenuOpen
    ) {
      this.closeMenu()
    }
  }

  componentWillUnmount() {
    if (this.state.isMenuOpen) {
      this.closeMenu()
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

    const { isMenuOpen } = this.state

    const iconCaret = <IconCaretDown size={12} color="currentColor" />

    return (
      <div ref={this.container}>
        <Menu
          open={isMenuOpen}
          align={align}
          width={menuWidth}
          options={options}
          onClose={shouldCloseOnClick ? this.closeMenu : null}>
          <Button {...buttonProps} onClick={this.handleClick}>
            <span className="flex align-baseline items-center">
              {icon && (
                <div
                  className={`pt2 self-center ${hideCaretIcon ? '' : 'mr2'}`}>
                  {icon}
                </div>
              )}
              {label && (
                <span className={`${hideCaretIcon ? '' : 'mr3'}`}>{label}</span>
              )}
              {!hideCaretIcon && <span>{iconCaret}</span>}
            </span>
          </Button>
        </Menu>
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
  ).isRequired,
}

export default ActionMenu
