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
    this.setState({ searchTerm: event.target.value, focusedOption: 0 })
    this.props.onSearch && this.props.onSearch(event)
  }

  handleSelect = index => {
    this.props.onChange([...this.props.selected, this.props.options[index]])
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
    if (this.props.options.length > 0) {
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
    if (newFocus <= this.props.options.length - 1) {
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
    const emptyState = (
      <span>
        No results found for "
        <span className="fw5">{this.state.searchTerm}</span>
        ".
      </span>
    )
    return (
      <div>
        <label>{this.props.label}</label>
        <div
          className={`${
            showDropdown ? 'br--top ' : ''
          }flex flex-wrap mt3 b--muted-4 br2 b--solid bw1`}
        >
          {tags}
          <input
            className="f6 mv3 mh3 pv2 c-on-base bn outline-0 flex-grow-1"
            onBlur={this.handleBlur}
            onChange={this.handleSearch}
            onFocus={this.handleFocus}
            onKeyDown={this.handleKeyPress}
            placeholder={this.props.placeholder}
            ref={this.searchInput}
            value={this.state.searchTerm}
          />
        </div>
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
          options={this.props.options}
          show={showDropdown}
        />
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  options: [],
  placeholder: 'Search...',
  selected: [],
}

MultiSelect.propTypes = {
  /** Label */
  label: PropTypes.string.isRequired,
  /** Called when selected options change. Usage: onChange(selected array) */
  onChange: PropTypes.func.isRequired,
  /** Called when the search term changes. Usage: `onSearch(event)` */
  onSearch: PropTypes.func.isRequired,
  /** List of selectable options */
  options: PropTypes.array.isRequired,
  /** Search input placeholder */
  placeholder: PropTypes.string,
  /** List of selected options, which will be shown as tags */
  selected: PropTypes.array,
}
