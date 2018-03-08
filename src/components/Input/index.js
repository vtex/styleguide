import React, { Component } from 'react'
import PropTypes from 'prop-types'

let warned = false

class Input extends Component {
  constructor(props) {
    super(props)

    if (!warned && props.htmlProps) {
      console.warn('Input prop `htmlProps` is deprecated.')
      warned = true
    }

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event.target.value)
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
      htmlProps,
    } = this.props
    const { active } = this.state

    const size = 'w-100'
    const box = 'pa3 ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'f6 near-black'
    const customClasses = htmlProps.class || ''
    let classes = `${size} ${box} ${border} ${typography} ${customClasses} `

    const eBox = 'pa2 '
    const eBorder = 'bw3 br2 b--solid b--washed-red '
    const eTypography = 'f7 dark-gray '
    const eBackground = 'bg-washed-red '
    const errorMessageClasses = `${eBox} ${eBorder} ${eTypography} ${eBackground}`

    if (active) {
      classes += 'b--dark-gray '
    } else {
      classes += 'b--light-gray '
    }

    if (error || errorMessage) {
      classes += 'b--red mb3 '
    }

    if (this.props.disabled) {
      classes += 'bg-light-gray bg-silver silver '
    } else {
      classes += 'bg-white '
    }

    return (
      <div>
        <input
          {...htmlProps}
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
          inputMode={this.props.inputMode}
          list={this.props.list}
          max={this.props.max}
          maxLength={this.props.maxLength}
          min={this.props.min}
          minLength={this.props.minLength}
          multiple={this.props.multiple}
          pattern={this.props.pattern}
          readOnly={this.props.readOnly}
          required={this.props.required}
          spellCheck={this.props.spellCheck}
          src={this.props.src}
          tabIndex={this.props.tabIndex}
          placeholder={htmlProps.placeholder || this.props.placeholder}
          name={htmlProps.name || this.props.name}
          type={htmlProps.type || this.props.type}
          step={htmlProps.step || this.props.step}
          value={htmlProps.value || this.props.value}
        />
        {errorMessage &&
          <div className={errorMessageClasses}>{errorMessage}</div>}
      </div>
    )
  }
}

Input.defaultProps = {
  disabled: false,
  htmlProps: {},
  errorMessage: '',
}

Input.propTypes = {
  /** (Input spec attribute) */
  id: PropTypes.string,
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
  autoFocus: PropTypes.string,
  /** (Input spec attribute) */
  autoSave: PropTypes.string,
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
  multiple: PropTypes.string,
  /** (Input spec attribute) */
  name: PropTypes.string,
  /** (Input spec attribute) */
  pattern: PropTypes.string,
  /** (Input spec attribute) */
  placeholder: PropTypes.string,
  /** (Input spec attribute) */
  readOnly: PropTypes.string,
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
  /** Deprecated */
  htmlProps: PropTypes.object,
  /** onChange event */
  onChange: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
  /** If the input has an error, you can hightlight it */
  error: PropTypes.bool,
  /** If the input has an error, you can pass an error message */
  errorMessage: PropTypes.string,
}

export default Input
