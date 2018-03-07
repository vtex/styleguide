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
    return (
      <svg width='10' height='6' viewBox='-2.5 -5 75 60' preserveAspectRatio='none'>
        <path d='M0,0 l35,50 l35,-50' fill='none' stroke='#368DF7' stroke-width='8' />
      </svg>
    )
  }

  renderMenu = () => {
    const { options } = this.props

    return (
      options.map(option => {
        return (
          <button 
            className='flex w-100 right bn pa3 hover-bg-light-silver near-black'
            onClick={() => this.handleOptionClick(option)}>
            {option}
          </button>
        )
      })
    )
  }

  render() {
    const { placeholder } = this.props
    const { selectedValue, menuOpen } = this.state
    const value = selectedValue ? selectedValue : placeholder
    const buttonAttr = 'w-100 ba bw1 br2 bg-white b--light-silver'

    return (
      <div ref={this.setWrapperRef}>
        { !menuOpen &&
          <button
            id={'select'}
            className={`${buttonAttr} mid-gray hover-bg-light-silver hover-blue`}
            onClick={this.handleClick}
            style={{outline: 'none'}}>
            <div className='flex items-center justify-between pa3'>
              { value }
              { !menuOpen && this.renderArrow() }
            </div>
          </button>
        }
        { menuOpen && 
          (
            <div 
              className={`${buttonAttr} near-black flex-column`} 
              style={{'overflowY': 'scroll', 'height': '100px'}}> 
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
