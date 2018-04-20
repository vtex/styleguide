import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Textarea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event)
  }

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  }

  render() {
    const {
      errorMessage,
      error,
      label,
      helpText,
      dataAttributes,
      children,
    } = this.props
    const { active } = this.state

    const dataAttrs = {}
    for (const key of Object.keys(dataAttributes)) {
      dataAttrs[`data-${key}`] = dataAttributes[key]
    }

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'near-black'
    let classes = `${widthClass} ${box} ${border} ${typography} `

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

    return (
      <label className="vtex-textarea">
        {label && (
          <span className="vtex-textarea__label db mb3 w-100">{label}</span>
        )}
        <textarea
          {...dataAttrs}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          className={classes}
          autoComplete={this.props.autoComplete}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          maxLength={this.props.maxLength}
          minLength={this.props.minLength}
          name={this.props.name}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          required={this.props.required}
          spellCheck={this.props.spellCheck}
          id={this.props.id}
          rows={this.props.rows}
          defaultValue={children}
        />

        {errorMessage && (
          <div className="red f6 mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
      </label>
    )
  }
}

Textarea.defaultProps = {
  children: '',
  autoFocus: false,
  dataAttributes: {},
  disabled: false,
  label: '',
  readOnly: false,
  error: false,
  rows: 5,
}

Textarea.propTypes = {
  /** Content of the textarea */
  children: PropTypes.string,
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** Help text */
  helpText: PropTypes.node,
  /** Label */
  label: PropTypes.string,
  /** Spec attribute */
  autoComplete: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  maxLength: PropTypes.string,
  /** Spec attribute */
  minLength: PropTypes.string,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  placeholder: PropTypes.string,
  /** Spec attribute */
  readOnly: PropTypes.bool,
  /** Spec attribute */
  required: PropTypes.string,
  /** Spec attribute */
  rows: PropTypes.number,
  /** Spec attribute */
  spellCheck: PropTypes.string,
  /** Spec attribute */
  wrap: PropTypes.string,
  /** List of data attributes as a object like `{'locale': 'en-US'}` */
  dataAttributes: PropTypes.object,
  /** onChange event */
  onChange: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
}

export default Textarea
