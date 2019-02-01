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
    const {
      emptyState,
      focused,
      formatOption,
      isVisible,
      loading,
      loadingText,
      onMouseEnter,
      onMouseLeave,
      options,
    } = this.props
    if (!isVisible) return null

    const optionList = options.map((opt, index) => {
      const focusedClasses =
        index === focused ? ' bg-muted-5 c-on-muted-5 ' : ' bg-base c-on-base '
      return (
        <li
          className={`pv4 ph5 pointer t-small fw3 c-on-muted-4 ${focusedClasses}`}
          dangerouslySetInnerHTML={{ __html: formatOption(opt) }}
          key={index}
          onClick={() => this.handleSelect(index)}
          onMouseEnter={() => this.handleFocus(index)}
        />
      )
    })
    const results =
      options.length === 0 ? (
        <div
          className="pv4 ph5 t-small c-muted-2 bg-base"
          dangerouslySetInnerHTML={{ __html: emptyState }}
        />
      ) : (
        <ul className="ph0 mv0 list">{optionList}</ul>
      )

    return (
      <div
        className="b--muted-4 br--bottom br2 b--solid bw1 absolute w-100 z-max"
        style={{ borderTop: 'none', boxShadow: '0 1px 18px rgba(0,0,0,0.15)' }}
        onMouseEnter={() => onMouseEnter && onMouseEnter()}
        onMouseLeave={() => onMouseLeave && onMouseLeave()}>
        {loading && (
          <div className="pv4 ph5 t-small c-muted-2 bg-base">{loadingText}</div>
        )}
        {!loading && results}
      </div>
    )
  }
}

DropdownList.defaultProps = {
  focused: '',
  formatOption: opt => {
    return opt.label
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
