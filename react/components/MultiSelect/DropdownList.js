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
        index === this.props.focused
          ? ' bg-muted-5 c-on-muted-5 '
          : ' bg-base c-on-base '
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
    const results =
      this.props.options.length === 0 ? (
        <div
          className="pv4 ph5 f6 c-on-base bg-base fw4"
          dangerouslySetInnerHTML={{ __html: this.props.emptyState }}
        />
      ) : (
        <ul className="ph0 mv0 list">{optionList}</ul>
      )

    return (
      <div
        className="b--muted-4 br--bottom br2 b--solid bw1 absolute w-100"
        style={{ borderTop: 'none' }}
        onMouseEnter={() =>
          this.props.onMouseEnter && this.props.onMouseEnter()
        }
        onMouseLeave={() =>
          this.props.onMouseLeave && this.props.onMouseLeave()
        }
      >
        {this.props.loading && (
          <div className="pv4 ph5 f6 c-on-base bg-base fw4">
            {this.props.loadingText}
          </div>
        )}
        {!this.props.loading && results}
      </div>
    )
  }
}

DropdownList.defaultProps = {
  focused: '',
  formatOption: opt => {
    return opt
  },
  loading: false,
  loadingText: 'Loading...',
  options: [],
  isVisible: false,
}

DropdownList.propTypes = {
  emptyState: PropTypes.string,
  focused: PropTypes.number,
  formatOption: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  options: PropTypes.array,
  isVisible: PropTypes.bool,
}
