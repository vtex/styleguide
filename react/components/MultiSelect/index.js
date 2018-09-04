import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

export default class MultiSelect extends Component {
  static FilteredSelectableList = props => {
    const formatItem = item => {
      return {
        __html: item.replace(
          new RegExp(props.searchTerm),
          `<strong>${props.searchTerm}</strong>`
        ),
      }
    }

    const listItems = props.list.map((item, index) => (
      <li
        className="pv3"
        key={index}
        // TODO: look for a secure option instead of setting inner HTML
        dangerouslySetInnerHTML={formatItem(item)}
      />
    ))

    return (
      <ul style={{ listStyleType: 'none' }} className="ph5">
        {listItems}
      </ul>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      selected: [],
    }
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Search..."
          label={this.props.label}
          value={this.state.searchTerm}
          onChange={this.handleSearchTermChange}
        />

        <MultiSelect.FilteredSelectableList
          searchTerm={this.state.searchTerm}
          list={this.props.selectableList.filter(item =>
            item.includes(this.state.searchTerm)
          )}
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
