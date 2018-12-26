import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'

class Hoverable extends Component {
  state = { hover: false }

  handleMouseEnter = () => {
    this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {this.state.hover ? (
          <Tooltip visible label={this.props.label}>
            {this.props.children}
          </Tooltip>
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

Hoverable.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default Hoverable
