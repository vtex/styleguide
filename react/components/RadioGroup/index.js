import React from 'react'
import PropTypes from 'prop-types'
import Radio from '../Radio'

class RadioGroup extends React.Component {
  handleChange = event => {
    this.props.onChange(event, event.currentTarget.value)
  }

  render() {
    const { options, value, name } = this.props

    return (
      <div>
        {options.map((option, i) => {
          const isFirst = i === 0
          const isLast = i === options.length - 1
          const id = `${name}-${i}`
          return (
            <label
              className="db pv2 ph3 ba b--light-gray br3 pointer"
              htmlFor={id}
              key={id}
              style={{
                ...(!isFirst &&
                  {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderTop: 'none',
                  }
                ),
                ...(!isLast &&
                  {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                ),
              }}>
              <div className="mt3">
                <Radio
                  id={id}
                  name={name}
                  onChange={this.handleChange}
                  label={option.label}
                  value={option.value}
                  checked={value === option.value}
                />
              </div>
            </label>
          )
        })}
      </div>)
  }
}

RadioGroup.propTypes = {
  /** Options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  /** Name attribute for the radio inputs, which will also be used to generate ids */
  name: PropTypes.string.isRequired,
  /** Current selected value */
  value: PropTypes.string,
  /** onChange event handler */
  onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
  onChange: () => {},
  value: null,
}

export default RadioGroup
