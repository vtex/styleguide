#### Default with placeholder

```js
class ExampleInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    return <Input {...this.props} onChange={this.handleChange} value={this.state.value} />
  }
};
<ExampleInput placeholder="Type me…"/>
```

#### Disabled

```js
class ExampleInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    return <Input {...this.props} onChange={this.handleChange} value={this.state.value} />
  }
};
<ExampleInput placeholder="Disabled text" disabled/>
```

#### Error

```js
class ExampleInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    return <Input {...this.props} onChange={this.handleChange} value={this.state.value} />
  }
};
<ExampleInput errorMessage="Invalid field"/>
```

#### Types

**Number, step 2**

```js
<Input type="number" step="2" placeholder="Numbers only…" />
```

**Date**

```js
<Input type="date" />
```

**File**

```js
<Input type="file" />
```

**Month**

```js
<Input type="month" />
```

**Password**

```js
<Input type="password" />
```

**Time**

```js
<Input type="time" />
```
