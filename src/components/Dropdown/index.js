import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      selectedValue: undefined,
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({menuOpen: false})
    }
  }

  handleClick = () => {
    document.getElementById('select').blur()
    this.setState({menuOpen: !this.state.menuOpen})
  }

  handleOptionClick = (option) => {
    this.setState({menuOpen: false})
    this.setState({selectedValue: option})
  }

  handleChange = event => {
    !this.props.disabled && this.props.onChange && this.props.onChange(event)
  }

  renderArrow = () => {
    const color = this.props.disabled ? '#969799' : '#368DF7'
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <g class="nc-icon-wrapper" fill={color}>
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
        </g>
    </svg>
    )
  }

  renderMenu = () => {
    const { options } = this.props

    return (
      options.map(option => {
        return (
          <button 
            className='flex w-100 right pa4 hover-bg-near-white near-black'
            onClick={() => this.handleOptionClick(option)}
            style={{height: '44px', 'border': '0px', 'borderBottom': '1px solid #F5F7FA'}}>
            {option}
          </button>
        )
      })
    )
  }

  getButtonClass = () => {
    const { disabled } = this.props
    let className
    if (disabled) {
      className = 'pa4 w-100 bn br2 bg-light-gray gray'
    } else {
      const textColor = this.state.selectedValue ? 'near-black' : 'gray'
      className = `pa4 w-100 ba bw1 br2 ${textColor} bg-white b--near-white hover-bg-near-white hover-blue`
    }
    return className
  }

  render() {
    const { placeholder, disabled } = this.props
    const { selectedValue, menuOpen } = this.state
    const value = selectedValue ? selectedValue : placeholder
    const optionsStyle = {'overflowY': 'scroll', 'height': '120px'}
    if (menuOpen) {
      optionsStyle['boxShadow'] = '0px 0px 4px 0px rgba( 0, 0, 0, .15)'
    }
    return (
      <div ref={this.setWrapperRef}>
          <button
            disabled={disabled}
            id={'select'}
            className={this.getButtonClass()}
            onClick={this.handleClick}
            style={{outline: 'none', height: '44px'}}>
            <div className='flex items-center justify-between'>
              { value }
              { this.renderArrow() }
            </div>
          </button>
          { menuOpen && 
            (
              <div 
                className={'w-100 ba br2 b--near-white bg-white flex-column'}
                style={optionsStyle}> 
                  { this.renderMenu() }
              </div>
            )
          }
      </div>
    )
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
}

export default Dropdown
