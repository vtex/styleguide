import React, { FunctionComponent, Fragment, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classNames from 'classnames'

import Spinner from '../Spinner'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

const SIZE = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
}

const VARIATION = {
  PLAIN: 'plain',
  INVERTED: 'inverted',
  DANGER: 'danger',
}

const loaderSize = {
  [SIZE.SMALL]: 15,
  [SIZE.REGULAR]: 20,
  [SIZE.LARGE]: 25,
}

const propTypes = {
  /** Button size  */
  size: PropTypes.oneOf(Object.values(SIZE)),
  /** Button prominence variation */
  variation: PropTypes.oneOf(Object.values(VARIATION)),
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

type Props = InferProps<typeof propTypes>

const ButtonPlain: FunctionComponent<Props> = props => {
  const handleClick = (event: React.MouseEvent) => {
    !props.disabled && !props.isLoading && props.onClick && props.onClick(event)
  }

  useEffect(() => {
    if (props.icon) {
      console.warn(
        'Button: The prop "icon" of the "Button" component has been deprecated, and will be removed in a future version. Please use the component "ButtonWithIcon" instead'
      )
    }
  }, [props.icon])

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
  } = props

  const disabled = props.disabled || isLoading
  const iconOnly = icon || props.iconOnly
  const horizontalPadding = iconOnly ? 1 : 2
  const horizontalCompensation = `nr${horizontalPadding} nl${horizontalPadding} `

  const classes = classNames(
    'vtex-button bw1 ba fw5 v-mid relative pa0 br2 bn',
    horizontalCompensation,
    {
      't-action--small': size === SIZE.SMALL,
      't-action': size === SIZE.REGULAR,
      't-action--large': size === SIZE.LARGE,
    },
    { 'icon-button dib': iconOnly },
    {
      'bg-transparent b--transparent c-disabled': disabled,
      'bg-transparent b--transparent c-action-primary hover-b--transparent hover-bg-action-secondary hover-b--action-secondary':
        !disabled && variation === VARIATION.PLAIN,
      'bg-transparent b--transparent c-on-base--inverted':
        !disabled && variation === VARIATION.INVERTED,
      'bg-transparent b--transparent c-danger hover-bg-danger--faded hover-b--danger--faded':
        !disabled && variation === VARIATION.DANGER,
    },
    { pointer: !disabled },
    { 'inline-flex items-center no-underline': href }
  )

  const labelClasses = classNames(
    'flex items-center justify-center h-100 pv1 ttn ',
    `ph${horizontalPadding}`,
    { nowrap: noWrap }
  )

  const style: { fontSize?: number } = {}

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
      id={props.id}
      data-testid={props.testId}
      autoFocus={iconOnly ? undefined : props.autoFocus}
      disabled={iconOnly ? undefined : props.disabled}
      name={iconOnly ? undefined : props.name}
      value={iconOnly ? undefined : props.value}
      tabIndex={0}
      className={classes}
      href={href}
      onClick={handleClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      ref={props.forwardedRef}
      style={style}
      // Button-mode exclusive props
      type={href ? undefined : (props.type as 'button' | 'submit' | 'reset')}
      // Link-mode exclusive props
      {...(href && linkModeProps)}>
      {isLoading ? (
        <Fragment>
          <span className="top-0 left-0 w-100 h-100 absolute flex justify-center items-center">
            <Spinner
              secondary={variation === VARIATION.DANGER}
              size={loaderSize[size]}
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

ButtonPlain.defaultProps = {
  size: SIZE.REGULAR,
  variation: VARIATION.PLAIN,
  disabled: false,
  autoFocus: false,
  icon: false,
  type: 'button',
  isLoading: false,
}

ButtonPlain.propTypes = propTypes

export default withForwardedRef(ButtonPlain)
