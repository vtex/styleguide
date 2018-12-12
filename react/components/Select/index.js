import PropTypes from 'prop-types'
import React from 'react'
import ReactSelect from 'react-select'
import IconCaretDown from '../icon/CaretDown'
import IconCaretUp from '../icon/CaretUp'

const DropdownIndicator = ({ innerProps, selectProps }) => {
  return (
    <div className="pr4" {...innerProps}>
      {selectProps.menuIsOpen ? (
        <IconCaretUp color="#134cd8" size={8} />
      ) : (
        <IconCaretDown color="#134cd8" size={8} />
      )}
    </div>
  )
}

DropdownIndicator.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

const Placeholder = ({ innerProps, children }) => (
  <span className="ml2 c-muted-2" {...innerProps}>
    {children}
  </span>
)

Placeholder.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const Select = ({
  autoFocus,
  errorMessage,
  isMulti,
  label,
  onChange,
  options,
  value,
  placeholder,
  ...props
}) => (
  <div className="flex flex-column">
    <label>
      <span className="dib mb3 w-100 f6">
        <span>{label}</span>
      </span>
    </label>
    <ReactSelect
      autoFocus={autoFocus}
      className={`f6 ${errorMessage ? 'b--danger bw1' : ''}`}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
        Placeholder,
      }}
      isMulti={isMulti}
      onChange={onChange}
      options={options}
      styles={{
        control: style => {
          const errorStyle = errorMessage
            ? {
                borderColor: '#ff4c4c',
                borderWidth: '.125rem',
              }
            : {}
          return {
            ...style,
            ...errorStyle,
          }
        },
      }}
      placeholder={placeholder}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#cacbcc',
        },
      })}
      value={value}
      {...props}
    />
    {errorMessage && (
      <span className="c-danger f6 mt3 lh-title">{errorMessage}</span>
    )}
  </div>
)

Select.defaultProps = {
  isMulti: false,
  placeholder: 'Select...',
}

Select.propTypes = {
  /** Select auto focus */
  autoFocus: PropTypes.bool,
  /** Error message, e.g., validation error message. */
  errorMessage: PropTypes.string,
  /** If Select should be used as multi. */
  isMulti: PropTypes.bool,
  /** Label text. */
  label: PropTypes.string.isRequired,
  /** onChange handler: (option) => void */
  onChange: PropTypes.func.isRequired,
  /** Array of options. Options have the shape { label, value }. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Text that gets rendered for the option. */
      label: PropTypes.string.isRequired,
      /** Underlying value, e.g., an id. */
      value: PropTypes.string.isRequired,
    })
  ),
  /** Text for the select value.  */
  placeholder: PropTypes.string,
  /** Value of the select. */
  value: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  ]),
}

export default Select
