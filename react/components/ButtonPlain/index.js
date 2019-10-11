import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class ButtonPlain extends Component {
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
      variation,
      children,
      icon,
      isLoading,
      href,
      target,
      rel,
      referrerPolicy,
      download,
      noWrap,
    } = this.props

    const disabled = this.props.disabled || isLoading
    const iconOnly = icon || this.props.iconOnly
    const horizontalPadding = iconOnly ? 1 : 2
    const horizontalCompensation = `nr${horizontalPadding} nl${horizontalPadding} `

    let classes = 'vtex-button bw1 ba fw5 v-mid relative pa0 br2 bn '
    let labelClasses = 'flex items-center justify-center h-100 pv1 ttn '
    let loaderSize = 15

    classes += horizontalCompensation
    labelClasses += `ph${horizontalPadding} `

    switch (size) {
      case 'small':
        classes += 't-action--small '
        break
      case 'large':
        classes += 't-action--large '
        loaderSize = 25
        break
      default:
        classes += 't-action '
        loaderSize = 20
        break
    }

    if (noWrap) {
      labelClasses += 'nowrap '
    }

    if (iconOnly) {
      classes += 'icon-button dib '
    }

    switch (variation) {
      default:
      case 'plain': {
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
      case 'inverted': {
        if (disabled) {
          classes += 'bg-transparent b--transparent c-disabled '
        } else {
          classes += 'bg-transparent b--transparent c-on-base--inverted '
        }
        break
      }
      case 'danger': {
        if (disabled) {
          classes += 'bg-transparent b--transparent c-disabled '
        } else {
          classes +=
            'bg-transparent b--transparent c-danger hover-bg-danger--faded hover-b--danger--faded '
        }
        break
      }
    }

    if (!disabled) {
      classes += 'pointer '
    }

    if (href) {
      classes += 'inline-flex items-center no-underline '
    }

    const style = {}

    if (iconOnly) {
      style.fontSize = 0
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
      </Element>
    )
  }
}

ButtonPlain.defaultProps = {
  size: 'regular',
  variation: 'plain',
  disabled: false,
  autoFocus: false,
  icon: false,
  type: 'button',
  isLoading: false,
}

ButtonPlain.propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Button prominence variation */
  variation: PropTypes.oneOf(['plain', 'inverted', 'danger']),
  /** [DEPRECATED] If you are using just an Icon component inside, use this as true */
  icon: PropTypes.bool,
  /** Loading state */
  isLoading: PropTypes.bool,
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
  /** Link spec */
  target: PropTypes.string,
  /** Link spec */
  rel: PropTypes.string,
  /** Link spec */
  referrerPolicy: PropTypes.string,
  /** Link spec */
  download: PropTypes.string,
  /** Disables label wrapping */
  noWrap: PropTypes.bool,
}

export default withForwardedRef(ButtonPlain)
