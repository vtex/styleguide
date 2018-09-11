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
      focusedTag: '',
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
        this.moveFocusedTagUp()
      } else if (event.key === 'ArrowDown') {
        this.moveFocusedTagDown()
      }
    } else if (event.key === 'Backspace') {
      this.unselectLastSelectedTagIfExists()
    }
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value, focusedTag: '' })
    this.props.onSearchChange && this.props.onSearchChange(event)
  }

  handleSelectTag = tag => {
    this.props.onSelectTag(tag)
    this.setState(
      {
        searchTerm: '',
      },
      () => {
        this.searchInput.focus()
      }
    )
  }

  handleUnselectTag = tag => {
    this.props.onUnselectTag(tag)
    this.searchInput.focus()
  }

  selectFocusedTagIfExists = () => {
    const tag = this.getFocusedTag()
    if (tag !== '') {
      this.handleSelectTag(tag)
    }
  }

  unselectLastSelectedTagIfExists = () => {
    const length = this.props.selectedTags.length
    if (this.props.selectedTags.length > 0) {
      this.handleUnselectTag(this.props.selectedTags[length - 1])
    }
  }

  getFocusedTag = () => {
    if (this.state.focusedTag !== '') {
      return this.state.focusedTag
    }
    // If no item is focused, focus on the first one
    const options = this.props.selectableList.filter(
      tag => !this.props.selectedTags.includes(tag)
    )
    return options.length > 0 ? options[0] : ''
  }

  moveFocusedTagUp = () => {}

  moveFocusedTagDown = () => {}

  render() {
    const tags = this.props.selectedTags.map((tag, index) => (
      <Tag
        key={index}
        onClick={tag => {
          this.handleUnselectTag(tag)
        }}
        tag={tag}
      />
    ))
    const remainingOptions = this.props.selectableList.filter(
      tag => !this.props.selectedTags.includes(tag)
    )
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
          options={remainingOptions}
          show={showDropdown}
          emptyState={emptyState}
          focused={this.getFocusedTag()}
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
  selectableList: [],
  selectedTags: [],
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSelectTag: PropTypes.func.isRequired,
  onUnselectTag: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  selectableList: PropTypes.array.isRequired,
  selectedTags: PropTypes.array,
}
