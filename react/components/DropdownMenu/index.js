import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Menu from '../Menu'
import Button from '../Button'

import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'

class DropdownMenu extends Component {
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

  handleClickOutside = e => {
    if (
      this.menuBtnRef &&
      this.menuBtnRef.current &&
      !this.menuBtnRef.current.contains(e.target) &&
      this.state.isBoxOpen
    ) {
      this.handleMenuClick()
    }
  }

  handleHover = isHovering => {
    const { isBoxOpen, isHoveringButton } = this.state
    if (!isBoxOpen || isHovering !== isHoveringButton) {
      this.setState({ isHoveringButton: isHovering })
    }
  }

  renderIcon(icon) {
    if (!icon) return null
    return <div className="mr2 pt2 self-center">{icon}</div>
  }

  render() {
    const { icon, label, options, boxWidth, align, showIconCaret } = this.props
    const { isBoxOpen, isHoveringButton } = this.state

    const iconCaret = isBoxOpen ? (
      <IconCaretUp size={13} color="currentColor" />
    ) : (
      <IconCaretDown size={13} color="currentColor" />
    )

    return (
      <Fragment>
        <div ref={this.menuBtnRef} className="relative">
          <Button
            variation={isBoxOpen || isHoveringButton ? 'secondary' : 'tertiary'}
            size="small"
            onMouseOver={() => this.handleHover(true)}
            onMouseOut={() => this.handleHover(false)}
            onClick={this.handleMenuClick}>
            <span className="flex align-baseline items-center">
              {this.renderIcon(icon)}
              <span className={`${showIconCaret ? 'mr3' : ''}`}>{label}</span>
              {showIconCaret ? iconCaret : null}
            </span>
          </Button>
          <Menu
            isOpen={isBoxOpen}
            align={align}
            boxWidth={boxWidth}
            options={options}
          />
        </div>
      </Fragment>
    )
  }
}

DropdownMenu.defaultProps = {
  options: [],
  align: 'right',
  showIconCaret: true,
}

DropdownMenu.propTypes = {
  /** DropdownMenu Button label */
  label: PropTypes.string.isRequired,
  /** DropdownMenu Button icon */
  icon: PropTypes.element,
  /** If should show Caret icon */
  showIconCaret: PropTypes.bool,
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

export default DropdownMenu
