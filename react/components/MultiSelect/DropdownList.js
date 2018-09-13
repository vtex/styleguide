import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class DropdownList extends PureComponent {
  handleSelect = index => {
    this.props.onSelect && this.props.onSelect(index)
  }

  handleFocus = index => {
    this.props.onFocus && this.props.onFocus(index)
  }

  render() {
    if (!this.props.isVisible) return null

    const optionList = this.props.options.map((opt, index) => {
      const focusedClasses =
        index === this.props.focused ? ' bg-muted-5 c-on-muted-5 ' : ''
      return (
        <li
          className={`pv4 ph5 pointer f6 c-on-muted-4 fw3 ${focusedClasses}`}
          dangerouslySetInnerHTML={{ __html: this.props.formatOption(opt) }}
          key={index}
          onClick={() => this.handleSelect(index)}
          onMouseEnter={() => this.handleFocus(index)}
        />
      )
    })

    return (
      <div
        className="b--muted-4 br--bottom br2 b--solid bw1"
        style={{ borderTop: 'none' }}
        onMouseEnter={() =>
          this.props.onMouseEnter && this.props.onMouseEnter()
        }
        onMouseLeave={() =>
          this.props.onMouseLeave && this.props.onMouseLeave()
        }
      >
        {this.props.options.length === 0 && (
          <div className="pv4 ph5 f6 c-on-muted-4 fw4">
            {this.props.emptyState}
          </div>
        )}
        <ul className="ph0 mv0 list">{optionList}</ul>
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
  isVisible: false,
}

DropdownList.propTypes = {
  emptyState: PropTypes.any,
  focused: PropTypes.number,
  formatOption: PropTypes.func,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  options: PropTypes.array,
  isVisible: PropTypes.bool,
}
