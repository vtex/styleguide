#### A ColorPicker lets the user select a single color.

### 👍 Dos
- Select single color to use in backgrounds, on hover actions, active classes, etc.
- Select single color from multiples inputs, such RGB, HSV, Hex inputs.

### 👎 Don'ts
- For complex color compositions, such as a linear gradient.


#### Simple ColorPicker

```js
const ColorPicker = require('./index.js').default

class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = { history: [] }
  }

  render() {
    return (
      <div>
        <div className="w-50">
          <ColorPicker
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
        <div className="w-50">
          <ColorPicker
            colorState="Active"
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
        <div className="w-50">
          <ColorPicker
            colorState="Hover"
            colorHistory={this.state.history}
            onChange={ this.handleChange }
          />
        </div>
      </div>
    )
  }

  handleChange(color) {
    const { history } = this.state
    history.push(color)
    this.setState({
      history
    })
  }
}

;<ColorPickerExample />
```

#### ColorPicker with Title

```js
const ColorPicker = require('./index.js').default

class ColorPickerExample extends React.Component {
  constructor() {
    super()
    this.state = { history: [] }

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
