Default

```js
<RadioGroup
  name="test"
  options={[
    {value:'value1', label: 'Option 1'},
    {value:'value2', label: 'Option 2', disabled: true},
    {value:'value3', label: 'Option 3'},
  ]}
  value="value1"
/>
```

Example: Working React Component

```js
class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 'leonardo',
    }

    this.handleChange = this.handleChange.bind(this)
  }
   
  handleChange(event,value){
    this.setState({
      value,
    })
  }

  render(){
    return (
      <RadioGroup
        name="painters"
        options={[
          {value: 'leonardo', label: 'Leonardo'},
          {value: 'donatello', label: 'Donatello'},
          {value: 'michelangelo', label: 'Michelangelo'},
          {value: 'raphael', label: 'Raphael'},
        ]}
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

<Example/>
```
