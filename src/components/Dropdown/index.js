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

  handleClickOutside = e => {
    // TODO: fix
    // if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
    //   this.props.onClose && this.props.onClose(e)
    //   this.setState({ open: false })
    // }
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

  getButtonClass = () => {
    if (this.props.disabled) {
      return 'pa4 bn br2 bg-light-gray gray'
    }
    const textColor = this.state.selectedValue ? 'near-black' : 'gray'
    return `pa4 ba bw1 br2 ${textColor} bg-white b--near-white hover-bg-near-white hover-blue`
  };

  render() {
    const { value, placeholder, disabled, options } = this.props
    const { open } = this.state
    const optionsStyle = { overflowY: 'scroll', height: '120px' }
    if (open) {
      optionsStyle['boxShadow'] = '0px 0px 4px 0px rgba( 0, 0, 0, .15)'
    }

    return (
      <div ref={this.setWrapperRef}>
        <button
          disabled={disabled}
          ref={el => this.select = el}
          className={this.getButtonClass()}
          onClick={this.handleClick}
          style={{ outline: 'none', height: '44px' }}
        >
          <div className="flex justify-between">
            {value || placeholder}
            <div className="flex items-center pl6">
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
        {open &&
          <div
            className="absolute w-auto mw6 ba br2 b--near-white bg-white flex-column z-max"
            style={optionsStyle}
          >
            {options.map(option => (
              <button
                key={option}
                className="flex w-100 right pa4 hover-bg-near-white near-black tl"
                onClick={e => this.handleOptionClick(e, option)}
                style={{
                  height: '44px',
                  border: '0px',
                  borderBottom: '1px solid #F5F7FA',
                }}
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
}

export default Dropdown
