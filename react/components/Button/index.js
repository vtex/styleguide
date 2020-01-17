import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

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
    if (this.props.collapseLeft || this.props.collapseRight) {
      console.warn(
        'Button: The props "collapseLeft" and "collapseRight" of the "Button" component have been deprecated, and will be removed in a future version. Please use the component "ButtonPlain" instead'
      )
    }
  }

  render() {
    const {
      size,
      block,
      variation,
      icon,
      children,
      isLoading,
      collapseLeft,
      collapseRight,
      isGrouped,
      isActiveOfGroup,
      isFirstOfGroup,
      isLastOfGroup,
      href,
      target,
      rel,
      referrerPolicy,
      download,
      noUpperCase,
      noWrap,
    } = this.props

    const disabled = this.props.disabled || isLoading
    const iconOnly = icon || this.props.iconOnly

    const isTertiary =
      variation === 'tertiary' ||
      variation === 'inverted-tertiary' ||
      variation === 'danger-tertiary'

    let classes = 'vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid '
    let labelClasses =
      'vtex-button__label flex items-center justify-center h-100 '
    let loaderSize = 15
    let horizontalPadding = 0

    classes += !isGrouped ? 'br2 ' : ''
    classes += isFirstOfGroup ? 'br2 br--left ' : ''
    classes += isLastOfGroup ? 'br2 br--right ' : ''

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

    if (isTertiary && (collapseLeft || collapseRight)) {
      horizontalPadding = 2
    }

    labelClasses += `ph${horizontalPadding} `

    if (isTertiary && noUpperCase) {
      labelClasses += 'ttn '
    }

    if (collapseLeft && isTertiary) {
      labelClasses += `nl1 `
    }
    if (collapseRight && isTertiary) {
      labelClasses += `nr1 `
    }
    if (noWrap) {
      labelClasses += 'nowrap '
    }

    if (iconOnly) {
      classes += 'icon-button dib '
    }

    const primaryEnabledClasses =
      'bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary '
    const secondaryEnabledClasses =
      'bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary '

    if (isGrouped && !disabled) {
      classes += isActiveOfGroup
        ? primaryEnabledClasses
        : secondaryEnabledClasses
    } else {
      switch (variation) {
        default:
        case 'primary': {
          if (disabled) {
            classes += 'bg-disabled b--muted-5 c-on-disabled '
          } else {
            classes += primaryEnabledClasses
          }
          break
        }
        case 'secondary': {
          if (disabled) {
            classes += 'bg-disabled b--muted-5 c-on-disabled '
          } else {
            classes += secondaryEnabledClasses
          }
          break
        }
        case 'tertiary': {
          if (disabled) {
            classes += 'bg-transparent b--transparent c-disabled '
          } else {
            classes +=
              'bg-transparent b--transparent c-action-primary hover-b--transparent '
          }
          if (!disabled) {
            classes += 'hover-bg-action-secondary hover-b--action-secondary '
          }
          break
        }
        case 'inverted-tertiary': {
          if (disabled) {
            classes += 'bg-transparent b--transparent c-disabled '
          } else {
            classes += 'bg-transparent b--transparent c-on-base--inverted '
          }
          break
        }
        case 'danger': {
          if (disabled) {
            classes += 'bg-disabled b--muted-5 c-on-disabled '
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
              'bg-transparent b--transparent c-danger hover-bg-danger--faded hover-b--danger--faded '
          }
          break
        }
      }
    }

    if (!disabled) {
      classes += 'pointer '
    }

    if (block) {
      classes += 'w-100 '
      labelClasses += 'w-100 border-box '
    }

    if (href) {
      classes += 'inline-flex items-center no-underline '
    }

    const style = {}

    if (iconOnly) {
      style.fontSize = 0
    }

    // Active state receives the hover color of the Button.
    // No token available for this.
    if (isActiveOfGroup && !disabled) {
      style.backgroundColor = '#0c389f'
      style.borderColor = '#0c389f'
    }

    const linkModeProps = {
      target,
      rel,
      referrerPolicy,
      download,
    }

    const Element = href ? 'a' : 'button'

    return (
      <Element
        id={this.props.id}
        data-testid={this.props.testId}
        autoFocus={iconOnly ? undefined : this.props.autoFocus}
        disabled={iconOnly ? undefined : this.props.disabled}
        name={iconOnly ? undefined : this.props.name}
        value={iconOnly ? undefined : this.props.value}
        tabIndex={0}
        className={classes}
        href={href}
        onClick={this.handleClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        ref={this.props.forwardedRef}
        style={style}
        // Button-mode exclusive props
        type={href ? undefined : this.props.type}
        // Link-mode exclusive props
        {...(href && linkModeProps)}>
        {isLoading ? (
          <Fragment>
            <span className="vtex-button__spinner-container top-0 left-0 w-100 h-100 absolute flex justify-center items-center">
              <Spinner
                secondary={variation === 'primary' || variation === 'danger'}
                size={loaderSize}
              />
            </span>
            <span className={`${labelClasses} o-0`}>{children}</span>
          </Fragment>
        ) : (
          <div
            className={labelClasses}
            style={{
              paddingTop: '.25em',
              paddingBottom: '.32em',
            }}>
            {children}
          </div>
        )}
      </Element>
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
  isGrouped: false,
  isFirstOfGroup: false,
  isLastOfGroup: false,
  isActiveOfGroup: false,
}

Button.propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Button prominence variation */
  variation: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'inverted-tertiary',
    'danger',
    'danger-tertiary',
  ]),
  /** Block style */
  block: PropTypes.bool,
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
  /** Data attribute */
  testId: PropTypes.string,
  /** (Button spec attribute) */
  autoFocus: PropTypes.bool,
  /** (Button spec attribute) */
  autoComplete: PropTypes.string,
  /** (Button spec attribute) */
  disabled: PropTypes.bool,
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** (Button spec attribute) */
  name: PropTypes.string,
  /** (Button spec attribute) */
  type: PropTypes.string,
  /** (Button spec attribute) */
  value: PropTypes.string,
  /** Label of the Button */
  children: PropTypes.node.isRequired,
  /** onClick event. */
  onClick: PropTypes.func,
  /** URL for link mode. Converts the button internally to a link. */
  href: PropTypes.string,
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
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
  /** @ignore deprecated
   * Cancels out left padding */
  collapseLeft: PropTypes.bool,
  /** @ignore deprecated
   * Cancels out right padding */
  collapseRight: PropTypes.bool,
  /** */
  isGrouped: PropTypes.bool,
  /** */
  isFirstOfGroup: PropTypes.bool,
  /** */
  isLastOfGroup: PropTypes.bool,
  /** */
  isActiveOfGroup: PropTypes.bool,
  /** Link spec */
  target: PropTypes.string,
  /** Link spec */
  rel: PropTypes.string,
  /** Link spec */
  referrerPolicy: PropTypes.string,
  /** Link spec */
  download: PropTypes.string,
  /** When terciary, the upper case can be prevented */
  noUpperCase: PropTypes.bool,
  /** Disables label wrapping */
  noWrap: PropTypes.bool,
}

export default withForwardedRef(Button)
