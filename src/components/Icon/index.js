import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

export default class Icon extends Component {
  constructor() {
    super()

    this.state = {
      module: null,
    }
  }

  componentDidMount() {
    this.mounted = true
    import(`./${this.toTitleCase(this.props.type)}`).then(
      module => this.mounted && this.setState({ module: module.default })
    )
  }

  componentWillUnmount() {
    this.mounted = false
  }

  formatHexValue(value) {
    const HEX_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const formatedValue = value.indexOf('#') === -1 ? `#${value}` : value

    return HEX_COLOR.test(formatedValue)
      ? formatedValue
      : config.colors['serious-black']
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  render() {
    const { module: Component } = this.state
    const { width, height } = this.props
    const color = this.formatHexValue(this.props.fill)

    return Component && <Component fill={color} width={width} height={height} />
  }
}

Icon.defaultProps = {
  fill: config.colors['serious-black'],
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  /** An hex color. */
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}
