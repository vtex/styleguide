import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { REGULAR, LARGE, X_LARGE, SIZES } from '../../constants/size'

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
      size,
      long,
      short,
      token,
      helpText,
    } = this.props
    const { active } = this.state

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'near-black'
    let classes = `${widthClass} ${box} ${border} ${typography} `

    if (token) {
      classes += 'code '
    }

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

    switch (size) {
      case LARGE:
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
        break
      case X_LARGE:
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
        break
      default:
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
        break
    }

    const style = { width }

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
        {errorMessage &&
          <div className="red f6 mt3 lh-title">{errorMessage}</div>}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
      </label>
    )
  }
}

Input.defaultProps = {
  autoFocus: false,
  token: false,
  disabled: false,
  multiple: false,
  readOnly: false,
  error: false,
  size: REGULAR,
}

Input.propTypes = {
  /** Block style */
  block: PropTypes.bool,
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** If the input is an API Key, App Key or App Token */
  token: PropTypes.bool,
  /** Help text */
  helpText: PropTypes.node,
  /** Input Size */
  size: PropTypes.oneOf(SIZES),
  /** Long style */
  long: PropTypes.bool,
  /** Short style (width) */
  short: PropTypes.bool,
  /** Label */
  label: PropTypes.string,
  /** Spec attribute */
  accept: PropTypes.string,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  autoComplete: PropTypes.string,
  /** Spec attribute */
  autoCorrect: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  autoSave: PropTypes.string,
  /** Spec attribute */
  defaultValue: PropTypes.string,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  inputMode: PropTypes.string,
  /** Spec attribute */
  list: PropTypes.string,
  /** Spec attribute */
  max: PropTypes.string,
  /** Spec attribute */
  maxLength: PropTypes.string,
  /** Spec attribute */
  min: PropTypes.string,
  /** Spec attribute */
  minLength: PropTypes.string,
  /** Spec attribute */
  multiple: PropTypes.bool,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  pattern: PropTypes.string,
  /** Spec attribute */
  placeholder: PropTypes.string,
  /** Spec attribute */
  readOnly: PropTypes.bool,
  /** Spec attribute */
  required: PropTypes.string,
  /** Spec attribute */
  spellCheck: PropTypes.string,
  /** Spec attribute */
  src: PropTypes.string,
  /** Spec attribute */
  step: PropTypes.string,
  /** Spec attribute */
  tabIndex: PropTypes.string,
  /** Spec attribute */
  type: PropTypes.string,
  /** Spec attribute */
  value: PropTypes.string,
  /** onChange event */
  onChange: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
}

export default Input
