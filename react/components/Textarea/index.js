import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Textarea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  static CharacterCountdown = props => {
    let classes = 't-small mt2 lh-title '
    if (props.value <= 10) {
      classes += 'c-danger'
    } else {
      classes += 'c-muted-1'
    }
    return (
      <div className={classes}>
        {props.value} {props.text}
      </div>
    )
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
      maxLength,
      resize,
      size,
    } = this.props
    const { active } = this.state

    const dataAttrs = {}
    for (const key of Object.keys(dataAttributes)) {
      dataAttrs[`data-${key}`] = dataAttributes[key]
    }

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'c-on-base t-small'
    const padding = 'pv3 ph5'

    let classes = `${widthClass} ${box} ${padding} ${border} ${typography} `
    let labelClasses = `vtex-textarea__label db mb3 w-100 `

    if (active) {
      classes += 'b--muted-2 '
    } else if (!error && !errorMessage) {
      classes += 'b--muted-4 '
      if (!this.props.disabled) {
        classes += 'hover-b--muted-3 '
      }
    }

    if (error || errorMessage) {
      classes += 'b--danger hover-b--danger '
    }

    if (this.props.disabled) {
      classes += 'bg-disabled b--disabled c-disabled '
    } else {
      classes += 'bg-base '
    }

    switch (size) {
      case 'small':
        classes += 't-small '
        labelClasses += 't-small '
        break

      case 'large':
        classes += 't-body '
        labelClasses += 't-body '
        break

      default:
        classes += 't-body '
        labelClasses += 't-body '
        break
    }

    return (
      <label className="vtex-textarea">
        {label && <span className={labelClasses}>{label}</span>}
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
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          style={{ resize, WebkitAppearance: 'none' }}>
          {children}
        </textarea>

        <div className="flex justify-between">
          <div>
            {errorMessage && (
              <div className="c-danger t-small mt2 lh-title">
                {errorMessage}
              </div>
            )}
            {helpText && (
              <div className="c-muted-1 t-small mt2 lh-title">{helpText}</div>
            )}
          </div>
          {maxLength && (
            <Textarea.CharacterCountdown
              value={this.props.maxLength - this.props.value.length}
              text={this.props.characterCountdownText}
            />
          )}
        </div>
      </label>
    )
  }
}

Textarea.defaultProps = {
  autoFocus: false,
  dataAttributes: {},
  disabled: false,
  label: '',
  readOnly: false,
  resize: 'both',
  size: 'regular',
  error: false,
  characterCountdownText: 'characters left',
  rows: 5,
}

Textarea.propTypes = {
  /** Content of the textarea */
  children: PropTypes.string,
  /* Size of the textarea */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Controlled content of the textarea */
  value: PropTypes.string,
  /** Default content of the textarea */
  defaultValue: PropTypes.string,
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** Help text */
  helpText: PropTypes.node,
  /** Label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Spec attribute */
  autoComplete: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** If defined, the textarea will have a character countdown at the bottom right */
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
  /** Controls if Textarea is resizable and the resize direction. */
  resize: PropTypes.oneOf(['both', 'horizontal', 'none', 'vertical']),
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
  /** Helper text for character countdown (X characters left) */
  characterCountdownText: PropTypes.string,
}

export default Textarea
