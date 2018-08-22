import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Badge extends PureComponent {
  render() {
    let theme = ''
    switch (this.props.type) {
      case 'success':
        theme = 'bg-success c-on-success'
        break
      case 'error':
        theme = 'bg-danger c-on-danger'
        break
      case 'warning':
        theme = 'bg-warning c-on-warning'
        break
      default:
        theme = 'bg-muted-4 c-on-base'
    }

    return (
      <div
        className={`br-pill f6 pv2 ph3 dib fw5 ${theme}`}
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

Badge.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']),
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
}

export default Badge
