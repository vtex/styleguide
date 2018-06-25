import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
  handleClick = e => {
    this.props.onClick && this.props.onClick(e)
  }

  render() {
    const { active, block, label } = this.props
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={`vtex-tab__button pointer bt-0 bl-0 br-0 bw1 ${
          active
            ? 'near-black b--rebel-pink'
            : 'mid-gray b--transparent'}
          ${block ? 'w-100' : ''}
          hover-near-black fw5 fw4 v-mid relative pv5 ph4 f5 bg-transparent outline-0
        `}
      >
        {label}
      </button>
    )
  }
}

Tab.defaultProps = {
  block: false,
}

Tab.propTypes = {
  active: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
}

export default Tab
