Dropdown

Active
```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        open: false,
        value: undefined,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({ value })
  }
    
  render() {
    return (
      <Dropdown 
        placeholder='Placeholder'
        options={['Value 1', 'Value 2', 'Value 3', 'Value 4']}
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    )
  }
};
<Example />
```

Disabled
```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      value: undefined,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({ value })
  }
    
  render() {
    return (
      <Dropdown 
        placeholder='Placeholder'
        options={['Value 1', 'Value 2', 'Value 3', 'Value 4']}
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    )
  }
};
<Example disabled />
```
