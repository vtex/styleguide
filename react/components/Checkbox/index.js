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
        className={classNames('flex items-center mb3 relative', {
          pointer: !disabled,
        })}
      >
        <div
          className={classNames(
            'h1 w1 relative ba bw1 br1 mr3 flex justify-center items-center',
            {
              'b--light-gray pointer': !checked && !disabled,
              'b--light-gray bg-light-silver': !checked && disabled,
              'b--blue bg-blue': checked && !disabled,
              'b--silver bg-silver': checked && disabled,
            },
          )}
          style={{
            transition: 'background 50ms, border 200ms',
          }}
        />
        <div className="absolute w1 h1 flex o-100" style={{ left: '2px', top: -1 }}>
          <div className="absolute" style={{
            overflow: 'hidden',
            left: 0,
            right: checked ? 0 : '100%',
            top: 0,
            bottom: 0,
            transition: 'right 180ms ease-in-out 50ms',
          }}>
            <CheckIcon size={11} color={disabled ? 'gray' : 'white'} />
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
        />
        <label
          className={classNames(
            'near-black',
            { gray: disabled },
            { pointer: !disabled },
          )}
          htmlFor={id}
        >
          {label}
        </label>
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
  label: PropTypes.string.isRequired,
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
