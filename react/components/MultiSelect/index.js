import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tag from './Tag'
import DropdownList from './DropdownList'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.searchInput = React.createRef()

    this.state = {
      active: false,
      focusedOption: 0,
      hovering: false,
      options: [],
      searchTerm: '',
    }
  }

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
    const options = this.props.onSearch(searchTerm)
    this.setState({
      searchTerm: searchTerm,
      focusedOption: 0,
      options: [...options],
    })
  }

  handleSelect = index => {
    this.props.onChange([...this.props.selected, this.state.options[index]])
    this.setState(
      {
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

  selectFocused = () => {
    const index = this.state.focusedOption
    if (this.state.options.length > 0) {
      this.handleSelect(index)
    }
  }

  unselectLast = () => {
    const length = this.props.selected.length
    if (length > 0) {
      this.handleUnselect(length - 1)
    }
  }

  moveFocusUp = () => {
    const newFocus = this.state.focusedOption - 1
    if (newFocus >= 0) {
      this.setState({ focusedOption: newFocus })
    }
  }

  moveFocusDown = () => {
    const newFocus = this.state.focusedOption + 1
    if (newFocus <= this.state.options.length - 1) {
      this.setState({ focusedOption: newFocus })
    }
  }

  render() {
    const tags = this.props.selected.map((tag, index) => (
      <Tag
        key={index}
        onClick={() => {
          this.handleUnselect(index)
        }}
      >
        {tag}
      </Tag>
    ))
    const showDropdown = this.state.active && this.state.searchTerm !== ''
    const emptyState = this.props.emptyState(
      `<span class="fw5">${this.state.searchTerm}</span>`
    )
    return (
      <div className="relative">
        <label>
          {this.props.label}
          <div
            className={`${
              showDropdown ? 'br--top ' : ''
            }flex flex-wrap mt3 b--muted-4 br2 b--solid bw1`}
          >
            <input
              className="f6 mv3 mh3 pv2 c-on-base bn outline-0 flex-grow-1 order-last"
              onBlur={this.handleBlur}
              onChange={this.handleSearch}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyPress}
              placeholder={this.props.placeholder}
              ref={this.searchInput}
              value={this.state.searchTerm}
            />
            {tags}
          </div>
        </label>
        <DropdownList
          emptyState={emptyState}
          focused={this.state.focusedOption}
          formatOption={opt =>
            opt.replace(
              new RegExp(this.state.searchTerm, 'i'),
              '<span class="fw5">$&</span>'
            )
          }
          onFocus={opt => this.setState({ focusedOption: opt })}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
          onSelect={this.handleSelect}
          options={this.state.options}
          isVisible={showDropdown}
        />
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  emptyState: term => {
    return `No results found for "${term}".`
  },
  placeholder: 'Search...',
  selected: [],
}

MultiSelect.propTypes = {
  /** Returns a string that will be shown if no results are found. Usage: emptyState(search term) */
  emptyState: PropTypes.func,
  /** Label */
  label: PropTypes.string.isRequired,
  /** Called when selected options change. Usage: onChange(selected array) */
  onChange: PropTypes.func.isRequired,
  /** Called when the search term changes. Returns an array of options to display. Usage: `onSearch(search term)` */
  onSearch: PropTypes.func.isRequired,
  /** Search input placeholder */
  placeholder: PropTypes.string,
  /** List of selected options, which will be shown as tags */
  selected: PropTypes.array,
}
