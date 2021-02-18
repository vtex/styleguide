import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Selector from './Selector'

const UP_EVENTS = ['mouseup', 'pointerup', 'touchend']

const MOVE_EVENT_MAP = {
  mousedown: 'mousemove',
  touchstart: 'touchmove',
  pointerdown: 'pointermove',
}

/**
 * Round the value to the nearest step multiple
 */
function quantize(value, step) {
  const numSteps = Math.round(value / step)
  const quantizedVal = numSteps * step

  return quantizedVal
}

/**
 * Get the event pageX attribute, with support for mobile events
 */
function getPageX(evt) {
  if (evt.targetTouches && evt.targetTouches.length > 0) {
    return evt.targetTouches[0].pageX
  }

  return evt.pageX
}

/**
 * Check for the esc key event
 */
function isEscKeyEvent(evt) {
  return evt.key === 'Escape' || evt.keyCode === 27
}

export default class Slider extends Component {
  sliderRef = React.createRef()

  state = {
    dragging: null,
    translate: {
      left: 0,
      right: 0,
    },
    values: {
      left:
        this.props.defaultValues && this.props.defaultValues.length > 0
          ? this.props.defaultValues[0]
          : this.props.min,
      right:
        this.props.range &&
        this.props.defaultValues &&
        this.props.defaultValues.length >= 2
          ? this.props.defaultValues[1]
          : this.props.max,
    },
  }

  componentDidUpdate(prevProps) {
    if (prevProps.min !== this.props.min || prevProps.max !== this.props.max) {
      this.setState(
        {
          translate: {
            left: 0,
            right: 0,
          },
          values: {
            left: this.props.min,
            right: this.props.max,
          },
        },
        this.updateLayout
      )
    }

    const [prevLeftValue, prevRightValue] = prevProps.values || []
    const [leftValue, rightValue] = this.props.values || []

    if (prevLeftValue !== leftValue || prevRightValue !== rightValue) {
      this.setState(
        currentState => ({
          ...currentState,
          values: {
            left: leftValue,
            right: rightValue,
          },
        }),
        () => {
          this.updateLayout()
          this.props.onChange([this.state.values.left, this.state.values.right])
        }
      )
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateLayout)

    if (this.props.defaultValues && this.props.defaultValues.length > 0) {
      this.updateLayout()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateLayout)

    if (this.cancelDragEvent_) {
      this.cancelDragEvent_()
      this.cancelDragEvent_ = undefined
    }
  }

  updateLayout = () => {
    this.updatePositionForValue(this.state.values.left, 'left')
    this.updatePositionForValue(this.state.values.right, 'right')
  }

  getValueForPercent = (percentageComplete, position) => {
    const { min, max, step, range } = this.props

    const rawValue = min + percentageComplete * (max - min)

    let value

    if (rawValue !== min && rawValue !== max) {
      value = quantize(rawValue, step)
    } else {
      value = rawValue
    }

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    if (!range) {
      return value
    }

    if (position === 'left' && value >= this.state.values.right) {
      value = this.state.values.right - step
    } else if (position === 'right' && value <= this.state.values.left) {
      value = this.state.values.left + step
    }

    return value
  }

  getTranslateValueForInputValue = (value, position) => {
    const { max, min } = this.props
    const rect = this.sliderRef.current.getBoundingClientRect()
    const percentageComplete = (value - min) / (max - min)

    let translatePx = percentageComplete * rect.width

    if (position === 'right') {
      translatePx = rect.width - translatePx
    }

    return translatePx
  }

  handleSliderMouseDown = e => {
    const rect = this.sliderRef.current.getBoundingClientRect()
    const xPos = getPageX(e) - rect.left

    const leftPos = this.state.translate.left
    const rightPos = rect.width - this.state.translate.right

    let nearestPoint

    // Which one has a absolute value closer to 0
    if (
      !this.props.range ||
      Math.abs(leftPos - xPos) < Math.abs(rightPos - xPos)
    ) {
      nearestPoint = 'left'
    } else {
      nearestPoint = 'right'
    }

    this.handleDragStart(nearestPoint)(e)
  }

  handleDragStart = position => e => {
    e.stopPropagation()

    // allow only one handle to be dragged at a time
    if (this.props.disabled || this.state.dragging) {
      return
    }

    this.setState({
      dragging: position,
    })

    this.valuesBeforeDrag_ = this.state.values

    // https://reactjs.org/docs/events.html#event-pooling
    e.persist()

    const moveHandler = this.handleDrag(position)

    // The events bellow are attached to the body because we need
    // to support the dragging event *outside* of the slider bounds

    this.cancelDragEvent_ = () => {
      this.valuesBeforeDrag_ = undefined
      UP_EVENTS.forEach(evtName =>
        document.body.removeEventListener(evtName, handleUpEvent)
      )
      document.body.removeEventListener(MOVE_EVENT_MAP[e.type], moveHandler)
      document.body.removeEventListener('keydown', this.handleKeyDown)
    }

    const handleUpEvent = () => {
      this.cancelDragEvent_()
      this.handleDragEnd()
    }

    UP_EVENTS.forEach(evtName =>
      document.body.addEventListener(evtName, handleUpEvent)
    )
    document.body.addEventListener(MOVE_EVENT_MAP[e.type], moveHandler)
    document.body.addEventListener('keydown', this.handleKeyDown)

    this.updatePositionFromEvent(e, position)
  }

