import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon'
import IconCaretDown from '../icon/CaretDown'
import Menu from '../Menu'

class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.menu = React.createRef()
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

  isClickOutsideMenu = target =>
    this.menu && this.menu.current && !this.menu.current.contains(target)

  isClickOutsideContainer = target =>
    this.container &&
    this.container.current &&
    !this.container.current.contains(target)

  isClickOutside = target =>
    this.isClickOutsideContainer(target) && this.isClickOutsideMenu(target)

  handleClickOutside = e => {
    if (this.isClickOutside(e.target) && this.state.isMenuOpen) {
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
      isGrouped,
      isFirstOfGroup,
      isLastOfGroup,
      isActiveOfGroup,
    } = this.props

    const { isMenuOpen } = this.state

    const iconCaret = <IconCaretDown size={12} color="currentColor" />

    return (
      <div ref={this.container}>
        <Menu
          ref={this.menu}
          open={isMenuOpen}
          align={align}
          width={menuWidth}
          options={options}
          onClose={shouldCloseOnClick ? this.closeMenu : null}>
          <ButtonWithIcon
            {...{
              icon:
                icon ||
                (!label && !hideCaretIcon ? iconCaret : <React.Fragment />),
            }}
            {...buttonProps}
            isGrouped={isGrouped}
            isFirstOfGroup={isFirstOfGroup}
            isLastOfGroup={isLastOfGroup}
            isActiveOfGroup={isActiveOfGroup}
            onClick={this.handleClick}>
            {label && (
              <span className="flex align-baseline items-center">
                <span className={`${hideCaretIcon ? '' : 'mr3'}`}>{label}</span>
                {!hideCaretIcon && <span>{iconCaret}</span>}
              </span>
            )}
          </ButtonWithIcon>
        </Menu>
      </div>
    )
  }
}

ActionMenu.defaultProps = {
  options: [],
  align: 'right',
  hideCaretIcon: false,
  menuWidth: 292,
  shouldCloseOnClick: true,
  isGrouped: false,
  isFirstOfGroup: false,
  isLastOfGroup: false,
  isActiveOfGroup: false,
}

ActionMenu.propTypes = {
  /** Menu alignment in relation to the button*/
  align: PropTypes.oneOf(['right', 'left']),
  /** If should close the menu after clicking an option */
  shouldCloseOnClick: PropTypes.bool,
  /** Respecting ButtonWithIcon props contract. For more info, see:
   * https://styleguide.vtex.com/#/Components/Forms/Button
   */
  // TODO: match ButtonWithIcon prop types
  buttonProps: PropTypes.object,
  /** @deprecated Button icon: use buttonProps instead */
  icon: PropTypes.element,
  /** Button text label */
  label: PropTypes.node,
  /** Hide the automatic caret icon */
  hideCaretIcon: PropTypes.bool,
  /** Menu width*/
  menuWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Menu options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      handleCallback: PropTypes.func,
      /** whether option has inline toggle */
      toggle: PropTypes.shape({
        checked: PropTypes.bool,
        semantic: PropTypes.bool,
      }),
    })
  ).isRequired,
  /** */
  isGrouped: PropTypes.bool,
  /** */
  isFirstOfGroup: PropTypes.bool,
  /** */
  isLastOfGroup: PropTypes.bool,
  /** */
  isActiveOfGroup: PropTypes.bool,
}

export default ActionMenu
