Default

```js
class ToggleExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: true, checked2: true }

    this.onClick = this.onClick.bind(this)
    this.onClick2 = this.onClick2.bind(this)
  }

  onClick() {
    this.setState((prevState) => ({ checked: !prevState.checked }))
  }
  onClick2() {
    this.setState((prevState) => ({ checked2: !prevState.checked2 }))
  }

  render() {
    return (
      <div className="flex flex-row">
        <Toggle id='toggleNoLabel'
          checked={this.state.checked}
          onClick={this.onClick}/>
        <span className="mr8" />
        <Toggle id='toggleWithLabel'
          checked={this.state.checked2}
          onClick={this.onClick2}>With label</Toggle>
      </div>
    )
  }
};
<ToggleExample />
```

Semantic
```js
class ToggleSemanticExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: false }

    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle2'
        semantic
        checked={this.state.checked}
        onChange={this.onChange}/>
    )
  }
};
<ToggleSemanticExample />
```

Disabled

```js
  <div className="flex flex-row">
    <Toggle disabled id='toggle3'/>
    <span className="mr8" />
    <Toggle disabled id='toggle3.3'><span className="silver">With label</span></Toggle>
  </div>
```
