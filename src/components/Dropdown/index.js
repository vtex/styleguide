import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'
import config from 'vtex-tachyons/config.json'

class Dropdown extends Component {
  setWrapperRef = node => {
    this.wrapperRef = node
  };

  setSelectRef = el => {
    this.select = el
  };

  handleChange = e => {
    const { disabled, onChange } = this.props
    const { target: { value } } = e

    !disabled && onChange && onChange(e, value)
  }

  getValueLabel() {
    const option = this.props.options.find(
      option => option.value === this.props.value
    )
    if (!option) return null
    return option.label
  }

  render() {
    const {
      label,
      id,
      value,
      size,
      disabled,
      options,
      error,
      errorMessage,
      helpText,
    } = this.props

    let width
    let maxHeight
    let iconSize

    let classes = 'bg-transparent bn w-100 '
    let containerClasses = 'br2 bw1 relative '
    let selectClasses = 'o-0 absolute top-0 left-0 w-100 bottom-0 '
    const optionsClasses = 'absolute bl br bb bw1 br2 br--bottom bg-white flex-column z-max overflow-y-auto '
    let optionClasses = 'w-100 pointer flex bg-white hover-bg-near-white near-black tl bb-0 bl-0 br-0 bt b--near-white '

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel

    classes += disabled ? 'bg-light-gray ' : 'pointer '
    classes += !disabled && valueLabel ? 'near-black ' : 'gray '

    switch (size) {
      case 'large':
        classes += 'f5 pv4 pl6 pr5 '
        selectClasses += 'f5 '
        optionClasses += 'f5 pv4 ph6 '
        maxHeight = '200px'
        iconSize = 18
        break
      case 'x-large':
        classes += 'f4 pv5 pl7 pr6 '
        selectClasses += 'f4 '
        optionClasses += 'f4 pv5 ph7 '
        maxHeight = '260px'
        iconSize = 22
        break
      default:
        classes += 'f6 pv3 pl5 pr4 '
        optionClasses += 'f6 pv3 ph5 '
        selectClasses += 'f6 '
        maxHeight = '150px'
        iconSize = 16
        break
    }

    const containerStyle = { width }

    if (disabled) {
      containerClasses += 'bg-light-gray '
    } else {
      containerClasses += 'bg-white '
    }

    return (
      <div className="vtex-dropdown" ref={this.setWrapperRef}>
        <label>
          {label &&
            <span className="vtex-dropdown__label dib mb3 w-100">
              {label}
            </span>}
          <div className={containerClasses} style={containerStyle}>
            <div
              id={id}
              ref={this.setSelectRef}
              className={`vtex-dropdown__button ${classes}`}
            >
              <div className="flex">
                <div className="vtex-dropdown__caption flex-auto tl">
                  {showCaption ? this.props.optionsCaption : valueLabel}
                </div>
                <div className="vtex-dropdown__arrow flex-none flex items-center pl6">
                  <ArrowDownIcon
                    size={iconSize}
                    color={
                      disabled ? config.colors['gray'] : config.colors.blue
                    }
                  />
                </div>
              </div>
            </div>

            <select
              disabled={disabled}
              className={selectClasses}
              onChange={this.handleChange}
              value={value}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

          </div>
        </label>
        {errorMessage &&
          <div className="red f6 mt3 lh-title">{errorMessage}</div>}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}

      </div>
    )
  }
}

Dropdown.defaultProps = {
  size: 'regular',
}

Dropdown.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** Help text */
  helpText: PropTypes.node,
  /** Dropdown label */
  label: PropTypes.string,
  /** Dropdown size */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Dropdown options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** Dropdown placeholder value */
  optionsCaption: PropTypes.string,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  autofocus: PropTypes.bool,
  /** Spec attribute */
  value: PropTypes.string,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  form: PropTypes.string,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  required: PropTypes.bool,
  /** onChange event */
  onChange: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
}

export default Dropdown
