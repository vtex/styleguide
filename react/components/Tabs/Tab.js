import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
  handleClick = e => {
    this.props.onClick && this.props.onClick(e)
  }

  render() {
    const { active, fullWidth, label, vertical } = this.props
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={`vtex-tab__button bt-0 bl-0 ${vertical ? 'bb-0' : 'br-0'} bw1 ${fullWidth ? 'w-100' : ''} ${
          active
            ? 'c-on-muted b--emphasis'
            : 'c-muted-1 b--transparent hover-c-action-primary pointer'}
          fw5 fw4 v-mid relative pv5 ph4 f5 bg-transparent outline-0
        `}
      >
        {label}
      </button>
    )
  }
}

Tab.defaultProps = {
  direction: 'row',
}

Tab.propTypes = {
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  vertical: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
}

export default Tab
