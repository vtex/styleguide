import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../Alert'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event)
  };

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  };

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  };

  render() {
    const {
      errorMessage,
      error,
      label,
      block,
      large,
      xLarge,
      short,
      long,
      helpText,
    } = this.props
    const { active } = this.state

    const size = 'w-100'
    const box = 'ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'near-black'
    let classes = `${size} ${box} ${border} ${typography} `

    if (active) {
      classes += 'b--gray '
    } else {
      classes += 'b--light-gray '
      if (!this.props.disabled) {
        classes += 'hover-b--silver '
      }
    }

    if (error || errorMessage) {
      classes += 'b--red hover-b--red '
    }

    if (this.props.disabled) {
      classes += 'bg-light-gray bg-light-silver b--light-silver silver '
    } else {
      classes += 'bg-white '
    }

    let width = '100%'

    if (large) {
      classes += 'f5 pv4 ph6 '
      // iconSize = 18
      if (!block) {
        if (short) {
          width = '130px'
        } else if (long) {
          width = '420px'
        } else {
          width = '250px'
        }
      }
    } else if (xLarge) {
      classes += 'f4 pv5 ph7 '
      // iconSize = 22
      if (!block) {
        if (short) {
          width = '180px'
        } else if (long) {
          width = '520px'
        } else {
          width = '320px'
        }
      }
    } else {
      classes += 'f6 pv3 ph5 '
      // iconSize = 16
      if (!block) {
        if (short) {
          width = '110px'
        } else if (long) {
          width = '350px'
        } else {
          width = '200px'
        }
      }
    }

    const style = { width: width }

    return (
      <label className="dib" style={style}>
        <span className={`db mb3 ${block ? 'w-100' : ''}`}>
          {label}
        </span>
        <input
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          className={classes}
          disabled={this.props.disabled}
          accept={this.props.accept}
          autoComplete={this.props.autoComplete}
          autoCorrect={this.props.autoCorrect}
          autoFocus={this.props.autoFocus}
          autoSave={this.props.autoSave}
          defaultValue={this.props.defaultValue}
          inputMode={this.props.inputMode}
          list={this.props.list}
          max={this.props.max}
          maxLength={this.props.maxLength}
          min={this.props.min}
          minLength={this.props.minLength}
          multiple={this.props.multiple}
          name={this.props.name}
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          required={this.props.required}
          spellCheck={this.props.spellCheck}
          src={this.props.src}
          step={this.props.step}
          tabIndex={this.props.tabIndex}
          type={this.props.type}
          value={this.props.value}
          id={this.props.id}
        />
        {errorMessage && <div className="red f6 mt3 lh-title">{errorMessage}</div>}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
      </label>
    )
  }
}

Input.defaultProps = {
  autoFocus: false,
  disabled: false,
  multiple: false,
  readOnly: false,
  error: false,
}

Input.propTypes = {
  /** (Input spec attribute) */
  id: PropTypes.string,
  /** Dropdown Label */
  label: PropTypes.string,
  /** (Input spec attribute) */
  type: PropTypes.string,
  /** (Input spec attribute) */
  accept: PropTypes.string,
  /** (Input spec attribute) */
  disabled: PropTypes.bool,
  /** (Input spec attribute) */
  autoComplete: PropTypes.string,
  /** (Input spec attribute) */
  autoCorrect: PropTypes.string,
  /** (Input spec attribute) */
  autoFocus: PropTypes.bool,
  /** (Input spec attribute) */
  autoSave: PropTypes.string,
  /** Block style */
  block: PropTypes.bool,
  /** (Input spec attribute) */
  defaultValue: PropTypes.string,
  /** (Input spec attribute) */
  inputMode: PropTypes.string,
  /** (Input spec attribute) */
  list: PropTypes.string,
  /** (Input spec attribute) */
  max: PropTypes.string,
  /** (Input spec attribute) */
  maxLength: PropTypes.string,
  /** (Input spec attribute) */
  min: PropTypes.string,
  /** (Input spec attribute) */
  minLength: PropTypes.string,
  /** (Input spec attribute) */
  multiple: PropTypes.bool,
  /** (Input spec attribute) */
  name: PropTypes.string,
  /** (Input spec attribute) */
  pattern: PropTypes.string,
  /** (Input spec attribute) */
  placeholder: PropTypes.string,
  /** (Input spec attribute) */
  readOnly: PropTypes.bool,
  /** (Input spec attribute) */
  required: PropTypes.string,
  /** (Input spec attribute) */
  spellCheck: PropTypes.string,
  /** (Input spec attribute) */
  src: PropTypes.string,
  /** (Input spec attribute) */
  step: PropTypes.string,
  /** (Input spec attribute) */
  tabIndex: PropTypes.string,
  /** (Input spec attribute) */
  value: PropTypes.string,
  /** onChange event */
  onChange: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
  /** If the input has an error, you can highlight it */
  error: PropTypes.bool,
  /** If the input has an error, you can pass an error message */
  errorMessage: PropTypes.string,
  /** Size: Large style */
  large: PropTypes.bool,
  /** Size: xLarge style */
  xLarge: PropTypes.bool,
  /** Width: Short style */
  short: PropTypes.bool,
  /** Width: Long style */
  long: PropTypes.bool,
  /** Help text */
  helpText: PropTypes.node,
}

export default Input
