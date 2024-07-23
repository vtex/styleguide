import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'

import Spinner from '../Spinner'
import { useClickOutside, useArrowNavigation } from './hooks'
import Option, {
  AutocompleteOption,
  autocompleteOptionShape,
  getTermFromOption,
} from './Option'
import SearchInput from './SearchInput'
import styles from './autocomplete.css'

const propTypes = {
  /** Input props. All HTMLInput props can be added too */
  input: PropTypes.shape({
    /** Clear input handler */
    onClear: PropTypes.func.isRequired,
    /**
     * Shows the search button and it's a search by term handler
     * (fired on enter or when clicking the search button)
     */
    onSearch: PropTypes.func,
    /** Change term handler */
    onChange: PropTypes.func.isRequired,
    /** Term to be searched */
    value: PropTypes.string,
    /** Determine if the input and button should be disabled */
    disabled: PropTypes.bool,
    /** Determine if the input and button should be styled with error borders */
    error: PropTypes.bool,
    /** The error message to be displayed below the input field */
    errorMessage: PropTypes.node,
    /** Prefix element */
    prefix: PropTypes.node,
    /** Suffix element */
    suffix: PropTypes.node,
  }).isRequired,
  /** Options props. More details in the examples */
  options: PropTypes.shape({
    /**
     * Determine if a spinner will be shown below the given options
     * to show that more options will be added
     */
    loading: PropTypes.bool,
    /**
     * Function that makes possible to the dev to customly render option.
     * Called with all props needed: `(props: { key: string, selected: boolean, value: OptionValue, searchTerm: string, roundedBottom: boolean, icon: ReactElement, onClick: () => void }, index: number)` and should return a React Node
     */
    renderOption: PropTypes.func,
    /**
     * List of options.
     * An option could be a string (denoting a search by term) or an object
     * with `{value: any, label: string}` (denoting the search is related to an entity).
     */
    value: PropTypes.arrayOf(autocompleteOptionShape).isRequired,
    /**
     * Icon representing the entity.
     * Shown when a value is an object to show the difference
     */
    icon: PropTypes.element,
    /**
     * Callback called when an option is selected
     * (clicked or via arrow keys + enter)
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * Last searched terms. Can be used to enhance the Autocomplete experience.
     * Defined with: `{
     *   value: OptionValue[],
     *   onChange: (term: string | OptionValue) => any,
     *   label: string
     * }`
     */
    lastSearched: PropTypes.shape({
      /** List of last searched options */
      value: PropTypes.arrayOf(autocompleteOptionShape).isRequired,
      /**
       * Last searched change handler.
       * Called when a term is searched or an option is selected.
       */
      onChange: PropTypes.func,
      /** Last Searched options's title */
      label: PropTypes.node.isRequired,
    }),
    /**
     * Selects a size of the input bar, could be set to `small`, `regular` or `large`.
     * `regular` is the default value.
     */
    size: PropTypes.oneOf(['small', 'regular', 'large']),
    /**
     * A custom message to be displayed inside the options dropdown.
     * It can be a warning, an error, or a hint about the options.
     */
    customMessage: PropTypes.node,

    maxHeight: PropTypes.number,
  }).isRequired,
}

type CustomInputProps = PropTypes.InferProps<typeof propTypes>['input']

export type AutocompleteInputProps = Omit<
  PropTypes.InferProps<typeof propTypes>,
  'input'
> & {
  input: CustomInputProps &
    Omit<React.HTMLProps<HTMLInputElement>, keyof CustomInputProps>
}

