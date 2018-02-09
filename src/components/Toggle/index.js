import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Toggle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked,
    }
  }

  handleCheck = () =>
    !this.props.disabled && this.setState({ checked: !this.state.checked })

  render() {
    const { semantic, disabled, id } = this.props

    const { checked } = this.state

    let classes = 'flex items-center relative h2 w3 ph1 br4 bg-animate '
    let circleClasses = 'absolute br-100 pa3 mh2 '

    // Background
    if (semantic) {
      if (!disabled && !checked) {
        classes += 'bg-red '
      }

      if (!disabled && checked) {
        classes += 'bg-green '
      }
     
    } else if (disabled) {
      classes += 'bg-near-white '
    } else {
       if (!checked) {
        classes += 'bg-gray '
      }

      if (checked) {
        classes += 'bg-blue '
      }
    }

    // Circle
    if (checked) {
      circleClasses += 'left-2 '
    } else {
      circleClasses += 'left-0 '
    }

    if (disabled) {
      circleClasses += 'bg-light-gray '
    } else {
      circleClasses += 'bg-white '
    }

    return (
      <label
        htmlFor={`toggle-${id}`}
        className="flex flex-row items-center pointer" 
        {...this.props.htmlProps}
      >
        {this.props.children}
        <div className={`${classes}`}>
          <div 
            style={{
              height: '1.5rem',
              width: '1.5rem',
              transition: 'all .2s ease-out',
              boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)'
            }}
            className={`${circleClasses}`}
          >
          </div>
        </div>
        <input
          id={`toggle-${id}`} 
          type="checkbox"
          className="o-0" 
          disabled={disabled}
          checked={this.state.checked}
          onClick={this.handleCheck}
        />
      </label>
    )
  }
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  htmlProps: {},
  primary: false,
  secondary: false,
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  htmlProps: PropTypes.object,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default Toggle
