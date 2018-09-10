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
      selected: ['Green', 'Red'],
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

    const tagList = props.list.map((tag, index) => (
      <li
        className="pv4 ph5 hover-bg-muted-5 pointer f6 c-on-muted-4 fw3"
        // In this case we can trust the source (not dangerous per say)
        dangerouslySetInnerHTML={formatTag(tag)}
        key={index}
        onClick={() => {
          props.onClick(tag)
        }}
      />
    ))

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
    this.setState(
      prevState => ({
        selected: [...prevState.selected, tag],
        searchTerm: '',
      }),
      () => {
        this.searchInput.focus()
      }
    )
  }

  render() {
    const tags = this.state.selected.map((tag, index) => (
      <Tag
        tag={tag}
        key={index}
        onClick={tag => {
          this.setState(prevState => ({
            // Removes tag from selected array
            selected: prevState.selected.filter(i => i !== tag),
          }))
        }}
      />
    ))
    // Only show tags that have not been selected already
    const selectableList = this.props.selectableList.filter(
      tag => !this.state.selected.includes(tag)
    )
    const showDropdown = this.state.active && this.state.searchTerm !== ''
    return (
      <div>
        <label htmlFor="search-input">Colors</label>
        <div
          className={`${
            this.state.active ? 'br--top ' : ''
          }flex flex-wrap mt3 b--muted-4 br2 b--solid bw1`}
        >
          {tags}
          <input
            id="search-input"
            className="f6 mv3 mh3 pv2 c-on-base bn outline-0"
            onBlur={this.handleBlur}
            onChange={this.handleSearchTermChange}
            onFocus={this.handleFocus}
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
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func,
  placeholder: PropTypes.string,
  selectableList: PropTypes.array.isRequired,
}
