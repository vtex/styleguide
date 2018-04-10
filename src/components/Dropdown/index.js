import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'
import config from 'vtex-tachyons/config.json'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      optionsWidth: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({ optionsWidth: this.wrapperRef.clientWidth })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  };

  setSelectRef = el => {
    this.select = el
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({ open: false }, () => {
        this.props.onClose && this.props.onClose(e)
      })
    }
  };

  handleClick = e => {
    const { onOpen, onClose } = this.props
    this.select && this.select.blur()
    this.setState({ open: !this.state.open }, () => {
      this.state.open ? onOpen && onOpen(e) : onClose && onClose(e)
    })
  };

  handleOptionClick = (e, option) => {
    const { disabled, onChange, onClose } = this.props

    !disabled && onChange && onChange(e, option)
    this.setState({ open: false }, () => {
      onClose && onClose(e)
    })
  };

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
      size,
      disabled,
      options,
      error,
      errorMessage,
      helpText,
    } = this.props
    const { open } = this.state

    let width
    let maxHeight
    let iconSize

    let classes = 'bg-transparent bn w-100 '
    let containerClasses = 'br2 bw1 '
    let optionsClasses = 'absolute bl br bb bw1 br2 br--bottom bg-white flex-column z-max overflow-y-auto '
    let optionClasses = 'w-100 pointer flex bg-white hover-bg-near-white near-black tl bb-0 bl-0 br-0 bt b--near-white '

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel

    classes += disabled ? 'bg-light-gray ' : 'pointer '
    classes += !disabled && valueLabel ? 'near-black ' : 'gray '

    switch (size) {
      case 'large':
        classes += 'f5 pv4 pl6 pr5 '
        optionClasses += 'f5 pv4 ph6 '
        maxHeight = '200px'
        iconSize = 18
        break
      case 'x-large':
        classes += 'f4 pv5 pl7 pr6 '
        optionClasses += 'f4 pv5 ph7 '
        maxHeight = '260px'
        iconSize = 22
        break
      default:
        classes += 'f6 pv3 pl5 pr4 '
        optionClasses += 'f6 pv3 ph5 '
        maxHeight = '150px'
        iconSize = 16
        break
    }

    const containerStyle = { width }
    const optionsStyle = {
      maxHeight: maxHeight,
      width: this.state.optionsWidth,
    }

    if (disabled) {
      containerClasses += 'bg-light-gray '
    } else {
      containerClasses += 'bg-white '
    }

    if (open) {
      containerClasses += 'bl br bt pb1 b--silver br--top '
      optionsClasses += 'b--silver '
    } else {
      if (error || errorMessage) {
        containerClasses += 'ba b--red hover-b--red '
      } else {
        containerClasses += 'ba b--light-gray '
      }
      optionsClasses += 'pointer b--light-gray'
      if (!disabled) {
        containerClasses += 'hover-b--silver '
      }
    }

    return (
      <div className="vtex-dropdown" ref={this.setWrapperRef}>
        <label>
          {label &&
            <span className="vtex-dropdown__span dib mb3 w-100">
              {label}
            </span>}
          <div className={containerClasses} style={containerStyle}>
            <button
              id={id}
              disabled={disabled}
              ref={this.setSelectRef}
              onClick={this.handleClick}
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
            </button>
          </div>
        </label>
        {open &&
          <div className={`vtex-dropdown__options ${optionsClasses}`} style={optionsStyle}>
            {options.map(option => (
              <button
                key={option.value}
                className={optionClasses}
                onClick={e => this.handleOptionClick(e, option)}
              >
                {option.label}
              </button>
            ))}
          </div>}
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
  value: PropTypes.string,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** onChange event */
  onChange: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
}

export default Dropdown