const AutocompleteInput: React.FunctionComponent<AutocompleteInputProps> = ({
  input: {
    value,
    error,
    errorMessage,
    onClear,
    onSearch,
    onChange,
    ...inputProps
  },
  options: {
    onSelect,
    value: options,
    renderOption,
    loading,
    lastSearched = {},
    icon,
    size,
    customMessage,
    maxHeight = 'fit-content',
  },
}) => {
  const [term, setTerm] = useState(value || '')
  useEffect(
    function updateTermWhenInputValueChanges() {
      setTerm(value)
    },
    [value]
  )

  const [showPopover, setShowPopover] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const searching = term.length
  const showLastSearched =
    !searching && lastSearched.value && lastSearched.value.length > 0

  const getShowedOptions = (): AutocompleteOption[] => {
    if (showLastSearched) {
      return lastSearched.value
    }
    if (searching) {
      return options
    }
    return []
  }

  const showedOptions = getShowedOptions()

  const noSelectedOptionIndex = -1
  const [selectedOptionIndex, setSelectedOptionIndex] = useArrowNavigation(
    containerRef,
    showedOptions.length,
    noSelectedOptionIndex
  )
  useClickOutside(containerRef, () => setShowPopover(false))

  const addToLastSearched = (option: AutocompleteOption) => {
    if (lastSearched && lastSearched.onChange) {
      lastSearched.onChange(option)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    inputProps.onKeyDown?.(e)
    if (e.key === 'Enter') {
      const selectedOption =
        selectedOptionIndex !== -1 ? showedOptions[selectedOptionIndex] : term
      addToLastSearched(selectedOption)
      setTerm(getTermFromOption(selectedOption))
      if (selectedOptionIndex !== -1) {
        onSelect(selectedOption)
      } else {
        onSearch?.(getTermFromOption(selectedOption))
      }
      setSelectedOptionIndex(-1)
      setShowPopover(false)
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      setShowPopover(false)
    }
  }

  const handleTermChange = (newTerm = '') => {
    if (!showPopover) {
      setShowPopover(true)
    }
    setTerm(newTerm)
    if (onChange) {
      onChange(newTerm)
    }
    setSelectedOptionIndex(noSelectedOptionIndex)
  }

  const handleClear = () => {
    setSelectedOptionIndex(noSelectedOptionIndex)
    setShowPopover(false)

    setTerm('')
    onClear()
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    setTerm(getTermFromOption(option))
    onSelect(option)
    setShowPopover(false)
  }

  const handleSearch = () => {
    onSearch?.(term)
    setShowPopover(false)
  }

  const getOptionProps = (option, index) => ({
    key: `${getTermFromOption(option)}-${index}`,
    selected: index === selectedOptionIndex,
    value: option,
    searchTerm: term,
    // customMessage should be the last element on dropdown, so should have rounded bottom.
    roundedBottom: !customMessage && index === showedOptions.length - 1,
    icon: typeof option !== 'string' && icon ? icon : null,
    onClick: () => {
      addToLastSearched(option)
      handleOptionClick(option)
    },
  })

  const renderOptions = (): React.ReactElement | React.ReactElement[] => (
    <div className="flex flex-column">
      {showLastSearched ? (
        <div className="pa4 b f6">
          {lastSearched.label || 'Last searched terms'}
        </div>
      ) : null}
      {showedOptions.map((option, index) =>
        renderOption ? (
          renderOption(getOptionProps(option, index), index)
        ) : (
          <Option {...getOptionProps(option, index)} />
        )
      )}
    </div>
  )

  const renderCustomMessage = (): React.ReactNode =>
    typeof customMessage !== 'string' ? (
      customMessage
    ) : (
      <div className="w-100 pa4 f6 br2 br--bottom bg-base">
        <span className="ml3 c-on-base">{customMessage}</span>
      </div>
    )

  const popoverOpened =
    showPopover && (!!showedOptions.length || loading || !!customMessage)
  const errorStyle = error || Boolean(errorMessage)

  return (
    <div ref={containerRef} className={`flex flex-column w-100`}>
      <SearchInput
        {...inputProps}
        value={
          selectedOptionIndex === -1
            ? term
            : getTermFromOption(showedOptions[selectedOptionIndex])
        }
        roundedBottom={!popoverOpened}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowPopover(true)}
        onSearch={onSearch && handleSearch}
        onClear={handleClear}
        onChange={handleTermChange}
        error={errorStyle}
        size={size}
      />
      <div className="relative">
        {popoverOpened ? (
          <div
            style={{ maxHeight }}
            className={`absolute br--bottom br2 bb bl br bw1 b--muted-2 bg-base w-100 z-1 shadow-5 ${styles.scroll}`}>
            {renderOptions()}
            {loading && (
              <div className="flex flex-row justify-center items-center pa4">
                <Spinner size={20} />
              </div>
            )}
            {renderCustomMessage()}
          </div>
        ) : null}
        {errorMessage && (
          <div className="c-danger t-small mt3 lh-title">{errorMessage}</div>
        )}
      </div>
    </div>
  )
}

AutocompleteInput.propTypes = propTypes

export default AutocompleteInput