  updatePositionFromEvent = (e, position) => {
    const slider = this.sliderRef.current
    const rect = slider.getBoundingClientRect()

    const xPos = getPageX(e) - rect.left

    const percentageComplete = xPos / rect.width

    const value = this.getValueForPercent(percentageComplete, position)

    this.updatePositionForValue(value, position)
  }

  handleDrag = position => e => {
    e.preventDefault()
    this.updatePositionFromEvent(e, position)
  }

  updatePositionForValue = (value, position) => {
    const translatePx = this.getTranslateValueForInputValue(value, position)

    requestAnimationFrame(() => {
      this.setState(state => ({
        values: {
          ...state.values,
          [position]: value,
        },
        translate: {
          ...state.translate,
          [position]: translatePx,
        },
      }))
    })
  }

  handleDragEnd = () => {
    this.setState({
      dragging: null,
    })

    this.cancelDragEvent_ = undefined

    if (this.props.range) {
      this.props.onChange([this.state.values.left, this.state.values.right])
    } else {
      this.props.onChange([this.state.values.left])
    }
  }

  handleKeyDown = evt => {
    if (!isEscKeyEvent(evt) || !this.state.dragging) {
      return
    }

    this.setState({
      dragging: false,
      values: this.valuesBeforeDrag_,
    })

    this.cancelDragEvent_()
    this.cancelDragEvent = undefined

    this.updateLayout()
  }

  render() {
    const {
      disabled,
      alwaysShowCurrentValue,
      formatValue,
      range,
      handleIcon,
    } = this.props
    const { left, right } = this.state.translate

    const lastLeftValue = this.valuesBeforeDrag_
      ? this.valuesBeforeDrag_.left
      : this.state.values.left
    const lastRightValue = this.valuesBeforeDrag_
      ? this.valuesBeforeDrag_.right
      : this.state.values.right

    const sliderSelectionStyle = range
      ? { left, right }
      : { left: 0, width: left }

    return (
      <div className="vtex-slider-container">
        <div
          className="vtex-slider w-100 relative pointer"
          style={{
            height: 24,
            // since we can't include css with the components, the
            // prefixed attributes need to be included
            MozUserSelect: 'none',
            msUserSelect: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
          onMouseDown={this.handleSliderMouseDown}
          onTouchStart={this.handleSliderMouseDown}>
          <div
            ref={this.sliderRef}
            className="vtex-slider__base w-100 bg-muted-4 absolute br-pill overflow-hidden"
            style={{
              height: '0.25rem',
              top: '0.7rem',
            }}>
            <div
              className={classNames(
                'vtex-slider__base-internal absolute h-100',
                {
                  'bg-action-primary': !disabled,
                  'bg-muted-4': disabled,
                }
              )}
              style={sliderSelectionStyle}
            />
          </div>
          <Selector
            offset={left}
            onDragStart={this.handleDragStart}
            position="left"
            active={this.state.dragging === 'left'}
            displayPopup={alwaysShowCurrentValue}
            value={this.state.values.left}
            formatValue={formatValue}
            icon={handleIcon}
          />
          {range && (
            <Selector
              offset={right}
              onDragStart={this.handleDragStart}
              position="right"
              active={this.state.dragging === 'right'}
              displayPopup={alwaysShowCurrentValue}
              value={this.state.values.right}
              formatValue={formatValue}
              icon={handleIcon}
            />
          )}
        </div>

        <div className="vtex-slider__values-container flex justify-end">
          <label className="vtex-slider__left-value t-small c-muted-1">
            {formatValue(lastLeftValue)}
          </label>
          {range && (
            <label className="vtex-slider__right-value t-small c-muted-1">
              <span className="vtex-slider__dash mh2">&ndash;</span>
              {formatValue(lastRightValue)}
            </label>
          )}
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  min: 0,
  max: 10,
  step: 1,
  onChange: () => {},
  alwaysShowCurrentValue: false,
  formatValue: a => a,
  range: false,
  handleIcon: null,
}

Slider.propTypes = {
  /** Minimum supported value */
  min: PropTypes.number,
  /** Maximum supported value */
  max: PropTypes.number,
  /** onChange event */
  onChange: PropTypes.func,
  /** Step value */
  step: PropTypes.number,
  /** Whether the slider is disabled */
  disabled: PropTypes.bool,
  /** Initial values */
  defaultValues: PropTypes.arrayOf(PropTypes.number),
  /** Whether to always display current value as a popup */
  alwaysShowCurrentValue: PropTypes.bool,
  /** Function to customize the format of the value */
  formatValue: PropTypes.func,
  /** Whether to render as a range input */
  range: PropTypes.bool,
  /** Optional icon to show inside the slider handle */
  handleIcon: PropTypes.node,
  /** Current value: [left, right] */
  values: PropTypes.arrayOf(PropTypes.number),
}
