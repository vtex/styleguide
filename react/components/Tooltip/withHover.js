import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withHover(WrappedComponent) {
  class Hoverable extends Component {
    state = { hover: false }

    handleMouseEnter = () => {
      this.setState({ hover: true })
    }

    handleMouseLeave = () => {
      this.setState({ hover: false })
    }

    render() {
      return this.props.hoverable ? (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <WrappedComponent {...this.props} visible={this.state.hover} />
        </div>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }
  }

  Hoverable.propTypes = {
    hoverable: PropTypes.bool.isRequired,
  }

  return Hoverable
}

export default withHover
