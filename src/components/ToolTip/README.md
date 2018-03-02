#### Default

```js
<ToolTip html={'ola 8-)'} arrow interactive>I have a simple tooltip</ToolTip>
```

#### Opened & interactive
```js
class TipExample extends React.Component {
  constructor() {
    super()
    this.state = { value: 'I am open & interactive' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(data) {
    this.setState({value: data.target.value})
  }

  render() {
    const htmlContent = (
      <div>
        <label className="mr3">Label</label>
        <input value={this.state.value} type="text" onChange={this.handleChange} />
      </div>
    )

    return (
      <ToolTip open html={htmlContent} arrow interactive>{this.state.value}</ToolTip>
    )
  }
};
<TipExample />
```
