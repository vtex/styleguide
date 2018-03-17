import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  render() {
    const {
      short,
      long,
      large,
      xLarge,
      block,
      value,
      placeholder,
      disabled,
      options,
    } = this.props
    const { open } = this.state

    let width
    let maxHeight
    let iconSize

    let classes = 'br2 bw1 bn w-100 '
    let containerClasses = 'br2 bw1 '
    let optionsClasses = 'absolute bl br bb bw1 br2 br--bottom bg-white flex-column z-max '
    let optionClasses = 'w-100 pointer flex bg-white hover-bg-near-white near-black tl bb-0 bl-0 br-0 bt b--near-white '

    if (block) width = '100%'

    if (large) {
      classes += 'f5 pv4 pl6 pr5 '
      optionClasses += 'f5 pv4 ph6 '
      maxHeight = '200px'
      iconSize = 18
      if (!block) {
        if (short) {
          width = '100px'
        } else if (long) {
          width = '420px'
        } else {
          width = '250px'
        }
      }
    } else if (xLarge) {
      classes += 'f4 pv5 pl7 pr6 '
      optionClasses += 'f4 pv5 ph7 '
      maxHeight = '260px'
      iconSize = 22
      if (!block) {
        if (short) {
          width = '150px'
        } else if (long) {
          width = '520px'
        } else {
          width = '320px'
        }
      }
    } else {
      classes += 'f6 pv3 pl5 pr4 '
      optionClasses += 'f6 pv3 ph5 '
      maxHeight = '150px'
      iconSize = 16
      if (!block) {
        if (short) {
          width = '70px'
        } else if (long) {
          width = '350px'
        } else {
          width = '200px'
        }
      }
    }

    const containerStyle = { width: width }
    const optionsStyle = { overflowY: 'auto', maxHeight: maxHeight, width: this.state.optionsWidth }

    if (disabled) {
      classes += 'bg-light-gray '
    } else {
      classes += 'bg-white '
    }

    if (open) {
      containerClasses += 'bl br bt pb1 b--silver br--top '
      optionsClasses += 'b--silver '
    } else {
      containerClasses += 'ba b--light-gray '
      optionsClasses += 'pointer b--light-gray'
      if (!disabled) {
        containerClasses += 'hover-b--silver '
      }
    }

    return (
      <div ref={this.setWrapperRef} className={block ? 'db' : 'dib'}>
        <div className={containerClasses} style={containerStyle}>
          <button
            disabled={disabled}
            ref={this.setSelectRef}
            onClick={this.handleClick}
            className={
              this.props.disabled
                ? `bg-light-gray ${classes}`
                : `pointer ${classes} ${value ? 'near-black' : 'gray'}`
            }
          >
            <div className="flex">
              <div className="flex-auto tl">
                {value || placeholder || '\xa0'}
              </div>
              <div className="flex-none flex items-center pl6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 24 24"
                >
                  <g fill={disabled ? '#969799' : '#368DF7'}>
                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>
        {open &&
          <div
            className={optionsClasses}
            style={optionsStyle}
          >
            {options.map(option => (
              <button
                key={option}
                className={optionClasses}
                onClick={e => this.handleOptionClick(e, option)}
              >
                {option}
              </button>
            ))}
          </div>}
      </div>
    )
  }
}

Dropdown.propTypes = {
  /** Size: Large style */
  large: PropTypes.bool,
  /** Size: xLarge style */
  xLarge: PropTypes.bool,
  /** Width: Short style */
  short: PropTypes.bool,
  /** Width: Long style */
  long: PropTypes.bool,
  /** Block style */
  block: PropTypes.bool,
  value: PropTypes.string,
  xLong: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
}

export default Dropdown
