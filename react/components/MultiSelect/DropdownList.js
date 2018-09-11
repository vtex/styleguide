import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class DropdownList extends PureComponent {
  handleSelect = opt => {
    this.props.onSelect && this.props.onSelect(opt)
  }

  handleFocus = opt => {
    this.props.onFocus && this.props.onFocus(opt)
  }

  render() {
    if (!this.props.show) return null

    const optionList = this.props.options.map((opt, index) => {
      const focusedClasses =
        opt === this.props.focused ? ' bg-muted-5 c-on-muted-5 ' : ''
      return (
        <li
          className={`pv4 ph5 pointer f6 c-on-muted-4 fw3 ${focusedClasses}`}
          dangerouslySetInnerHTML={{ __html: this.props.formatOption(opt) }}
          key={index}
          onClick={() => this.handleSelect(opt)}
          onMouseEnter={() => this.handleFocus(opt)}
        />
      )
    })

    return (
      <div
        className="b--muted-4 br--bottom br2 b--solid bw1"
        style={{ borderTop: 'none' }}
        onKeyDown={() => console.log('key down!')}
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
  emptyState: 'Sorry, no options available.',
  focused: '',
  formatOption: opt => {
    return opt
  },
  options: [],
  show: false,
}

DropdownList.propTypes = {
  emptyState: PropTypes.any,
  focused: PropTypes.number,
  /* Receives index, returns string */
  formatOption: PropTypes.func,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.array,
  show: PropTypes.bool,
}
