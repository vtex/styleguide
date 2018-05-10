Default

```js
class RadioExample extends React.Component {
  constructor() {
    super()

    this.state = {
      checkedRadioValue: 'option-1',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({
      checkedRadioValue: value,
    })
  }

  render() {
    return (
      <div>
        <Radio
          checked={this.state.checkedRadioValue === 'option-0'}
          id="radio-0"
          label="Opção 0"
          name="radio-group"
          onChange={this.handleChange}
          value="option-0"
        />
        <Radio
          checked={this.state.checkedRadioValue === 'option-1'}
          id="radio-1"
          label="Opção 1"
          name="radio-group"
          onChange={this.handleChange}
          value="option-1"
        />
        <Radio
          checked={this.state.checkedRadioValue === 'option-2'}
          id="radio-2"
          label="Opção 2"
          name="radio-group"
          onChange={this.handleChange}
          value="option-2"
        />
        <Radio
          checked={this.state.checkedRadioValue === 'option-3'}
          disabled
          id="radio-3"
          label="Opção 3"
          name="radio-group"
          onChange={this.handleChange}
          value="option-3"
        />
      </div>
    )
  }
}
;<RadioExample />
```
