import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import IconSearch from '../../icon/Search'
import ClearInputIcon from '../../icon/Clear'

const propTypes = {
  /** Determine if the input's bottom corners should be rounded or not */
  roundedBottom: PropTypes.bool,

  /* Input props */
  /** Input value */
  value: PropTypes.string,
  /** Clear event handler */
  onClear: PropTypes.func,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Search event handler. Called on enter or when clicking the search button */
  onSearch: PropTypes.func,
  /** Focus event handler */
  onFocus: PropTypes.func,
  /** Blur event handler */
  onBlur: PropTypes.func,
  /** Determine if the input and the button should be disabled */
  disabled: PropTypes.bool,
}

const defaultProps = {
  roundedBottom: true,
}

const SearchInput: React.FC<PropTypes.InferProps<typeof propTypes> &
  Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'value'>> = props => {
  const {
    onClear,
    onSearch,
    roundedBottom,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    ...inputProps
  } = props

  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value)
  }

  const handleClear = () => {
    onClear && onClear()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus && onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur && onBlur(e)
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
            onClick={handleClear}>
            <ClearInputIcon />
          </span>
        )}
      </div>
      <button
        className={buttonClasses}
        disabled={disabled}
        onClick={() => onSearch(value)}>
        <IconSearch size={16} />
      </button>
    </div>
  )
}

SearchInput.propTypes = propTypes
SearchInput.defaultProps = defaultProps

export default SearchInput
