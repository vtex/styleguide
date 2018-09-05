import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tag from './Tag'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      searchTerm: '',
      selected: ['Green', 'Red'],
    }
  }

  static SelectableTags = props => {
    const formatTag = tag => {
      return {
        __html: tag.replace(
          new RegExp(props.searchTerm),
          `<strong>${props.searchTerm}</strong>`
        ),
      }
    }

    const tagList = props.list.map((tag, index) => (
      <li
        className="pv3 ph5 hover-bg-muted-5 pointer"
        // In this case we can trust the source (not dangerous per say)
        dangerouslySetInnerHTML={formatTag(tag)}
        key={index}
        onClick={() => {
          props.onClick(tag)
        }}
      />
    ))

    return (
      <ul style={{ listStyleType: 'none' }} className="ph0">
        {tagList}
      </ul>
    )
  }

  handleBlur = () => {
    // this.setState({ active: false })
  }

  handleFocus = () => {
    this.setState({ active: true })
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const tags = this.state.selected.map((tag, index) => (
      <Tag
        tag={tag}
        key={index}
        onClick={tag => {
          this.setState(prevState => ({
            selected: prevState.selected.filter(i => i !== tag),
          }))
        }}
      />
    ))
    return (
      <div>
        <label htmlFor="search-input">Colors</label>
        <div className="flex flex-wrap mt3 b--muted-4 br--top br2 b--solid bw1">
          {tags}
          <input
            id="search-input"
            className="f6 mv3 mh3 c-on-base bn outline-0"
            onBlur={this.handleBlur}
            onChange={this.handleSearchTermChange}
            onFocus={this.handleFocus}
            placeholder={this.props.placeholder}
            style={{
              flexGrow: 1,
            }}
            value={this.state.searchTerm}
          />
        </div>
        {this.state.active && (
          <MultiSelect.SelectableTags
            searchTerm={this.state.searchTerm}
            list={this.props.selectableList
              // Only show tags that fit the search
              .filter(tag => tag.includes(this.state.searchTerm))
              // And have not been selected already
              .filter(tag => !this.state.selected.includes(tag))}
            onClick={tag => {
              this.setState(prevState => ({
                selected: [...prevState.selected, tag],
                searchTerm: '',
              }))
            }}
          />
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
  placeholder: PropTypes.string,
  selectableList: PropTypes.array.isRequired,
}
