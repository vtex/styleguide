import PropTypes from 'prop-types'
import React from 'react'
import ReactSelect from 'react-select'
import { COLORS } from './constants'

import DropdownIndicator from './DropdownIndicator'
import MultiValueRemove from './MultiValueRemove'
import Placeholder from './Placeholder'

const Select = ({
  autoFocus,
  disabled,
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
        MultiValueRemove,
        Placeholder,
      }}
      isDisabled={disabled}
      isMulti={isMulti}
      onChange={onChange}
      options={options}
      styles={{
        control: style => {
          const errorStyle = errorMessage
            ? {
                borderColor: COLORS.red,
              }
            : {}
          return {
            ...style,
            ...errorStyle,
            borderWidth: '.125rem',
          }
        },
        menu: style => ({ ...style, marginTop: 0 }),
        multiValue: style => ({
          ...style,
          position: 'relative',
          backgroundColor: COLORS.aliceBlue,
          borderRadius: 100,
        }),
        multiValueLabel: style => {
          return {
            ...style,
            color: COLORS.blue,
          }
        },
        multiValueRemove: style => {
          return {
            ...style,
            color: COLORS.blue,
            ':hover': {
              backgroundColor: 'transparent',
              color: COLORS.red,
            },
          }
        },
      }}
      placeholder={placeholder}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: COLORS.gray,
          primary25: COLORS.lightGray,
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
  /** Disables Select */
  disabled: PropTypes.bool,
  /** Error message, e.g., validation error message. */
  errorMessage: PropTypes.string,
  /** Is the select in a state of loading (async). */
  isLoading: PropTypes.bool,
  /** Support multiple selected options. */
  isMulti: PropTypes.bool,
  /** Label text. */
  label: PropTypes.string.isRequired,
  /** Text to display when loading options */
  loadingMessage: PropTypes.string,
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
