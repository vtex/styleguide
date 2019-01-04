#### Select component

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
  <Select
    label="Simple select"
    options={options}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

Multi

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
    label="Multi select"
    options={options}
    isMulti={true}
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
</div>
```