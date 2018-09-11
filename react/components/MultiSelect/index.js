import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tag from './Tag'
import DropdownList from './DropdownList'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      searchTerm: '',
      focusedTag: 0,
    }
  }

  handleFocus = () => {
    this.setState({ active: true })
  }

  handleKeyPress = event => {
    if (this.state.searchTerm !== '') {
      if (event.key === 'Tab' || event.key === 'Enter') {
        event.preventDefault()
        this.selectFocusedTagIfExists()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        this.moveFocusedTagUp()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        this.moveFocusedTagDown()
      }
    } else if (event.key === 'Backspace') {
      this.unselectLastSelectedTagIfExists()
    }
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value, focusedTag: 0 })
    this.props.onSearchChange && this.props.onSearchChange(event)
  }

  handleSelectTag = index => {
    this.props.onSelectTag(index)
    this.setState(
      {
        searchTerm: '',
      },
      () => {
        this.searchInput.focus()
      }
    )
  }

  handleUnselectTag = index => {
    this.props.onUnselectTag(index)
    this.searchInput.focus()
  }

  selectFocusedTagIfExists = () => {
    const index = this.state.focusedTag
    if (this.props.options.length > 0) {
      this.handleSelectTag(index)
    }
  }

  unselectLastSelectedTagIfExists = () => {
    const length = this.props.selectedTags.length
    if (length > 0) {
      this.handleUnselectTag(length - 1)
    }
  }

  moveFocusedTagUp = () => {
    const newFocus = this.state.focusedTag - 1
    if (newFocus >= 0) {
      this.setState({ focusedTag: newFocus })
    }
  }

  moveFocusedTagDown = () => {
    const newFocus = this.state.focusedTag + 1
    if (newFocus <= this.props.options.length - 1) {
      this.setState({ focusedTag: newFocus })
    }
  }

  render() {
    const tags = this.props.selectedTags.map((tag, index) => (
      <Tag
        key={index}
        onClick={() => {
          this.handleUnselectTag(index)
        }}
        tag={tag}
      />
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
        <label htmlFor="search-input">Colors</label>
        <div
          className={`${
            showDropdown ? 'br--top ' : ''
          }flex flex-wrap mt3 b--muted-4 br2 b--solid bw1`}
        >
          {tags}
          <input
            id="search-input"
            className="f6 mv3 mh3 pv2 c-on-base bn outline-0"
            onBlur={this.handleBlur}
            onChange={this.handleSearchTermChange}
            onFocus={this.handleFocus}
            onKeyDown={this.handleKeyPress}
            placeholder={this.props.placeholder}
            ref={node => {
              this.searchInput = node
            }}
            style={{
              flexGrow: 1,
            }}
            value={this.state.searchTerm}
          />
        </div>
        <DropdownList
          options={this.props.options}
          show={showDropdown}
          emptyState={emptyState}
          focused={this.state.focusedTag}
          formatOption={opt =>
            opt.replace(
              new RegExp(this.state.searchTerm, 'i'),
              '<span class="fw5">$&</span>'
            )
          }
          onSelect={this.handleSelectTag}
          onFocus={opt => this.setState({ focusedTag: opt })}
        />
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  placeholder: 'Search...',
  options: [],
  selectedTags: [],
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSelectTag: PropTypes.func.isRequired,
  onUnselectTag: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  selectedTags: PropTypes.array,
}
