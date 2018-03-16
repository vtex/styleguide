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
    const options = [
      {value: 'v1', label: 'Value 1'},
      {value: 'v2', label: 'Value 2'},
      {value: 'v3', label: 'Value 3'},
      {value: 'v4', label: 'Value 4'}
    ]
    return (
      <Dropdown 
        placeholder='Placeholder'
        options={options}
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
    const options = [
      {value: 'v1', label: 'Value 1'},
      {value: 'v2', label: 'Value 2'},
      {value: 'v3', label: 'Value 3'},
      {value: 'v4', label: 'Value 4'}
    ]
    return (
      <Dropdown 
        placeholder='Placeholder'
        options={options}
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    )
  }
};
<Example disabled />
```
