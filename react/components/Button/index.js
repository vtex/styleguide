import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

class Button extends Component {
  handleClick = event => {
    !this.props.disabled && this.props.onClick && this.props.onClick(event)
  };

  render() {
    const {
      size,
      block,
      variation,
      disabled,
      icon,
      children,
      isLoading,
    } = this.props
    const Tag = icon ? 'div' : 'button'

    let classes = 'vtex-button bw1 ba fw5 ttu br2 fw4 v-mid relative '
    let loaderSize = 15

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
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes += 'bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary '
        }
        break
      }
      case 'secondary': {
        if (disabled) {
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes += 'bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary '
        }
        break
      }
      case 'tertiary': {
        if (disabled) {
          classes += 'bg-transparent b--transparent c-disabled '
        } else {
          classes += 'bg-transparent b--transparent c-action-primary hover-b--transparent hover-c-action-primary '
        }
        break
      }
      case 'danger': {
        if (disabled) {
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes += 'bg-danger b--danger c-on-danger hover-bg-danger hover-b--danger hover-c-on-danger '
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
                secondary={variation === 'primary' || variation === 'danger'}
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
}

Button.propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Button prominence variation */
  variation: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'danger']),
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
