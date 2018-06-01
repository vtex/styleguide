import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Badge extends PureComponent {
  render() {
    return (
      <div
        className="br-pill f6 pv2 ph3 dib fw5"
        style={{
          backgroundColor: this.props.bgColor,
          color: this.props.color,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

Badge.defaultProps = {
  color: config.colors['dark-gray'],
  bgColor: config.colors['light-gray'],
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
}

export default Badge
