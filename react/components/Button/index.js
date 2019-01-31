import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

class Button extends Component {
  handleClick = event => {
    !this.props.disabled &&
      !this.props.isLoading &&
      this.props.onClick &&
      this.props.onClick(event)
  }

  componentDidMount() {
    if (this.props.icon) {
      console.warn(
        'Button: The prop "icon" of the "Button" component has been deprecated, and will be removed in a future version. Please use the component "ButtonWithIcon" instead'
      )
    }
  }

  render() {
    const {
      size,
      block,
      fullHeight,
      variation,
      icon,
      children,
      isLoading,
      collapseLeft,
      collapseRight,
    } = this.props

    const disabled = this.props.disabled || isLoading
    const iconOnly = icon || this.props.iconOnly

    let classes = 'vtex-button bw1 ba fw5 br2 v-mid relative pa0 '
    let labelClasses = 'flex items-center justify-center h-100 pv2 '
    let loaderSize = 15
    let horizontalPadding = 0

    switch (size) {
      case 'small':
        classes += 'min-h-small t-action--small '
        horizontalPadding = iconOnly ? 3 : 5
        break
      case 'large':
        classes += 'min-h-large t-action--large '
        horizontalPadding = iconOnly ? 5 : 7
        loaderSize = 25
        break
      default:
        classes += 'min-h-regular t-action '
        horizontalPadding = iconOnly ? 4 : 6
        loaderSize = 20
        break
    }

    labelClasses += `ph${horizontalPadding} `

    if (collapseLeft) {
      classes += `nl${horizontalPadding} `
    }
    if (collapseRight) {
      classes += `nr${horizontalPadding} `
    }

    if (iconOnly) {
      classes += 'icon-button dib '
    }

    switch (variation) {
      default:
      case 'primary': {
        if (disabled) {
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes +=
            'bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary '
        }
        break
      }
      case 'secondary': {
        if (disabled) {
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes +=
            'bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary '
        }
        break
      }
      case 'tertiary': {
        if (disabled) {
          classes += 'bg-transparent b--transparent c-disabled '
        } else {
          classes +=
            'bg-transparent b--transparent c-action-primary hover-b--transparent hover-bg-muted-5 '
        }
        break
      }
      case 'danger': {
        if (disabled) {
          classes += 'bg-disabled b--disabled c-on-disabled '
        } else {
          classes +=
            'bg-danger b--danger c-on-danger hover-bg-danger hover-b--danger hover-c-on-danger '
        }
        break
      }
      case 'danger-tertiary': {
        if (disabled) {
          classes += 'bg-transparent b--transparent c-disabled '
        } else {
          classes +=
            'bg-transparent b--transparent c-danger hover-b--transparent hover-bg-muted-5 '
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

    if (fullHeight) {
      classes += 'h-100 '
    }

    return (
      <button
        id={this.props.id}
        autoFocus={iconOnly ? undefined : this.props.autoFocus}
        disabled={iconOnly ? undefined : this.props.disabled}
        name={iconOnly ? undefined : this.props.name}
        type={iconOnly ? undefined : this.props.type}
        value={iconOnly ? undefined : this.props.value}
        tabIndex={0}
        className={classes}
        onClick={this.handleClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        ref={this.props.ref}
        style={iconOnly ? { fontSize: 0 } : {}}>
        {isLoading ? (
          <Fragment>
            <span className="top-0 left-0 w-100 h-100 absolute flex justify-center items-center">
              <Spinner
                secondary={variation === 'primary' || variation === 'danger'}
                size={loaderSize}
              />
            </span>
            <span className={`${labelClasses} o-0`}>{children}</span>
          </Fragment>
        ) : (
          <div className={labelClasses}>{children}</div>
        )}
      </button>
    )
  }
}

Button.defaultProps = {
  size: 'regular',
  block: false,
  fullHeight: false,
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
  variation: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'danger-tertiary',
  ]),
  /** Block style */
  block: PropTypes.bool,
  /** Height 100% */
  fullHeight: PropTypes.bool,
  /** Loading state */
  isLoading: PropTypes.bool,
  /** [DEPRECATED] If you are using just an Icon component inside, use this as true */
  icon: PropTypes.bool,
  /** @ignore For internal use
   * Sets reduced paddings in order to keep the button squareish if it
   * only has an icon  */
  iconOnly: PropTypes.bool,
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
  /** Cancels out left padding */
  collapseLeft: PropTypes.bool,
  /** Cancels out right padding */
  collapseRight: PropTypes.bool,
}

export default Button
