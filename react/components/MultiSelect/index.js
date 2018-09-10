import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tag from './Tag'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      hoveringSelectable: false,
      searchTerm: '',
    }
  }

  static SelectableTags = props => {
    const formatTag = tag => {
      return {
        __html: tag.replace(
          new RegExp(props.searchTerm, 'i'),
          '<span class="fw5">$&</span>'
        ),
      }
    }

    const tagList = props.list.map((tag, index) => {
      const highlightFirstIfNotHovering =
        !props.hovering && index === 0 ? 'bg-muted-5 c-on-muted-5' : ''
      return (
        <li
          className={`pv4 ph5 hover-bg-muted-5 hover-c-on-muted-5 pointer f6 c-on-muted-4 fw3 ${highlightFirstIfNotHovering}`}
          // In this case we can trust the source (not dangerous per say)
          dangerouslySetInnerHTML={formatTag(tag)}
          key={index}
          onClick={() => {
            props.onClick(tag)
          }}
        />
      )
    })

    return (
      <ul className="ph0 mv0" style={{ listStyleType: 'none' }}>
        {tagList}
      </ul>
    )
  }

  handleBlur = () => {
    if (!this.state.hoveringSelectable) {
      this.setState({ active: false })
    } else {
      this.searchInput.focus()
    }
  }

  handleFocus = () => {
    this.setState({ active: true })
  }

  handleKeyPress = event => {
    if (this.state.searchTerm !== '') {
      if (event.key === 'Tab' || event.key === 'Enter') {
        // Prevents tabs from changing focus
        event.preventDefault()
        this.selectFirstTagIfExists()
      }
    } else if (event.key === 'Backspace') {
      this.unselectLastSelectedTagIfExists()
    }
  }

  handleMouseEnterSelectable = () => {
    this.setState({ hoveringSelectable: true })
  }

  handleMouseLeaveSelectable = () => {
    this.setState({ hoveringSelectable: false })
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value })
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

  selectFirstTagIfExists = () => {
    const selectableList = this.props.selectableList.filter(
      tag => !this.props.selectedTags.includes(tag)
    )
    if (selectableList.length > 0) {
      this.handleSelectTag(selectableList[0])
    }
  }

  unselectLastSelectedTagIfExists = () => {
    const length = this.props.selectedTags.length
    if (this.props.selectedTags.length > 0) {
      this.handleUnselectTag(this.props.selectedTags[length - 1])
    }
  }

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
    // Only show tags that have not been selected already
    const selectableList = this.props.selectableList.filter(
      tag => !this.props.selectedTags.includes(tag)
    )
    const showDropdown = this.state.active && this.state.searchTerm !== ''
    return (
      <div>
        <label htmlFor="search-input">Colors</label>
        <div
          className={`${
            this.state.active && showDropdown ? 'br--top ' : ''
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
        {showDropdown && (
          <div
            style={{ borderTop: 'none' }}
            className="b--muted-4 br--bottom br2 b--solid bw1"
            onMouseEnter={() => this.handleMouseEnterSelectable()}
            onMouseLeave={() => this.handleMouseLeaveSelectable()}
          >
            {selectableList.length !== 0 && (
              <MultiSelect.SelectableTags
                hovering={this.state.hoveringSelectable}
                searchTerm={this.state.searchTerm}
                list={selectableList}
                onClick={this.handleSelectTag}
              />
            )}
            {selectableList.length === 0 && (
              <div className="pv4 ph5 f6 c-on-muted-4 fw4">
                No results found for "<span className="fw5">
                  {this.state.searchTerm}
                </span>".
              </div>
            )}
          </div>
        )}
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
