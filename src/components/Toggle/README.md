Default

```js
class ToggleExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle5'
        checked={this.state.checked}
        onClick={this.onClick}/>
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

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle6'
        semantic
        checked={this.state.checked}
        onClick={this.onClick}/>
    )
  }
};
<ToggleSemanticExample />
```

Disabled

```js
<div> 
  <Toggle disabled id='toggle4'/>
</div>
```

Side by side

```js
class ToggleExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle5'
        checked={this.state.checked}
        onClick={this.onClick}/>
    )
  }
};
class ToggleSemanticExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: false }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }))
  }

  render() {
    return (
      <Toggle id='toggle6'
        semantic
        checked={this.state.checked}
        onClick={this.onClick}/>
    )
  }
};
<div>
  <ToggleExample />
  <br />
  <ToggleSemanticExample />
  <br />
  <Toggle disabled id='toggle7'/>
  <br />
</div>
```
