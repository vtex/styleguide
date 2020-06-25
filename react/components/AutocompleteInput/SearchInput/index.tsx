import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import IconSearch from '../../icon/Search'
import ClearInputIcon from '../../icon/Clear'

type NativeInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface SearchInputProps extends Omit<NativeInput, 'onChange'> {
  value?: string
  roundedBottom?: boolean
  onClear?: () => void
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  disabled?: boolean
}

const SearchInput: React.FC<SearchInputProps> = props => {
  const {
    onClear,
    onSearch,
    roundedBottom = true,
    value = '',
    onChange,
    onFocus,
    onBlur,
    disabled,
    ...inputProps
  } = props

  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const handleClear = () => {
    onClear?.()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(e)
  }

  const activeClass = classNames({
    'b--muted-3': focused,
    'b--muted-4': !focused,
    'br--top': !roundedBottom,
  })

  const buttonClasses = classNames(
    activeClass,
    'bg-base br2 br--right h-regular w3 bw1 ba pa0 bl-0',
    {
      'c-link pointer': !disabled,
      'c-disabled': disabled,
    }
  )

  return (
    <div className="flex flex-row">
      <div className="relative w-100">
        <input
          className={`${activeClass} w-100 ma0 border-box bw1 br2 ba outline-0 bg-base c-on-base t-body h-regular ph5 pr8 br--left`}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          {...inputProps}
        />
        {onClear && value && (
          <span
            className="absolute c-muted-3 fw5 flex items-center ph3 t-body top-0 right-0 h-100 pointer"
            onClick={handleClear}
            role="button"
            tabIndex={0}
            onKeyDown={() => null}
          >
            <ClearInputIcon />
          </span>
        )}
      </div>
      <button
        className={buttonClasses}
        disabled={disabled}
        onClick={() => onSearch?.(value)}
      >
        <IconSearch size={16} />
      </button>
    </div>
  )
}

SearchInput.propTypes = {
  /** Determine if the input's bottom corners should be rounded or not */
  roundedBottom: PropTypes.bool,
  /** Input value */
  value: PropTypes.string,
  /** Clear event handler */
  onClear: PropTypes.func,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Search event handler. Called on enter or when clicking the search button */
  onSearch: PropTypes.any,
  /** Focus event handler */
  onFocus: PropTypes.func,
  /** Blur event handler */
  onBlur: PropTypes.func,
  /** Determine if the input and the button should be disabled */
  disabled: PropTypes.bool,
}

export default SearchInput
