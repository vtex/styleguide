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
      isLast,
      label,
      name,
      onChange,
      required,
      value,
    } = this.props

    return (
      <div
        className={classNames('flex items-start relative', {
          pointer: !disabled,
          mb3: !isLast,
        })}
        ref={this.container}
        onClick={this.handleContainerClick}>
        {/* This empty div is used so that the radio circle is not a direct child of
         * a flex element, and thus can set a fixed width. Otherwise, the width would
         * be used as flex-basis, and would not be set directly */}
        <div>
          <div
            className={classNames(
              'fake-radio relative ba br-100 mr3 flex justify-center items-center',
              {
                'b--muted-4 pointer': !disabled && !checked,
                'b--action-primary pointer': !disabled && checked,
                'b--muted-4 bg-muted-5': disabled,
              }
            )}
            style={{
              borderWidth: '3px',
              height: '1.25rem',
              width: '1.25rem',
              transition: 'border 100ms ease-in-out',
            }}>
            <div
              className={classNames('br-100', {
                'bg-action-primary': !disabled,
                'bg-muted-3': disabled,
              })}
              style={{
                height: '0.5rem',
                width: '0.5rem',
                transform: `scale(${checked ? 1 : 0})`,
                transition: `transform 80ms ${
                  checked ? 'ease-out' : 'ease-in'
                }`,
              }}
            />
          </div>
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
          style={{ wordBreak: 'break-word' }}
          className={classNames(
            { 'c-disabled': disabled },
            { 'c-on-base pointer': !disabled },
            'flex flex-auto'
          )}
          htmlFor={id}>
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
  isLast: false,
}

Radio.propTypes = {
  /** (Radio spec attribute) */
  checked: PropTypes.bool,
  /** (Radio spec attribute) */
  disabled: PropTypes.bool,
  /** (Radio spec attribute) */
  id: PropTypes.string.isRequired,
  /** (Radio spec attribute) */
  isLast: PropTypes.bool,
  /** Radio label */
  label: PropTypes.node.isRequired,
  /** (Radio spec attribute) */
  name: PropTypes.string.isRequired,
  /** onChange event */
  onChange: PropTypes.func.isRequired,
  /** (Radio spec attribute) */
  required: PropTypes.bool,
  /** (Radio spec attribute) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Radio
