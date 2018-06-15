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
      {value:'value1', label: (
        <div>
          <div className="b">L</div>
          <div className="gray">Lightness</div>
        </div>
      )},
      {value:'value2', label: (
        <div>
          <div className="b">a*</div>
          <div className="gray">Green–Red</div>
        </div>
      ), disabled: true},
      {value:'value3', label: (
        <div>
          <div className="b">b*</div>
          <div className="gray">Blue–Yellow</div>
        </div>
      )},
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
initialState = { value: 'cyan' };

<RadioGroup
  name="colors"
  options={[
    {value: 'cyan', label: 'Cyan'},
    {value: 'magenta', label: 'Magenta'},
    {value: 'yellow', label: 'Yellow'},
    {value: 'key', label: 'Black'},
  ]}
  value={state.value}
  onChange={e=>setState({value:e.currentTarget.value})}
/>
```
