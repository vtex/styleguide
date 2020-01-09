import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SuccessIcon from '../icon/Success'
import FailureIcon from '../icon/Failure'
import WarningIcon from '../icon/Warning'
import CloseIcon from '../icon/Close'
import Button from '../Button'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class Alert extends Component {
  componentDidMount() {
    if (this.props.autoClose && this.props.onClose) {
      this.timeout = setTimeout(this.props.onClose, this.props.autoClose)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { type, onClose, action, forwardedRef } = this.props
    const innerVerticalPadding = 'pv3'
    let classes = 'ph5 pv4 br2 '
    let showIcon = false
    let Icon = 'div'
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
        className={`vtex-alert flex justify-between t-body c-on-base ${classes}`}>
        <div className="flex-ns flex-wrap flex-grow-1 items-start">
          <div
            className={`flex items-start flex-grow-1 ${innerVerticalPadding}`}>
            {showIcon && (
              <div className={color}>
                <Icon block color="currentColor" size={18} />
              </div>
            )}

            <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
              {this.props.children}
            </div>
          </div>

          {displayAction && (
            <div
              className={`flex flex-grow-1 justify-end ${innerVerticalPadding}`}>
              <div className="nt4-ns nb4">
                <Button variation="tertiary" onClick={handleActionClick}>
                  {action.label}
                </Button>
              </div>
            </div>
          )}
        </div>

        {onClose && (
          <div
            title="Close"
            className={`vtex-alert__close-icon pointer pv2 c-on-base ph3 ${innerVerticalPadding}`}
            onClick={onClose}
            tabIndex={0}>
            <CloseIcon block color="currentColor" size={16} />
          </div>
        )}
      </div>
    )
  }
}

Alert.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Style of the alert */
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
  /** Content of the alert */
  children: PropTypes.node.isRequired,
  /** If this function is defined, a close icon will appear and this function will be called when alert is closed. */
  onClose: PropTypes.func,
  /** Time in ms to auto close the alert */
  autoClose: PropTypes.number,
  /** If this object is defined, an action button will appear on the right side of the alert. */
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
  }),
}

export default withForwardedRef(Alert)
