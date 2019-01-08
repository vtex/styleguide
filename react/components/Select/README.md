#### Select component
_Added in v8_

<p class="f6">(Wrapper for [`react-select`](https://react-select.com/).)</p>

Select component that supports being used via controlled props

Simple
```js
const options = [{
  value: 'first-option',
  label: 'First Option',
},
{
  value: 'second-option',
  label: 'Second Option',
}];

<div>
  <div className="mb5">
    <Select
      size="small"
      isMulti={true}
      label="Small"
      options={options}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
    />
  </div>
  <div className="mb5">
    <Select
      isMulti={true}
      label="Regular"
      options={options}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
    />
  </div>
  <div className="mb5">
    <Select
      size="large"
      isMulti={true}
      label="Large"
      options={options}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
    />
  </div>
</div>
```

Single

```js
const options = [{
  value: 'first-option',
  label: 'First Option',
},
{
  value: 'second-option',
  label: 'Second Option',
}];

<div>
  <Select
    label="Single option select"
    options={options}
    isMulti={false}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

With Error

```js
const options = [{
  value: 'first-option',
  label: 'First Option',
},
{
  value: 'second-option',
  label: 'Second Option',
}];

<div>
  <Select
    label="Select with error!"
    options={options}
    isMulti={true}
    errorMessage="Required!"
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

Disabled

```js
const options = [{
  value: 'first-option',
  label: 'First Option',
},
{
  value: 'second-option',
  label: 'Second Option',
}];

<div>
  <Select
    disabled={true}
    label="Multi select"
    options={options}
    isMulti={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
  <div className="mv5">
    <Select
      disabled={true}
      label="Multi select"
      options={options}
      isMulti={true}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
      value={[{
        value: 'first-option',
        label: 'First Option',
      }]}
    />
  </div>
</div>
```