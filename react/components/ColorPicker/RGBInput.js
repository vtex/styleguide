import React from 'react'
import { PropTypes } from 'prop-types'
import Input from './../../Input'

class RGBInput extends React.Component {
  state = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  }

  handleChange = (event, key) => {
    console.log(event.target.value, key)
    this.setState({
      [key]: event.target.value,
    })
  }

  componentDidUpdate(prevProps) {
    this.updateColor(prevProps)
  }

  componentDidMount(prevProps) {
    this.updateColor(prevProps)
  }

  updateColor = prevProps => {
    if (!prevProps || prevProps.color !== this.props.color) {
      this.setState({ ...this.props.color })
    }
  }

  render() {
    return (
      <div className="mv3">
        <div className="relative flex">
          <div className="ph2 w-25">
            <Input
              label="R"
              size="small"
              type="number"
              min="0"
              max="250"
              value={this.state.r}
              onChange={e => this.handleChange(e, 'r')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="G"
              size="small"
              type="number"
              min="0"
              max="255"
              value={this.state.g}
              onChange={e => this.handleChange(e, 'g')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="B"
              size="small"
              type="number"
              min="0"
              max="255"
              value={this.state.b}
              onChange={e => this.handleChange(e, 'b')}
            />
          </div>
          <div className="ph2 w-25">
            <Input
              label="A"
              size="small"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={this.state.a}
              onChange={e => this.handleChange(e, 'a')}
            />
          </div>
        </div>
      </div>
    )
  }
}

RGBInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
}

export default RGBInput
