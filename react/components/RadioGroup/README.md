Default

```js
<div>
  <RadioGroup
    name="radioGroupExample"
    options={[
      {value:'value1', label: 'Red'},
      {value:'value2', label: 'Green'},
      {value:'value3', label: 'Blue'},
    ]}
    value="value1"
  />

  <br/>
  <div>One option disabled</div>
  <br/>

  <RadioGroup
    name="radioGroupExample2"
    options={[
      {value:'value1', label: 'Lightness'},
      {value:'value2', label: 'Green–Red', disabled: true},
      {value:'value3', label: 'Blue–Yellow'},
    ]}
    value="value1"
  />

  <br/>
  <div>Entire group disabled</div>
  <br/>

  <RadioGroup
    name="radioGroupExample3"
    disabled
    options={[
      {value:'value1', label: 'Hue'},
      {value:'value2', label: 'Saturation'},
      {value:'value3', label: 'Value'},
    ]}
    value="value1"
  />
</div>
```

Example: Working React Component

```js
class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 'cyan',
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
          {value: 'cyan', label: 'Cyan'},
          {value: 'magenta', label: 'Magenta'},
          {value: 'yellow', label: 'Yellow'},
          {value: 'key', label: 'Black'},
        ]}
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

<Example/>
```
