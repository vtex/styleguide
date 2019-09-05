import uniq from 'lodash/uniq'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import IconSearch from '../icon/Search'
import Spinner from '../Spinner'

import { useClickOutside, useArrowNavigation } from './hooks'
import Option from './Option'
import SearchInput from './SearchInput'

/** Structured Autocomplete option shape */
const structuredAutocompleteOptionShape = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
})

type StructuredAutocompleteOption = PropTypes.InferType<
  typeof structuredAutocompleteOptionShape
>

export type AutocompleteOption = string | StructuredAutocompleteOption

/** Autocomplete option shape */
const autocompleteOptionShape = PropTypes.oneOfType([
  PropTypes.string,
  structuredAutocompleteOptionShape,
])

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
     * Called with: (option: Value, index: number) and should return a React Node
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
    icon: PropTypes.element.isRequired,
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
       * Called when a term is searched or an option is selected
       */
      onChange: PropTypes.func,
      /** Last Searched options's title */
      label: PropTypes.node.isRequired,
    }),
  }).isRequired,
}

export const getTermFromOption = (option: AutocompleteOption): string =>
  typeof option === 'string' ? option : option.label

const AutocompleteInput: React.FunctionComponent<
  PropTypes.InferProps<typeof propTypes>
> = ({
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

  const showedOptions = (term.length
    ? [term as AutocompleteOption]
    : []
  ).concat(getShowedOptions())

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

  const handleTermChange = (newTerm: string = '') => {
    if (!showPopover) {
      setShowPopover(true)
    }
    setTerm(newTerm)
    if (onChange) {
      onChange(newTerm)
    }
  }

  const handleClear = () => {
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
    value: getTermFromOption(option),
    searchTerm: term,
    roundedBottom: index === showedOptions.length - 1,
    icon: typeof option !== 'string' ? icon : <IconSearch size={14} />,
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
      {showedOptions.map(
        renderOption
          ? (option, index) =>
              renderOption(getOptionProps(option, index), index)
          : (option, index) => <Option {...getOptionProps(option, index)} />
      )}
    </div>
  )

  const popoverOpened =
    showPopover && (!!showedOptions.length || loading || !!term.length)

  return (
    <div ref={containerRef} className="flex flex-column">
      <SearchInput
        {...inputProps}
        value={term}
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
