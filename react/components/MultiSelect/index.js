import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import Close from '../icon/Close'

export default class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      selected: ['green', 'red'],
    }
  }

  static SelectedPills = props => {
    const pills = props.selected.map((item, index) => {
      const classes =
        'pointer br-pill dib f6 fw5 pv2 ph3 mr2 mt2 bg-action-secondary c-on-action-secondary hover-c-danger'
      return (
        <div
          key={index}
          /*  Issue: we only want to change the color of the close button for hovering
            In order to fix this, we might need to handle a hover event */
          className={classes}
          onClick={() => {
            props.onClick(item)
          }}
        >
          <div className="flex items-center">
            <span>{item}</span> <Close className="mt2" color="currentColor" />
          </div>
        </div>
      )
    })

    return <div className="pv3">{pills}</div>
  }

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
        className="pv3 ph5 hover-bg-muted-5 pointer"
        // In this case we can trust the source (not dangerous per say)
        dangerouslySetInnerHTML={formatItem(item)}
        key={index}
        onClick={() => {
          props.onClick(item)
        }}
      />
    ))

    return (
      <ul style={{ listStyleType: 'none' }} className="ph0">
        {listItems}
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

        <MultiSelect.SelectedPills
          selected={this.state.selected}
          onClick={item => {
            this.setState(prevState => ({
              selected: prevState.selected.filter(i => i !== item),
            }))
          }}
        />

        <MultiSelect.FilteredSelectableList
          searchTerm={this.state.searchTerm}
          list={this.props.selectableList
            // Only show items that fit the search
            .filter(item => item.includes(this.state.searchTerm))
            // And have not been selected already
            .filter(item => !this.state.selected.includes(item))}
          onClick={item => {
            this.setState(prevState => ({
              selected: [...prevState.selected, item],
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
