import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import uuid from 'uuid/v4'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'

import ClearIndicator from './ClearIndicator'
import COLORS from './colors'
import ControlComponent from './Control'
import DropdownIndicatorComponent from './DropdownIndicator'
import MultiValueRemove from './MultiValueRemove'
import Placeholder from './Placeholder'
import Option from './Option'
import {
  getFontClassNameFromSize,
  getTagPaddingFromSize,
  getControlHeightFromSize,
} from './styles'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

const getOptionValue = option => {
  return JSON.stringify(option.value)
}

class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: undefined,
    }

    this.inputId = `react-select-input-${uuid()}`
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.state
    const { searchTerm: prevSearchTerm } = prevState
    const { loading } = this.props
    const { loading: prevLoading } = prevProps

    if (
      searchTerm !== prevSearchTerm ||
      (searchTerm && loading !== prevLoading)
    ) {
      document.getElementById(this.inputId).focus()
    }
  }

  render() {
    const {
      forwardedRef,
      autoFocus,
      creatable,
      defaultValue,
      disabled,
      errorMessage,
      formatCreateLabel,
      label,
      loading,
      multi,
      noOptionsMessage,
      onChange,
      onSearchInputChange,
      options,
      placeholder,
      size,
      value,
      valuesMaxHeight,
      clearable,
      defaultMenuIsOpen,
      components,
      menuPosition,
    } = this.props

    const reactSelectComponentProps = {
      menuPosition,
      defaultMenuIsOpen,
      ref: forwardedRef,
      autoFocus,
      className: `pointer bw1 ${getFontClassNameFromSize(size)}`,
      components: {
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
        Option,
        ...components,
      },
      defaultValue,
      formatCreateLabel,
      getOptionValue,
      isClearable: clearable,
      isDisabled: disabled,
      isLoading: loading,
      isMulti: multi,
      noOptionsMessage,
      inputId: this.inputId,
      onInputChange: (value, { action }) => {
        this.setState({
          searchTerm: value,
        })
        if (
          action === 'input-change' &&
          typeof onSearchInputChange === 'function'
        ) {
          onSearchInputChange(value)
        }
      },
      onChange,
      options,
      placeholder,
      styles: {
        control: (style, state) => {
          const { isFocused } = state

          return {
            ...style,
            '&:hover': {
              borderColor: errorMessage
                ? COLORS.red
                : isFocused
                ? COLORS['muted-2']
                : COLORS['muted-3'],
            },
            boxShadow: 'none',
            borderColor: errorMessage
              ? COLORS.red
              : isFocused
              ? COLORS['muted-2']
              : COLORS['muted-4'],
            borderWidth: '.125rem',
          }
        },
        menu: style => ({ ...style, marginTop: 0 }),
        multiValue: (style, state) => ({
          ...style,
          backgroundColor: state.isDisabled
            ? COLORS['muted-4']
            : COLORS.aliceBlue,
          ':hover': {
            transition: '.15s ease-in-out',
            backgroundColor: COLORS['hover-action-secondary'],
          },
          borderRadius: 100,
          padding: getTagPaddingFromSize(size),
          position: 'relative',
        }),
        multiValueLabel: (style, state) => ({
          ...style,
          padding: '0.125rem',
          paddingRight: 0,
          fontWeight: 500,
          fontSize: size === 'large' ? '100%' : style.fontSize,
          color: state.isDisabled ? COLORS.gray : COLORS['c-on-base'],
        }),
        multiValueRemove: (style, state) => ({
          ...style,
          color: state.isDisabled ? COLORS.gray : COLORS['muted-1'],
          ':hover': {
            backgroundColor: 'transparent',
            color: COLORS.blue,
          },
        }),
        option: (style, state) => ({
          ...style,
          cursor: 'pointer',
          backgroundColor: state.isFocused
            ? COLORS['hover-action-secondary']
            : 'transparent',
          color: COLORS['c-muted-1'],
        }),
        valueContainer: (style, state) => ({
          ...style,
          cursor: 'pointer',
          paddingLeft: state.isMulti && state.hasValue ? '.25rem' : '1rem',
          paddingRight: '.25rem',
          backgroundColor: state.isDisabled
            ? COLORS.lightGray
            : style.backgroundColor,
          maxHeight: `${valuesMaxHeight}px`,
          overflowY: 'auto',
        }),
      },
      theme: theme => ({
        ...theme,
        spacing: {
          ...theme.spacing,
          controlHeight: getControlHeightFromSize(size),
        },
      }),
      value,
    }

    return (
      <div className="flex flex-column">
        {label && (
          <label
            className={classNames('dib mb3 w-100 c-on-base', {
              't-small': size !== 'large',
              't-body': size === 'large',
            })}>
            {label}
          </label>
        )}

        {creatable ? (
          <CreatableSelect {...reactSelectComponentProps} />
        ) : (
          <ReactSelect {...reactSelectComponentProps} />
        )}

        {errorMessage && (
          <span className="c-danger f6 mt3 lh-title">{errorMessage}</span>
        )}
      </div>
    )
  }
}

Select.defaultProps = {
  multi: true,
  placeholder: 'Select...',
  size: 'regular',
  clearable: true,
  defaultMenuIsOpen: false,
}

const OptionShape = PropTypes.shape({
  /** Text that gets rendered for the option. */
  label: PropTypes.string.isRequired,
  /** Underlying value, e.g., an id. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
})

const OptionsShape = PropTypes.arrayOf(OptionShape)

const GroupedOptionsShape = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string,
    options: OptionsShape,
  })
)

Select.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** The CSS position value of the menu */
  menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
  /** Select auto focus */
  autoFocus: PropTypes.bool,
  /** Should clear button appear */
  clearable: PropTypes.bool,
  /** Creatable options. */
  creatable: PropTypes.bool,
  /** Default value */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    OptionShape,
    OptionsShape,
  ]),
  /** Disables Select */
  disabled: PropTypes.bool,
  /** Error message, e.g., validation error message. */
  errorMessage: PropTypes.string,
  /** Gets the label for the "Create new..." option in the menu. ({inputValue}) => string | null */
  formatCreateLabel: PropTypes.func,
  /** Label text. */
  label: PropTypes.string,
  /** Is the select in a state of loading (async). */
  loading: PropTypes.bool,
  /** Text to display when loading options */
  loadingMessage: PropTypes.string,
  /** Support multiple selected options. */
  multi: PropTypes.bool,
  /** Text to display when there are no options. ({inputValue}) => string | null */
  noOptionsMessage: PropTypes.func,
  /** onChange handler: (option) => void */
  onChange: PropTypes.func.isRequired,
  /** Handle events on search input */
  onSearchInputChange: PropTypes.func,
  /** Array of options. Options have the shape { label, value }. */
  options: PropTypes.oneOfType([OptionsShape, GroupedOptionsShape]),
  /** Text for the select value.  */
  placeholder: PropTypes.string,
  /** Select size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Value of the select. */
  value: PropTypes.oneOfType([OptionShape, OptionsShape]),
  /** Max height (in _px_) of the selected values container */
  valuesMaxHeight: PropTypes.number,
  /** If its options are initially shown */
  defaultMenuIsOpen: PropTypes.bool,
  /** Compositional components that are used in react-select. */
  components: PropTypes.object,
}

export default withForwardedRef(Select)
