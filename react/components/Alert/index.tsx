import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import SuccessIcon from '../icon/Success'
import FailureIcon from '../icon/Failure'
import WarningIcon from '../icon/Warning'
import CloseIcon from '../icon/Close'
import Button from '../Button'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

type AlertType = 'success' | 'error' | 'warning'

const propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Style of the alert */
  type: PropTypes.oneOf<AlertType>(['success', 'error', 'warning']).isRequired,
  /** Content of the alert */
  children: PropTypes.node.isRequired,
  /** If this function is defined, a close icon will appear and this function will be called when alert is closed. */
  onClose: PropTypes.func,
  /** Time in ms to auto close the alert */
  autoClose: PropTypes.number,
  /** Set focus to the first focusable element inside alert, which should be the "action" when available or the "close" button */
  focusOnOpen: PropTypes.bool,
  /** If this object is defined, an action button will appear on the right side of the alert. */
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
  }),
  /** Defines the title used for hover and accessibility feedback **/
  closeIconLabel: PropTypes.string,
}

export type AlertProps = PropTypes.InferProps<typeof propTypes>

const Alert: React.FunctionComponent<AlertProps> = ({
  type,
  onClose,
  action,
  forwardedRef,
  closeIconLabel = 'Close',
  autoClose,
  focusOnOpen,
  children,
}) => {
  const firstElementRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    if (autoClose && onClose) {
      timeout = setTimeout(onClose, autoClose)
    }

    if (focusOnOpen) {
      firstElementRef.current && firstElementRef.current.focus()
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [autoClose, focusOnOpen, onClose])

  const innerVerticalPadding = 'pv3'
  let classes = 'ph5 pv4 br2 '
  let showIcon = false
  let Icon: React.ElementType = 'div'
  let color = 'c-on-base'
  const handleActionClick = (action && action.onClick) || undefined
  const displayAction = action && action.onClick && action.label

  switch (type) {
    case 'success': {
      showIcon = true
      classes += 'bg-success--faded '
      Icon = SuccessIcon
      color = 'c-success'
      break
    }
    case 'error': {
      showIcon = true
      classes += 'bg-danger--faded '
      Icon = FailureIcon
      color = 'c-danger'
      break
    }
    default:
    case 'warning': {
      showIcon = true
      classes += 'bg-warning--faded '
      Icon = WarningIcon
      color = 'c-warning'
      break
    }
  }

  return (
    <div
      ref={forwardedRef}
      role="alert"
      className={`vtex-alert flex justify-between t-body c-on-base ${classes}`}>
      <div className="flex-ns flex-wrap flex-grow-1 items-start">
        <div className={`flex items-start flex-grow-1 ${innerVerticalPadding}`}>
          {showIcon && (
            <div className={color}>
              <Icon block color="currentColor" size={18} />
            </div>
          )}

          <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>{children}</div>
        </div>

        {displayAction && (
          <div
            className={`flex flex-grow-1 justify-end ${innerVerticalPadding}`}>
            <div className="nt4-ns nb4">
              <Button
                ref={firstElementRef}
                variation="tertiary"
                onClick={handleActionClick}>
                {action!.label}
              </Button>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <button
          className={`vtex-alert__close-icon pointer c-on-base ph3 bg-transparent bn ${innerVerticalPadding}`}
          ref={displayAction ? undefined : firstElementRef}
          onClick={onClose}
          tabIndex={0}>
          <CloseIcon
            title={closeIconLabel}
            block
            color="currentColor"
            size={16}
          />
        </button>
      )}
    </div>
  )
}

Alert.propTypes = propTypes

export default withForwardedRef(Alert) as React.FunctionComponent<AlertProps>
