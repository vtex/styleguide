Default

```js
class ToggleExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }

    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle1'
        checked={this.state.checked}
        onChange={this.onChange}/>
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
<div> 
  <Toggle disabled id='toggle3'/>
</div>
```

Side by side

```js
class ToggleExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }

    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle4'
        checked={this.state.checked}
        onChange={this.onChange}/>
    )
  }
};
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
      <Toggle id='toggle5'
        semantic
        checked={this.state.checked}
        onChange={this.onChange}/>
    )
  }
};
<div>
  <ToggleExample />
  <br />
  <ToggleSemanticExample />
  <br />
  <Toggle disabled id='toggle6'/>
  <br />
</div>
```
