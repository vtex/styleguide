import React from 'react'
import PropTypes from 'prop-types'

/**
 * ColorHistory Component
 */
class ColorHistory extends React.Component {
  /**
   * Render sigle color block
   */
  renderColorBlock = color => {
    const { rgba } = color
    const styleColorBox = {
      backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
      height: '1.5rem',
    }

    return (
      <div
        onClick={() => this.props.onColorChange(color)}
        className="br2 ba b--muted-4 w-100 ma1 hover-b--action-primary pointer"
        style={styleColorBox}
      />
    )
  }

  /**
   * Render a list of color blocks
   */
  renderColorList = colorList => {
    const blocks = []
    const appendColor = color =>
      color
        ? blocks.push(this.renderColorBlock(color))
        : blocks.push(this.renderColorBlock(this.props.defaultColor))
    for (let i = 0; i < this.props.historyLength; i++) {
      appendColor(colorList && colorList[i])
    }
    return blocks
  }

  /**
   * Render ColorHistory component
   */
  render() {
    const { colorHistory } = this.props
    return (
      <div className="flex">{this.renderColorList(colorHistory.reverse())}</div>
    )
  }
}

/**
 * ColorHistory default props
 */
ColorHistory.defaultProps = {
  /** Default historyLength */
  historyLength: 9,
  /** Default color to empty blocks */
  defaultColor: {
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
    hsva: {
      h: 360,
      s: 1,
      v: 1,
      a: 1,
    },
    hex: '#FFFFFF',
  },
}

/** ColorHistory Props */
ColorHistory.propTypes = {
  /** Color history list */
  colorHistory: PropTypes.array,
  /** Color history length */
  historyLength: PropTypes.number,
  /** Default color to empty blocks */
  defaultColor: PropTypes.object,
  /** onColorChange event */
  onColorChange: PropTypes.func,
}

export default ColorHistory
