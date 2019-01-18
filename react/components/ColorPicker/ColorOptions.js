import React from 'react'
import { PropTypes } from 'prop-types'
import Gradient from './Gradient'
import Saturation from './Saturation'
import Alpha from './Alpha'
import RGBInput from './RGBInput'
import HSVInput from './HSVInput'
import Dropdown from './../../Dropdown'

const HSV_INPUT = 'HSV_KEY'
const RGB_INPUT = 'RGB_KEY'

export default class ColorOptions extends React.Component {
  state = {
    currentInput: RGB_INPUT,
  }

  handleOnChangeInput = e => {
    console.log(e.target.value)
    this.setState({
      currentInput: e.target.value,
    })
  }

  render() {
    return (
      <div className="absolute pa3 w-100 z-1 bg-base options-container br2">
        <div className="mv3 relative items-end flex w-100">
          <div className="w-75">
            {this.state.currentInput === RGB_INPUT ? (
              <RGBInput
                color={this.props.color.rgba}
                onChange={this.props.onColorChange}
              />
            ) : (
              <HSVInput
                color={this.props.color.hsva}
                onChange={this.props.onColorChange}
              />
            )}
          </div>
          <div className="w-25 mb3">
            <Dropdown
              size="small"
              options={[
                { value: RGB_INPUT, label: 'RGB' },
                { value: HSV_INPUT, label: 'HSV' },
              ]}
              value={this.state.currentInput}
              onChange={this.handleOnChangeInput}
            />
          </div>
        </div>
        <Saturation
          color={this.props.color.rgba}
          onChangeComplete={this.props.onColorChange}
        />
        <Gradient
          color={this.props.color.rgba}
          onChangeComplete={this.props.onColorChange}
        />
        <Alpha
          color={this.props.color.rgba}
          onChangeComplete={this.props.onColorChange}
        />
      </div>
    )
  }
}

ColorOptions.propTypes = {
  color: PropTypes.object.isRequired,
  onColorChange: PropTypes.func,
}
