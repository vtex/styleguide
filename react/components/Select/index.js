import PropTypes from 'prop-types'
import React from 'react'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import COLORS from './colors'

import ClearIndicator from './ClearIndicator'
import DropdownIndicator from './DropdownIndicator'
import MultiValueRemove from './MultiValueRemove'
import Placeholder from './Placeholder'
import ControlComponent from './Control'

import { getFontClassNameFromSize, getTagPaddingFromSize } from './styles'

const getOptionValue = option => {
  return JSON.stringify(option.value)
}

const Select = ({
  autoFocus,
  defaultValue,
  errorMessage,
  isDisabled,
  isLoading,
  isMulti,
  label,
  noOptionsMessage,
  onChange,
  onSearchInputChange,
  options,
  placeholder,
  size,
  value,
  isCreatable,
}) => (
  <div className="flex flex-column">
    {label ? (
      <label className={`dib mb3 w-100 ${getFontClassNameFromSize(size)}`}>
        {label}
      </label>
    ) : null}
    {isCreatable ? (
      <CreatableSelect
        autoFocus={autoFocus}
        className={`pointer ${getFontClassNameFromSize(size)} ${
          errorMessage ? 'b--danger bw1' : ''
        }`}
        components={{
          ClearIndicator,
          Control: function Control(props) {
            return (
              <ControlComponent
                errorMessage={errorMessage}
                size={size}
                {...props}
              />
            )
          },
          DropdownIndicator: function DropdownIndicator(props) {
            return <DropdownIndicatorComponent size={size} {...props} />
          },
          IndicatorSeparator: () => null,
          MultiValueRemove,
          Placeholder,
        }}
        defaultValue={defaultValue}
        getOptionValue={getOptionValue}
        isClearable
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={isMulti}
        noOptionsMessage={noOptionsMessage}
        onInputChange={(value, { action }) => {
          if (
            action === 'input-change' &&
            typeof onSearchInputChange === 'function'
          ) {
            onSearchInputChange(value)
          }
        }}
        onChange={onChange}
        options={options}
        styles={{
          multiValue: (style, state) => ({
            ...style,
            backgroundColor: state.isDisabled
              ? COLORS['muted-4']
              : COLORS.aliceBlue,
            borderRadius: 100,
            padding: getTagPaddingFromSize(size),
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
            position: 'relative',
          }),
          multiValueLabel: (style, state) => ({
            ...style,
            paddingRight: 0,
            fontWeight: 500,
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
          }),
          multiValueRemove: style => ({
            ...style,
            colors: 'inherit',
            ':hover': {
              backgroundColor: 'transparent',
              color: COLORS.red,
            },
          }),
          option: style => ({ ...style, cursor: 'pointer' }),
          placeholder: style => ({ ...style, padding: 10 }),
          valueContainer: (style, state) => ({
            ...style,
            cursor: 'pointer',
            paddingLeft: '1rem',
            backgroundColor: state.isDisabled
              ? COLORS.lightGray
              : style.backgroundColor,
          }),
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
      />
    ) : (
      <ReactSelect
        autoFocus={autoFocus}
        className={`pointer ${getFontClassNameFromSize(size)} ${
          errorMessage ? 'b--danger bw1' : ''
        }`}
        components={{
          ClearIndicator,
          Control: function Control(props) {
            return (
              <ControlComponent
                errorMessage={errorMessage}
                size={size}
                {...props}
              />
            )
          },
          DropdownIndicator: function DropdownIndicator(props) {
            return <DropdownIndicatorComponent size={size} {...props} />
          },
          IndicatorSeparator: () => null,
          MultiValueRemove,
          Placeholder,
        }}
        defaultValue={defaultValue}
        getOptionValue={getOptionValue}
        isClearable
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={isMulti}
        noOptionsMessage={noOptionsMessage}
        onInputChange={(value, { action }) => {
          if (
            action === 'input-change' &&
            typeof onSearchInputChange === 'function'
          ) {
            onSearchInputChange(value)
          }
        }}
        onChange={onChange}
        options={options}
        styles={{
          multiValue: (style, state) => ({
            ...style,
            backgroundColor: state.isDisabled
              ? COLORS['muted-4']
              : COLORS.aliceBlue,
            borderRadius: 100,
            padding: getTagPaddingFromSize(size),
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
            position: 'relative',
          }),
          multiValueLabel: (style, state) => ({
            ...style,
            paddingRight: 0,
            fontWeight: 500,
            color: state.isDisabled ? COLORS.gray : COLORS.blue,
          }),
          multiValueRemove: style => ({
            ...style,
            colors: 'inherit',
            ':hover': {
              backgroundColor: 'transparent',
              color: COLORS.red,
            },
          }),
          option: style => ({ ...style, cursor: 'pointer' }),
          placeholder: style => ({ ...style, padding: 10 }),
          valueContainer: (style, state) => ({
            ...style,
            cursor: 'pointer',
            paddingLeft: '1rem',
            backgroundColor: state.isDisabled
              ? COLORS.lightGray
              : style.backgroundColor,
          }),
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
      />
    )}
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
  /** Default value */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Error message, e.g., validation error message. */
  errorMessage: PropTypes.string,
  /** Disables Select */
  isDisabled: PropTypes.bool,
  /** Is the select in a state of loading (async). */
  isLoading: PropTypes.bool,
  /** Support multiple selected options. */
  isMulti: PropTypes.bool,
  /** Label text. */
  label: PropTypes.string,
  /** Text to display when loading options */
  loadingMessage: PropTypes.string,
  /** Text to display when there are no options. ({inputValue}) => string | null */
  noOptionsMessage: PropTypes.func,
  /** onChange handler: (option) => void */
  onChange: PropTypes.func.isRequired,
  /** Handle events on search input */
  onSearchInputChange: PropTypes.func,
  /** Array of options. Options have the shape { label, value }. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Text that gets rendered for the option. */
      label: PropTypes.string.isRequired,
      /** Underlying value, e.g., an id. */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
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
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
          .isRequired,
      })
    ),
  ]),
  isCreatable: PropTypes.bool,
}

export default Select
