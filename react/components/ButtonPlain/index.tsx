/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Fragment,
  useEffect,
  MutableRefObject,
  ReactNode,
  FC,
  useRef,
  MouseEventHandler,
  FocusEventHandler,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Spinner from '../Spinner'
import { withForwardedRef } from '../../modules/withForwardedRef'
import mergeRef from '../../utilities/mergeRef'

interface Props {
  children: ReactNode
  size?: 'small' | 'regular' | 'large'
  variation?: 'plain' | 'inverted' | 'danger'
  icon?: boolean
  isLoading?: boolean
  iconOnly?: boolean
  id?: string
  testId?: string
  autoFocus?: boolean
  autoComplete?: string
  disabled?: boolean
  forwardedRef?: MutableRefObject<HTMLElement & HTMLButtonElement>
  name?: string
  value?: string
  type?: 'button' | 'submit' | 'reset'
  /* events */
  onClick?: MouseEventHandler
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  onMouseUp?: MouseEventHandler
  onMouseDown?: MouseEventHandler
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
  /** URL for link mode. Converts the button internally to a link. */
  href?: string
  target?: string
  rel?: string
  referrerPolicy?: string
  download?: string
  noWrap?: boolean
}

const ButtonPlain: FC<Props> = props => {
  const innerRef = useRef<any>()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    !props.disabled && !props.isLoading && props.onClick && props.onClick(event)
  }

  useEffect(() => {
    if (props.icon) {
      console.warn(
        'Button: The prop "icon" of the "Button" component has been deprecated, and will be removed in a future version. Please use the component "ButtonWithIcon" instead'
      )
    }
  }, [props.icon])

  useEffect(
    function handleAutofocus() {
      if (props.autoFocus && innerRef.current && !props.iconOnly) {
        innerRef?.current.setFocus()
      }
    },
    [props.iconOnly, props.autoFocus]
  )

  const {
    size = 'regular',
    variation = 'plain',
    type = 'button',
    children,
    icon = false,
    isLoading,
    href,
    target,
    rel,
    referrerPolicy,
    download,
    noWrap,
  } = props

  const disabled = props.disabled ?? isLoading
  const iconOnly = icon ?? props.iconOnly
  const horizontalPadding = iconOnly ? 1 : 2
  const horizontalCompensation = `nr${horizontalPadding} nl${horizontalPadding} `

  const classes = classNames(
    'vtex-button bw1 ba fw5 v-mid relative pa0 br2 bn',
    horizontalCompensation,
    {
      't-action--small': size === 'small',
      't-action': size === 'regular',
      't-action--large': size === 'large',
    },
    { 'icon-button dib': iconOnly },
    {
      'bg-transparent b--transparent c-disabled': disabled,
      'bg-transparent b--transparent c-action-primary hover-b--transparent hover-bg-action-secondary hover-b--action-secondary':
        !disabled && variation === 'plain',
      'bg-transparent b--transparent c-on-base--inverted':
        !disabled && variation === 'inverted',
      'bg-transparent b--transparent c-danger hover-bg-danger--faded hover-b--danger--faded':
        !disabled && variation === 'danger',
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
      ref={mergeRef(innerRef, props.forwardedRef)}
      style={style}
      type={href ? undefined : type}
      {...(href && linkModeProps)}
    >
      {isLoading ? (
        <Fragment>
          <span className="top-0 left-0 w-100 h-100 absolute flex justify-center items-center">
            <Spinner
              size={
                {
                  small: 15,
                  regular: 20,
                  large: 25,
                }[size]
              }
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
  forwardedRef: PropTypes.any,
  /** (Button spec attribute) */
  name: PropTypes.string,
  /** (Button spec attribute) */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
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
