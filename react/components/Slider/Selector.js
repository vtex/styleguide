import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function Selector({
  className,
  style,
  onDragStart,
  position,
  active,
  disabled,
  value,
  displayPopup,
  formatValue,
}) {
  const containerClasses = classNames(
    'vtex-slider__selector-container absolute pointer',
    className,
    {
      'z-2': active,
      'z-1': !active,
    }
  )

  const dragCircleClasses = classNames(
    'vtex-slider__selector br-100 bg-action-primary flex justify-center items-center',
    {
      'bg-action-primary': active && !disabled,
    }
  )

  const popupClasses = classNames(
    'vtex-slider__selector-tooltip flex justify-center items-center relative ph3 pv2 br2 f6 ba',
    {
      'vtex-slider__tooltip--active bg-action-primary white b--action-primary': active,
      'bg-white b--silver gray': !active,
    }
  )

  return (
    <div
      className={containerClasses}
      onMouseDown={onDragStart(position)}
      onTouchStart={onDragStart(position)}
      style={{
        ...style,
        willChange: 'transform',
        top: 6.5,
      }}
    >
      {(active || displayPopup) && (
        <div className="absolute pb4" style={{ left: '50%', bottom: '100%' }}>
          <div className={popupClasses} style={{ left: '-50%' }}>
            {formatValue(value)}
          </div>
        </div>
      )}
      <div
        className={dragCircleClasses}
        style={{
          height: '0.6875rem',
          width: '0.6875rem',
          boxShadow: '-1px 1px 3px rgba(0, 0, 0, 0.15)',
        }}
      />
    </div>
  )
}

Selector.defaultProps = {
  active: false,
  disabled: false,
  value: 0,
  className: '',
  displayPopup: false,
}

Selector.propTypes = {
  /** CSS classes */
  className: PropTypes.string,
  /** Position of the selector */
  position: PropTypes.oneOf([
    'left',
    'right',
  ]).isRequired,
  /** Style */
  style: PropTypes.object,
  /** onDragStart event */
  onDragStart: PropTypes.func.isRequired,
  /** If the selector is active */
  active: PropTypes.bool,
  /** If the selector is disabled */
  disabled: PropTypes.bool,
  /** Current value of the selector */
  value: PropTypes.number,
  /** Whether the popup is displayed when inactive */
  displayPopup: PropTypes.bool,
  /** Function to format the value */
  formatValue: PropTypes.func.isRequired,
}
