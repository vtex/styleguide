import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DropdownList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.defaultValue,
    }
  }

  handleSelectOption = opt => {
    this.props.onSelect && this.props.onSelect(opt)
  }

  handleChangeSelection = opt => {
    this.setState({ selected: opt })
  }

  render() {
    if (!this.props.show) return null

    const optionList = this.props.options.map((opt, index) => {
      const selectedClasses =
        opt === this.state.selected ? ' bg-muted-5 c-on-muted-5 ' : ''
      return (
        <li
          className={`pv4 ph5 pointer f6 c-on-muted-4 fw3 ${selectedClasses}`}
          dangerouslySetInnerHTML={{ __html: this.props.formatOption(opt) }}
          key={index}
          onClick={() => {
            this.handleSelectOption(opt)
          }}
          onMouseEnter={() => this.handleChangeSelection(opt)}
        />
      )
    })

    return (
      <div
        className="b--muted-4 br--bottom br2 b--solid bw1"
        style={{ borderTop: 'none' }}
      >
        {this.props.options.length === 0 && (
          <div className="pv4 ph5 f6 c-on-muted-4 fw4">
            {this.props.emptyState}
          </div>
        )}
        <ul className="ph0 mv0" style={{ listStyleType: 'none' }}>
          {optionList}
        </ul>
      </div>
    )
  }
}

DropdownList.defaultProps = {
  defaultValue: '',
  emptyState: 'Sorry, no options available.',
  formatOption: opt => {
    return opt
  },
  options: [],
  show: false,
}

DropdownList.propTypes = {
  defaultValue: PropTypes.string,
  emptyState: PropTypes.any,
  /* Returns string */
  formatOption: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.array,
  show: PropTypes.bool,
}
