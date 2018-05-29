import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

class Button extends Component {
  handleClick = event => {
    !this.props.disabled && this.props.onClick && this.props.onClick(event)
  };

  render() {
    const {
      className,
      size,
      block,
      variation,
      disabled,
      icon,
      children,
      isLoading,
    } = this.props
    const Tag = icon ? 'div' : 'button'

    let classes = `${className} vtex-button bw1 ba fw5 ttu br2 fw4 v-mid relative `
    let loaderSize = 12

    classes += icon ? 'icon-button dib ' : ''

    switch (size) {
      case 'small':
        classes += icon ? 'pa3 ' : 'pv3 ph5 '
        classes += 'f6 '
        break
      default:
      case 'regular':
        classes += icon ? 'pa4 ' : 'pv4 ph6 '
        classes += 'f5 '
        loaderSize = 20
        break
      case 'large':
        classes += icon ? 'pa5 ' : 'pv5 ph7 '
        classes += 'f4 '
        loaderSize = 25
        break
    }

    switch (variation) {
      default:
      case 'primary': {
        if (disabled) {
          classes += 'bg-light-gray b--light-gray gray '
        } else {
          classes += 'bg-blue b--blue white hover-bg-heavy-blue hover-b--heavy-blue '
        }
        break
      }
      case 'secondary': {
        if (disabled) {
          classes += 'bg-light-silver silver b--light-silver '
        } else {
          classes += 'bg-washed-blue b--washed-blue blue hover-bg-light-blue hover-b--light-blue hover-heavy-blue '
        }
        break
      }
      case 'tertiary': {
        if (disabled) {
          classes += 'bg-transparent b--transparent silver '
        } else {
          classes += 'bg-transparent b--transparent blue hover-b--transparent hover-heavy-blue '
        }
        break
      }
    }

    if (!disabled) {
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
        {isLoading
          ? <React.Fragment>
            <span
              className="left-0 w-100 absolute flex justify-center items-baseline"
            >
              <Spinner
                secondary={variation === 'primary'}
                size={loaderSize}
              />
            </span>
            <span style={{ opacity: 0 }}>{children}</span>
          </React.Fragment>
          : children}
      </Tag>
    )
  }
}

Button.defaultProps = {
  size: 'regular',
  block: false,
  variation: 'primary',
  disabled: false,
  autoFocus: false,
  icon: false,
  type: 'button',
  isLoading: false,
  className: '',
}

Button.propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Button prominence variation */
  variation: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /** Block style */
  block: PropTypes.bool,
  /** Loading state */
  isLoading: PropTypes.bool,
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
  /** (Button spec attribute) */
  className: PropTypes.string,
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
