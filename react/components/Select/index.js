import PropTypes from 'prop-types'
import React from 'react'
import ReactSelect from 'react-select'
import { COLORS } from './constants'

import DropdownIndicator from './DropdownIndicator'
import MultiValueRemove from './MultiValueRemove'
import Placeholder from './Placeholder'

const getFontClassNameFromSize = size => {
  switch (size) {
    case 'large':
      return 't-body'

    case 'small':
    default:
      return 't-small'
  }
}

const getValueContainerHeightFromSize = size => {
  switch (size) {
    case 'large':
      return '3rem'

    case 'small':
      return '2rem'

    default:
      return '2.5rem'
  }
}

const Select = ({
  autoFocus,
  disabled,
  errorMessage,
  isMulti,
  label,
  onChange,
  options,
  placeholder,
  size,
  value,
  ...props
}) => (
  <div className="flex flex-column">
    <label className={`dib mb3 w-100 ${getFontClassNameFromSize(size)}`}>
      {label}
    </label>
    <ReactSelect
      autoFocus={autoFocus}
      className={`${getFontClassNameFromSize(size)} ${
        errorMessage ? 'b--danger bw1' : ''
      }`}
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
        valueContainer: (style, state) => ({
          ...style,
          height: getValueContainerHeightFromSize(size),
          backgroundColor: state.isDisabled
            ? COLORS.lightGray
            : style.backgroundColor,
        }),
        menu: style => ({ ...style, marginTop: 0 }),
        multiValue: (style, state) => ({
          ...style,
          position: 'relative',
          backgroundColor: state.isDisabled
            ? COLORS['muted-4']
            : COLORS.aliceBlue,
          borderRadius: 100,
        }),
        multiValueLabel: (style, state) => {
          return {
            ...style,
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
          }
        },
        multiValueRemove: (style, state) => {
          return {
            ...style,
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
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
  isMulti: true,
  placeholder: 'Select...',
  size: 'regular',
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
  /** Text to display when there are no options. ({inputValue}) => string | null */
  noOptionsMessage: PropTypes.func,
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
  /** Select size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
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
