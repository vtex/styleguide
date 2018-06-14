import React from 'react'
import PropTypes from 'prop-types'
import Radio from '../Radio'

class RadioGroup extends React.Component {
  handleContainerClick=event => {
    if (event.target.classList.contains('vtex-radio-group-item-container')) {
      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.querySelector('input').click()
    }
  }

  handleChange=event => {
    this.props.onChange(event, event.currentTarget.value)
  }

  render() {
    const { options, value, name } = this.props

    return (
      <div>
        {options.map((option, i) => {
          const isFirst = i === 0
          const isLast = i === options.length - 1
          return (
            <div
              className="vtex-radio-group-item-container pv2 ph3 ba b--light-gray br3 pointer"
              onClick={this.handleContainerClick}
              key={`${name}-${i}`}
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
                  id={`${name}-${i}`}
                  name={name}
                  onChange={this.handleChange}
                  label={option.label}
                  value={option.value}
                  checked={value === option.value}
                />
              </div>
            </div>
          )
        })}
      </div>)
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
  onChange: () => {},
  value: null,
}

export default RadioGroup
