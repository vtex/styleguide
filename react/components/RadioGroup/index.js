import React from 'react'
import PropTypes from 'prop-types'
import Radio from '../Radio'
import classNames from 'classnames'

class RadioGroup extends React.Component {
  handleChange = event => {
    this.props.onChange(event)
  }

  render() {
    const { options, value, name, disabled } = this.props

    return (
      <div>
        {options.map((option, i) => {
          const isFirst = i === 0
          const isLast = i === options.length - 1
          const isDisabled = disabled || option.disabled
          const id = `${name}-${i}`
          return (
            <label
              className={`db pv2 ph4 ba b--muted-4 br3 ${classNames({
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
              <div className="mt3">
                <Radio
                  id={id}
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
}

RadioGroup.defaultProps = {
  disabled: false,
}

export default RadioGroup
