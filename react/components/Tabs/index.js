import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tabs extends PureComponent {
  render() {
    const { children } = this.props
    const content = children.find(child => child.props.active).props.children
    return (
      <div className="w-100">
        <div className="flex flex-row bb b--light-gray mid-gray overflow-y-auto">
          {children.map(child => child)}
        </div>
        <div className="w-100">
          {content}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}

export default Tabs

export class Tab extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    label: PropTypes.any.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = e => {
    this.props.onClick && this.props.onClick(e)
  }

  render() {
    const { active, label } = this.props
    return (
      <button
        id={label}
        type="button"
        onClick={this.handleClick}
        className={`vtex-tab__button pointer bt-0 bl-0 br-0 bw1 ${
          active
            ? 'near-black b--rebel-pink'
            : 'mid-gray b--transparent'}
          hover-near-black fw5 fw4 v-mid relative pv5 ph4 f5 bg-transparent outline-0`}
      >
        {label}
      </button>
    )
  }
}
