import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import Tag from './Tag'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      selected: ['green', 'red'],
    }
  }

  static SelectedTags = props => {
    const tags = props.selected.map((tag, index) => (
      <Tag tag={tag} key={index} onClick={props.onClick} />
    ))

    return <div className="pv3">{tags}</div>
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

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    console.log(this.state.selected)
    return (
      <div>
        <Input
          placeholder="Search..."
          label={this.props.label}
          value={this.state.searchTerm}
          onChange={this.handleSearchTermChange}
        />

        <MultiSelect.SelectedTags
          selected={this.state.selected}
          onClick={tag => {
            this.setState(prevState => ({
              selected: prevState.selected.filter(i => i !== tag),
            }))
          }}
        />

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
            }))
          }}
        />
      </div>
    )
  }
}

MultiSelect.defaultProps = {
  selectableList: [],
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  selectableList: PropTypes.array.isRequired,
}
