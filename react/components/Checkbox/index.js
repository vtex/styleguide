import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckIcon from '../icon/Check'

class Checkbox extends PureComponent {
  handleChange = e => !this.props.disabled && this.props.onChange(e)

  render() {
    const { checked, disabled, id, label, name, required, value } = this.props

    return (
      <div
        className={classNames('flex items-center relative', {
          pointer: !disabled,
        })}>
        <div
          className={classNames(
            'h1 w1 relative ba bw1 br1 flex justify-center items-center',
            {
              'b--muted-4 pointer': !checked && !disabled,
              'b--disabled bg-muted-5 c-disabled': !checked && disabled,
              'b--action-primary bg-action-primary': checked && !disabled,
              'b--disabled bg-disabled': checked && disabled,
              mr3: label,
            }
          )}
          style={{
            transition: 'background 20ms, border 100ms',
          }}
        />
        <div
          className="absolute w1 h1 flex o-100"
          style={{ left: 2, top: label ? -1.5 : -2 }}>
          <div
            className={`absolute top-0 left-0 bottom-0 overflow-hidden ${
              disabled ? 'c-on-disabled' : 'c-on-action-primary'
            }`}
            style={{
              right: checked ? 0 : '100%',
              transition: 'right 110ms ease-in-out 30ms',
            }}>
            <CheckIcon size={11} color="currentColor" />
          </div>
        </div>
        <input
          checked={checked}
          className={classNames('h1 w1 absolute o-0', {
            pointer: !disabled,
          })}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          onChange={this.handleChange}
          type="checkbox"
          value={value}
          tabIndex={0}
        />
        {label && (
          <label
            className={classNames(
              { 'c-disabled': disabled },
              { 'c-on-base pointer': !disabled }
            )}
            htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    )
  }
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
}

Checkbox.propTypes = {
  /** (Input spec attribute) */
  checked: PropTypes.bool,
  /** (Input spec attribute) */
  disabled: PropTypes.bool,
  /** (Input spec attribute) */
  id: PropTypes.string,
  /** Checkbox label */
  label: PropTypes.string,
  /** (Input spec attribute) */
  name: PropTypes.string.isRequired,
  /** onChange event */
  onChange: PropTypes.func.isRequired,
  /** (Input spec attribute) */
  required: PropTypes.bool,
  /** (Input spec attribute) */
  value: PropTypes.string.isRequired,
}

export default Checkbox
