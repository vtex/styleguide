import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    } = this.props
    const { active } = this.state

    const size = 'w-100'
    const box = 'pa3 ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'f6 near-black'
    let classes = `${size} ${box} ${border} ${typography} `

    const eBox = 'pa2 '
    const eBorder = 'bw3 br2 b--solid b--washed-red '
    const eTypography = 'f7 dark-gray '
    const eBackground = 'bg-washed-red '

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
        />
        {errorMessage &&
          <div className={`${eBox} ${eBorder} ${eTypography} ${eBackground}`}>
            {errorMessage}
          </div>}
      </div>
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
  /** If the input has an error, you can hightlight it */
  error: PropTypes.bool,
  /** If the input has an error, you can pass an error message */
  errorMessage: PropTypes.string,
}

export default Input
