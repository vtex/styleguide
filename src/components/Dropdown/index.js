import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
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
      value,
      placeholder,
      disabled,
      options,
      short,
      long,
      xLong,
    } = this.props
    const { open } = this.state

    let width
    if (short) {
      width = '60px'
    } else if (long) {
      width = '350px'
    } else {
      width = '200px'
    }

    const classes = 'pa3 br2 ba bw1 bg-white bn w-100 '
    let containerClasses = 'f6 br2 bw1 '
    let optionsClasses = 'absolute mw6 bl br bb bw1 br2 br--bottom bg-white flex-column z-max '

    const containerStyle = { width: width }
    const optionsStyle = { overflowY: 'auto', maxHeight: '140px', width: width }

    if (open) {
      containerClasses += 'b--silver br--top bl br bt '
      optionsClasses += 'b--silver '
      // optionsStyle['boxShadow'] = '0px 0px 4px 0px rgba( 0, 0, 0, .15)'
    } else {
      containerClasses += 'ba b--light-gray hover-b--silver'
      optionsClasses += 'pointer b--light-gray'
    }

    return (
      <div ref={this.setWrapperRef} className="dib">
        <div className={containerClasses} style={containerStyle}>
          <button
            disabled={disabled}
            ref={this.setSelectRef}
            onClick={this.handleClick}
            className={
              this.props.disabled
                ? `bg-white ${classes}`
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
                  width="16"
                  height="16"
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
                className="f6 pointer flex w-100 pa3 bg-white hover-bg-near-white near-black tl bb-0 bl-0 br-0 bt b--near-white"
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
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  short: PropTypes.bool,
  long: PropTypes.bool,
  xLong: PropTypes.bool,
}

export default Dropdown
