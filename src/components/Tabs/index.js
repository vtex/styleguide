import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'vtex-tachyons/config.json'

class Tabs extends Component {
  constructor(props) {
    super()

    this.state = {
      activeIndex: props.activeIndex,
    }
  }

  handleClick = activeIndex => {
    this.setState({ activeIndex })
  }

  render() {
    const { activeIndex } = this.state
    const { children } = this.props

    return (
      <div className="vtex-tabs__container">
        <div className="vtex-tabs__buttons">
          {React.Children.map(children, (child, index) => {
            const style =
              index === activeIndex
                ? { boxShadow: `0 2px ${config.colors['red']}` }
                : {}

            return (
              <button
                type="button"
                onClick={() => this.handleClick(index)}
                className="vtex-tabs__button bw1 ba fw5 fw4 v-mid relative pv5 ph4 f5 b--transparent bg-transparent"
                style={style}
              >
                {child.props.label}
              </button>
            )
          })}
        </div>
        {children[activeIndex]}
      </div>
    )
  }
}

Tabs.defaultProps = {
  activeIndex: 0,
}

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  children: PropTypes.node,
}

export default Tabs
