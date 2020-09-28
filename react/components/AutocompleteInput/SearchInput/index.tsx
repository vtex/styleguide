import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import IconSearch from '../../icon/Search'
import ClearInputIcon from '../../icon/Clear'
import styles from '../../Input/Input.css'

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
  /** Determine the search bar size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Determine if the input and button should be styled with error borders */
  error: PropTypes.bool,
  /** Prefix element */
  prefix: PropTypes.node,
}

const defaultProps = {
  roundedBottom: true,
}

const SearchInput: React.FC<PropTypes.InferProps<typeof propTypes> &
  Omit<
    React.HTMLProps<HTMLInputElement>,
    'onChange' | 'value' | 'size' | 'prefix'
  >> = props => {
  const {
    onClear,
    onSearch,
    roundedBottom,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    size = 'regular',
    error,
    prefix,
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
  const regularSize = size !== 'small' && size !== 'large'
  const activeClass = classNames({
    'b--muted-3': focused && !error,
    'b--muted-4': !focused && !error,
    'b--danger hover-b--danger': error,
    'br--top': !roundedBottom,
    'bg-disabled c-disabled': disabled,
    'bg-base c-on-base': !disabled,
  })

  const buttonClasses = classNames(
    activeClass,
    'bg-base br2 br--right w3 bw1 ba pa0 bl-0',
    {
      'c-link pointer': !disabled,
      'c-disabled': disabled,
    }
  )

  const showClearIcon = onClear && value
  const prefixClasses = classNames('br2 br-0 br--left pl5', {
    pr3: size !== 'large',
    pr4: size === 'large',
  })

  const prefixAndSuffixClasses = classNames('c-muted-2 fw5 flex items-center', {
    't-body': size !== 'small',
    't-small': size === 'small',
  })

  const inputGroupClasses = classNames(
    'flex flex-row items-stretch overflow-hidden bw1 br2 b--solid',
    activeClass,
    {
      'br--left': onSearch,
      pr5: !showClearIcon || prefix,
      pr8: showClearIcon,
      pl5: !prefix,
      [`h-${size}`]: !regularSize,
      'h-regular': regularSize,
    }
  )
  const inputClasses = classNames(
    'ma0 border-box w-100 bn outline-0',
    styles.noAppearance,
    activeClass
  )

  return (
    <div className="flex flex-row">
      <label className="relative w-100">
        <div className={inputGroupClasses}>
          {prefix && (
            <span className={`${prefixAndSuffixClasses} ${prefixClasses}`}>
              {prefix}
            </span>
          )}
          <input
            className={inputClasses}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
            {...inputProps}
          />
          {showClearIcon && (
            <span
              className="absolute c-muted-3 fw5 flex items-center pl3 pr5 t-body top-0 right-0 h-100 pointer"
              onClick={handleClear}>
              <ClearInputIcon />
            </span>
          )}
        </div>
      </label>
      {onSearch && (
        <button
          className={buttonClasses}
          disabled={disabled}
          onClick={() => onSearch(value)}>
          <IconSearch size={16} />
        </button>
      )}
    </div>
  )
}

SearchInput.propTypes = propTypes
SearchInput.defaultProps = defaultProps

export default SearchInput
