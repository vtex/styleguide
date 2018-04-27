import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  handleClick = event => {
    !this.props.disabled && this.props.onClick && this.props.onClick(event)
  }

  render() {
    const { size, block, primary, secondary, outline, disabled, icon } = this.props
    const Tag = icon ? 'div' : 'button'

    if (secondary && primary) {
      throw new Error('Button component cannot be primary AND secondary')
    }

    let classes = 'vtex-button bw1 ba fw5 ttu br2 fw4 v-mid '

    classes += icon ? 'icon-button dib ' : ''

    switch (size) {
      case 'large':
        classes += icon ? 'pa4 ' : 'pv4 ph6 '
        classes += 'f5 '
        break
      case 'x-large':
        classes += icon ? 'pa5 ' : 'pv5 ph7 '
        classes += 'f4 '
        break
      default:
        classes += icon ? 'pa3 ' : 'pv3 ph5 '
        classes += 'f6 '
        break
    }

    if (!outline && !secondary && !primary && !disabled) {
      classes +=
        'b--transparent blue bg-transparent hover-bg-black-10 hover-heavy-blue hover-b--transparent '
    }

    if (secondary && !disabled) {
      classes += 'bg-light-silver blue b--transparent hover-heavy-blue '
    }
    if (secondary) {
      classes += 'hover-bg-light-gray '
    }

    if (outline && !disabled) {
      classes += 'bg-transparent b--blue blue hover-white '
    }
    if (outline) {
      classes += 'hover-bg-blue '
    }

    if (primary && !disabled) {
      classes +=
        'b--blue bg-blue white hover-bg-heavy-blue hover-b--heavy-blue '
    }

    if (disabled) {
      classes += 'b--light-gray bg-light-gray gray '
    } else {
      classes += 'pointer '
    }

    if (block) {
      classes += 'w-100 '
    }

    return (
      <Tag
        id={this.props.id}
        autoFocus={icon ? undefined : this.props.autoFocus}
        disabled={icon ? undefined : this.props.disabled}
        name={icon ? undefined : this.props.name}
        type={icon ? undefined : this.props.type}
        value={icon ? undefined : this.props.value}
        className={classes}
        onClick={this.handleClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        ref={this.props.ref}
        style={icon ? { fontSize: 0 } : {}}
      >
        {this.props.children}
      </Tag>
    )
  }
}

Button.defaultProps = {
  size: 'regular',
  block: false,
  primary: false,
  secondary: false,
  outline: false,
  disabled: false,
  autoFocus: false,
  icon: false,
  type: 'button',
}

Button.propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Block style */
  block: PropTypes.bool,
  /** Primary style */
  primary: PropTypes.bool,
  /** Secondary style */
  secondary: PropTypes.bool,
  /** Outline style */
  outline: PropTypes.bool,
  /** If you are using just an Icon component inside, use this as true */
  icon: PropTypes.bool,
  /** (Button spec attribute) */
  id: PropTypes.string,
  /** (Button spec attribute) */
  autoFocus: PropTypes.bool,
  /** (Button spec attribute) */
  autoComplete: PropTypes.string,
  /** (Button spec attribute) */
  disabled: PropTypes.bool,
  /** (Button spec attribute) */
  name: PropTypes.string,
  /** (Button spec attribute) */
  type: PropTypes.string,
  /** (Button spec attribute) */
  value: PropTypes.string,
  /** Label of the Button */
  children: PropTypes.node.isRequired,
  /** onClick event */
  onClick: PropTypes.func,
  /** onMouseEnter event */
  onMouseEnter: PropTypes.func,
  /** onMouseLeave event */
  onMouseLeave: PropTypes.func,
  /** onMouseOver event */
  onMouseOver: PropTypes.func,
  /** onMouseOut event */
  onMouseOut: PropTypes.func,
  /** onMouseUp event */
  onMouseUp: PropTypes.func,
  /** onMouseDown event */
  onMouseDown: PropTypes.func,
  /** ref function */
  ref: PropTypes.func,
}

export default Button
