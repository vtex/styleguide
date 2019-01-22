import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import PropTypes from 'prop-types'
import HexInput from './HexInput'
import ColorOptions from './ColorOptions'

/**
 * ColorContent Component
 */
class ColorContent extends React.Component {
  /**
   * Initial state
   */
  state = {
    /** Color in RGBA Format */
    rgba: {
      r: 0,
      b: 0,
      g: 0,
      a: 1,
    },
    /** Color in HSVA Format */
    hsva: {
      h: 0,
      s: 0,
      v: 0,
      a: 1,
    },
    /** Color in HEX Format */
    hex: '#000000',
    /** State if is showing options box */
    showOptions: false,
  }

  /**
   * Handle when color are changed
   */
  handleColorChange = color => {
    console.log(color)
    this.setState(
      {
        rgba: color.rgb || color.rgba,
        hsva: color.hsv || color.hsva,
        hex: color.hex,
      },
      () => {
        const { onChange } = this.props
        onChange && onChange(this.state)
      }
    )
  }

  handleOutsideClick = () => {
    this.setState({ showOptions: false })
  }

  /**
   * Handle options box visibility
   */
  handleShowOptions = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  /**
   * Render ColorContent component
   */
  render() {
    const { rgba } = this.state
    const { title } = this.props

    const styleColorBox = {
      backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
      height: '1.5rem',
    }

    return (
      <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
        <div className="relative dib w-100">
          {title && (
            <div className="bb b--muted-4 mb3 t-heading-5 pv5">{title}</div>
          )}
          <div className="flex w-100">
            <div className="w-25 pa1">
              <span className="t-small w-100 c-on-base db mb3">
                {this.props.colorState}
              </span>
              <div
                className="ba bw1 b--muted-4 br2 pa1 hover-b--action-primary pointer"
                onClick={this.handleShowOptions}>
                <div className="br1" style={styleColorBox} />
              </div>
            </div>
            <div className="w-75 pa1">
              <HexInput
                rgb={this.state.rgba}
                onChange={this.handleColorChange}
              />
            </div>
          </div>
          <div>
            {this.state.showOptions && (
              <ColorOptions
                {...this.props}
                color={this.state}
                onColorChange={this.handleColorChange}
              />
            )}
          </div>
        </div>
      </OutsideClickHandler>
    )
  }
}

/** Default props values */
ColorContent.defaultProps = {
  colorState: 'Default',
}

ColorContent.propTypes = {
  /** onChange event */
  onChange: PropTypes.func,
  /** Color state */
  colorState: PropTypes.string,
  /** ColorPicker Title */
  title: PropTypes.string,
}

export default ColorContent
