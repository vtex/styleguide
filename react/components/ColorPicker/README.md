Color Picker lets users select a color value using three differenets way: RGBA (Red, green, blue and alpha properties), [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) (Hue, saturation, value and alpha properties) or hexadecimal (color code abstraction to rgb values).

### 👍 Dos
- Use color picker in cenarios that user needs to choose an specific color value.
- You can use multiples color picker components, if you need more than one color to be setted.

### 👎 Don'ts
- Don’t use color picker in cenarios that users must only reference a color name.

#### Simple ColorPicker

```js
class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.state = { color:{ hex: '#141E7A' }, history: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(color) {
    const { history } = this.state
    history.push(color)
    this.setState({
      history,
      color,
    })
  }

  render() {
    return (
      <div>
        <div className="w-50">
          <ColorPicker
            color={this.state.color}
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
      </div>
    )
  }
}

;<ColorPickerExample />
```

#### ColorPicker with Title

```js
class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.state = { color:{ hex: '#141E7A' }, history: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(color) {
    const { history } = this.state
    history.push(color)
    this.setState({
      history
    })
  }

  render() {
    return (
      <div>
        <div className="w-50">
          <ColorPicker
            color={this.state.color}
            title="Color Title"
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
      </div>
    )
  }
}

;<ColorPickerExample />
```
#### Multiples ColorPickers

```js
const black = require('./index.js').COLOR

class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
        colorDefault: { hex: '#141E7A' },
        colorActive: { hex: '#141E7A' },
        colorHover:{ hex: '#141E7A' },
        history: [],
      }
  }

  render() {
    return (
      <div>
        <div className="w-50">
          <ColorPicker
            color={this.state.colorDefault}
            colorHistory={this.state.history}
            onChange={ (color) => this.handleChange(color, 'colorDefault') }
          />
        </div>
        <div className="w-50">
          <ColorPicker
            color={this.state.colorActive}
            colorLabel="Active"
            colorHistory={this.state.history}
            onChange={ (color) => this.handleChange(color, 'colorActive') }
          />
        </div>
        <div className="w-50">
          <ColorPicker
            color={this.state.colorHover}
            colorLabel="Hover"
            colorHistory={this.state.history}
            onChange={ (color) => this.handleChange(color, 'colorHover') }
          />
        </div>
      </div>
    )
  }

  handleChange(color, picker) {
    const { history } = this.state
    history.push(color)
    this.setState({
      history,
      [picker]: color,
    })
  }
}

;<ColorPickerExample />
```

#### ColorPicker Disabled

```js
class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.state = { color:{ hex: '#141E7A' }, history: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(color) {
    const { history } = this.state
    history.push(color)
    this.setState({
      history
    })
  }

  render() {
    return (
      <div>
        <div className="w-50">
          <ColorPicker
            color={this.state.color}
            disabled
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
      </div>
    )
  }
}

;<ColorPickerExample />
```
