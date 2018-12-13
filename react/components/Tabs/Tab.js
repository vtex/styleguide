import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
  handleClick = e => {
    this.props.onClick && this.props.onClick(e)
  }

  render() {
    const { active, fullWidth, label } = this.props
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={`vtex-tab__button bt-0 bl-0 br-0 bw1 ${
          fullWidth ? 'w-100' : ''
        } ${
          active
            ? 'c-on-muted b--emphasis vtex-tab__button--selected'
            : 'c-muted-1 b--transparent hover-c-action-primary pointer vtex-tab__button--unselected'
        } v-mid relative h-regular ph4 t-body bg-transparent outline-0
        `}>
        {label}
      </button>
    )
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
}

export default Tab
