import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Radio from '../Radio'

class RadioGroup extends React.Component {
  handleChange = event => {
    this.props.onChange(event)
  }

  render() {
    const {
      options,
      value,
      name,
      disabled,
      hideBorder,
      label,
      testId,
      size,
    } = this.props

    const large = size === 'large'

    return (
      <div>
        <fieldset className="vtex-input w-100 bn pa0 m0" data-testid={testId}>
          {label && (
            <legend className="dt" style={{ padding: '0.01em 0 0 0' }}>
              <span
                className={classNames(
                  'vtex-input__label db mb3 w-100 c-on-base',
                  { 't-body': large, 't-small': !large }
                )}>
                {label}
              </span>
            </legend>
          )}
          {options.map((option, i) => {
            const isFirst = i === 0
            const isLast = i === options.length - 1
            const isDisabled = disabled || option.disabled
            const id = `${name}-${i}`
            return (
              <label
                className={`db br3 ${classNames({
                  'b--muted-4 ba pv2 ph4': !hideBorder,
                  pointer: !isDisabled,
                })}`}
                key={id}
                style={{
                  ...(!isFirst && {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderTop: 'none',
                  }),
                  ...(!isLast && {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }),
                }}>
                <div className={classNames({ mt3: !hideBorder })}>
                  <Radio
                    id={id}
                    isLast={isLast}
                    name={name}
                    disabled={isDisabled}
                    onChange={this.handleChange}
                    label={option.label}
                    value={option.value}
                    checked={value === option.value}
                  />
                </div>
              </label>
            )
          })}
        </fieldset>
      </div>
    )
  }
}

RadioGroup.propTypes = {
  /** Options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.node.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Name attribute for the radio inputs, which will also be used to generate ids */
  name: PropTypes.string.isRequired,
  /** Current selected value */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** onChange event handler */
  onChange: PropTypes.func.isRequired,
  /** Disable the entire group */
  disabled: PropTypes.bool,
  /** Hide group border */
  hideBorder: PropTypes.bool,
  /** Label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Data attribute */
  testId: PropTypes.string,
  /** Input size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
}

RadioGroup.defaultProps = {
  disabled: false,
  hideBorder: false,
}

export default RadioGroup
