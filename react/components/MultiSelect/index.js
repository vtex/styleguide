import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import Tag from './Tag'
import DropdownList from './DropdownList'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.searchInput = React.createRef()

    this.state = {
      active: false,
      filteredOptions: [],
      focusedOption: 0,
      hovering: false,
      loading: false,
      searchTerm: '',
    }
  }

  handleFilter = debounce(
    async term => {
      const filteredOptions = await this.filter(term)
      this.setState({ loading: false, filteredOptions })
    },
    275,
    { trailing: true }
  )

  handleFocus = () => {
    this.setState({ active: true })
  }

  handleBlur = () => {
    if (!this.state.hovering) {
      this.setState({ active: false })
    }
  }

  handleKeyPress = event => {
    if (this.state.searchTerm !== '') {
      if (event.key === 'Tab' || event.key === 'Enter') {
        event.preventDefault()
        this.selectFocused()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        this.moveFocusUp()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        this.moveFocusDown()
      }
    } else if (event.key === 'Backspace') {
      this.unselectLast()
    }
  }

  handleSearch = event => {
    const searchTerm = event.target.value
    this.setState(
      () => {
        return {
          searchTerm,
          focusedOption: 0,
          filteredOptions: [],
          loading: true,
        }
      },
      () => {
        this.handleFilter(searchTerm)
      }
    )
  }

  handleSelect = index => {
    this.props.onChange([
      ...this.props.selected,
      this.state.filteredOptions[index],
    ])
    this.setState(
      {
        hovering: false,
        searchTerm: '',
      },
      () => {
        this.searchInput.current.focus()
      }
    )
  }

  handleUnselect = index => {
    this.props.onChange(this.props.selected.filter((opt, i) => index !== i))
    this.searchInput.current.focus()
  }

  filter = term => {
    if (this.props.filter) {
      return this.props.filter(term)
    }
    return this.props.options
      .filter(opt => opt.label.toLowerCase().includes(term.toLowerCase()))
      .filter(opt => {
        for (let i = 0; i < this.props.selected.length; i++) {
          if (this.props.selected[i].value === opt.value) {
            return false
          }
        }
        return true
      })
  }

  moveFocusDown = () => {
    const newFocus = this.state.focusedOption + 1
    if (newFocus <= this.state.filteredOptions.length - 1) {
      this.setState({ focusedOption: newFocus })
    }
  }

  moveFocusUp = () => {
    const newFocus = this.state.focusedOption - 1
    if (newFocus >= 0) {
      this.setState({ focusedOption: newFocus })
    }
  }

  selectFocused = () => {
    const index = this.state.focusedOption
    if (this.state.filteredOptions.length > 0) {
      this.handleSelect(index)
    }
  }

  unselectLast = () => {
    const length = this.props.selected.length
    if (length > 0) {
      this.handleUnselect(length - 1)
    }
  }

  render() {
    const { disabled, label, loadingText, placeholder, selected } = this.props
    const emptyState = this.props.emptyState(
      `<span className="fw5">${this.state.searchTerm}</span>`
    )
    const isDropdownVisible = this.state.active && this.state.searchTerm !== ''
    const tags = selected.map((tag, index) => (
      <div className="mr2 mv1 flex" key={index}>
        <Tag
          disabled={disabled}
          onClick={() => {
            this.handleUnselect(index)
          }}>
          {tag.label}
        </Tag>
      </div>
    ))

    let classes = disabled ? ' bg-muted-5 c-muted-2 ' : ' bg-base c-on-base '
    classes += isDropdownVisible ? ' br--top ' : ''
    classes += this.state.active ? ' b--muted-2 ' : ' b--muted-4 '
    classes += !this.state.active && !disabled ? ' hover-b--muted-3 ' : ''

    return (
      <div className="relative">
        <label>
          {label && (
            <span className="vtex-input__label db mb3 w-100 c-on-base">
              {label}
            </span>
          )}
          <div
            className={`flex flex-wrap mt3 br2 b--solid bw1 pv2 ph5 ${classes}`}>
            <input
              className={`t-small mv3 bn outline-0 flex-grow-1 order-last ${classes}`}
              disabled={disabled}
              onBlur={this.handleBlur}
              onChange={this.handleSearch}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyPress}
              placeholder={placeholder}
              ref={this.searchInput}
              value={this.state.searchTerm}
              style={{
                WebkitAppearance: 'none',
              }}
            />
            {tags}
          </div>
        </label>
        <DropdownList
          emptyState={emptyState}
          focused={this.state.focusedOption}
          formatOption={opt =>
            opt.label.replace(
              new RegExp(this.state.searchTerm, 'i'),
              '<span className="fw5">$&</span>'
            )
          }
          loading={this.state.loading}
          loadingText={loadingText}
          onFocus={opt => this.setState({ focusedOption: opt })}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
          onSelect={this.handleSelect}
          options={this.state.filteredOptions}
          isVisible={isDropdownVisible}
        />
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  disabled: false,
  emptyState: term => {
    return `No results found for "${term}".`
  },
  options: [],
  placeholder: 'Search...',
  selected: [],
}

MultiSelect.propTypes = {
  /** True if the component should be disabled */
  disabled: PropTypes.bool,
  /** Returns a string that will be shown if no results are found. Usage: emptyState(search term) */
  emptyState: PropTypes.func,
  /** Returns an array of filtered results. Usage: filter(search term) */
  filter: PropTypes.func,
  /** Label */
  label: PropTypes.string,
  /** Text that shows during load */
  loadingText: PropTypes.string,
  /** Called when selected options change. Usage: onChange(selected array) */
  onChange: PropTypes.func.isRequired,
  /** List of selectable options. */
  options: PropTypes.array,
  /** Search input placeholder */
  placeholder: PropTypes.string,
  /** List of selected options, which will be shown as tags */
  selected: PropTypes.array,
}
