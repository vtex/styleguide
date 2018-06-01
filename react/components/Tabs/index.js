import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import config from 'vtex-tachyons/config.json'

class Tab extends PureComponent {
  render() {
    const style = this.props.active
      ? { boxShadow: `0 2px ${config.colors['red']}` }
      : {}

    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className="vtex-tab__button pointer hover-blue bw1 ba fw5 fw4 v-mid relative pv5 ph4 f5 b--transparent bg-transparent"
        style={style}
      >
        {this.props.label}
      </button>
    )
  }
}

Tab.defaultProps = {
  active: false,
}

Tab.propTypes = {
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

export default Tab
