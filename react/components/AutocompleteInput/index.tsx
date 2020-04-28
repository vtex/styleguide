import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'

import Spinner from '../Spinner'
import { useClickOutside, useArrowNavigation } from './hooks'
import Option, {
  AutocompleteOption,
  autocompleteOptionShape,
  getTermFromOption,
} from './Option'
import SearchInput from './SearchInput'

const propTypes = {
  /** Input props. All HTMLInput props can be added too */
  input: PropTypes.shape({
    /** Clear input handler */
    onClear: PropTypes.func.isRequired,
    /** Search by term handler (fired on enter or when clicking the search button) */
    onSearch: PropTypes.func.isRequired,
    /** Change term handler */
    onChange: PropTypes.func.isRequired,
    /** Term to be searched */
    value: PropTypes.string,
    /** Determine if the input and button should be disabled */
    disabled: PropTypes.bool,
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
  }).isRequired,
}

export type AutocompleteInputProps = PropTypes.InferProps<typeof propTypes>

const AutocompleteInput: React.FunctionComponent<PropTypes.InferProps<
  typeof propTypes
>> = ({
  input: { value, onClear, onSearch, onChange, ...inputProps },
  options: {
    onSelect,
    value: options,
    renderOption,
    loading,
    lastSearched = {},
    icon,
  },
}) => {
  const [term, setTerm] = useState(value || '')
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
    if (e.key === 'Enter') {
      const selectedOption =
        selectedOptionIndex !== -1 ? showedOptions[selectedOptionIndex] : term
      addToLastSearched(selectedOption)
      setTerm(getTermFromOption(selectedOption))
      if (selectedOptionIndex !== -1) {
        onSelect(selectedOption)
      } else {
        onSearch(getTermFromOption(selectedOption))
      }
      setSelectedOptionIndex(-1)
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
    setSelectedOptionIndex(-1)
  }

  const handleClear = () => {
    setSelectedOptionIndex(-1)
    setShowPopover(false)

    setTerm('')
    onClear()
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    setTerm(getTermFromOption(option))
    onSelect(option)
    setShowPopover(false)
  }

  const getOptionProps = (option, index) => ({
    key: `${getTermFromOption(option)}-${index}`,
    selected: index === selectedOptionIndex,
    value: option,
    searchTerm: term,
    roundedBottom: index === showedOptions.length - 1,
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

  const popoverOpened = showPopover && (!!showedOptions.length || loading)

  return (
    <div ref={containerRef} className="flex flex-column w-100">
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
        onSearch={() => onSearch(term)}
        onClear={handleClear}
        onChange={handleTermChange}
      />
      {popoverOpened ? (
        <div className="relative">
          <div className="absolute br--bottom br2 bb bl br bw1 b--muted-3 bg-base w-100 z-1 shadow-5">
            {renderOptions()}
            {loading && (
              <div className="flex flex-row justify-center items-center pa4">
                <Spinner size={20} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

AutocompleteInput.propTypes = propTypes

export default AutocompleteInput
