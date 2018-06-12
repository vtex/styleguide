import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Radio extends PureComponent {
  constructor(props) {
    super(props)
    this.radio = React.createRef()
    this.container = React.createRef()
  }

  handleContainerClick = e => {
    const { disabled } = this.props
    if (!disabled && e.target === this.container.current) {
      this.radio.current.click()
    }
  }

  render() {
    const {
      checked,
      disabled,
      id,
      label,
      name,
      onChange,
      required,
      value,
    } = this.props

    return (
      <div
        className={classNames('flex items-center mb3 relative', {
          pointer: !disabled,
        })}
        ref={this.container}
        onClick={this.handleContainerClick}
      >
        <div
          className={classNames(
            'fake-radio relative ba br-100 mr3 flex justify-center items-center',
            {
              'b--light-gray pointer': !disabled,
              'b--light-silver bg-near-white': disabled,
            },
          )}
          style={{
            borderWidth: '3px',
            height: '1.5rem',
            width: '1.5rem',
          }}
        >
          <div
            className={classNames('br-100', {
              'bg-blue': !disabled,
              'bg-silver': disabled,
            })}
            style={{
              height: '0.75rem',
              width: '0.75rem',
              transform: `scale(${checked ? 1 : 0})`,
              transition: 'transform 80ms',
            }}
          />
        </div>
        <input
          checked={checked}
          className={classNames('absolute o-0', {
            pointer: !disabled,
          })}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
          style={{
            height: '1.5rem',
            width: '1.5rem',
          }}
          ref={this.radio}
        />
        <label
          className={classNames({ silver: disabled }, { pointer: !disabled }, 'flex flex-auto')}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    )
  }
}

Radio.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
}

Radio.propTypes = {
  /** (Button spec attribute) */
  checked: PropTypes.bool,
  /** (Button spec attribute) */
  disabled: PropTypes.bool,
  /** (Button spec attribute) */
  id: PropTypes.string.isRequired,
  /** Radio label */
  label: PropTypes.node.isRequired,
  /** (Button spec attribute) */
  name: PropTypes.string.isRequired,
  /** onChange event */
  onChange: PropTypes.func.isRequired,
  /** (Button spec attribute) */
  required: PropTypes.bool,
  /** (Button spec attribute) */
  value: PropTypes.string.isRequired,
}

export default Radio
