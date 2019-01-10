#### Select component

_Added in v8_

<p class="f6">(Wrapper for [`react-select`](https://react-select.com/).)</p>

Select component that supports being used via controlled props

Simple

```js
const options = [
  {
    value: { id: 0, name: 'first-option' },
    label: 'First Option',
  },
  {
    value: { id: 1, name: 'second-option' },
    label: 'Second Option',
  },
]

;<div>
  <div className="mb5">
    <Select
      value={options[0]}
      size="small"
      isMulti={true}
      label="Small"
      options={options}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
      onSearchInputChange={value => {
        console.log('[Select] onSeachInputChange: ' + value)
      }}
    />
  </div>
  <div className="mb5">
    <Select
      value={options[0]}
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
      value={options[0]}
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
const options = [
  {
    value: 'first-option',
    label: 'First Option',
  },
  {
    value: 'second-option',
    label: 'Second Option',
  },
]

;<div>
  <Select
    label="Single option select"
    options={options}
    isMulti={false}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
  <div className="mv5">
    <Select
      label="Clearable Single option select"
      options={options}
      isClearable={true}
      isMulti={false}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
    />
  </div>
</div>
```

Multi Select

```js
const options = [{
  value: 'first-option',
  label: 'Preselected',
},
{
  value: 'second-option',
  label: 'Select me!',
}];

<div>
  <Select
    label="Label"
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
const options = [
  {
    value: 'first-option',
    label: 'First Option',
  },
  {
    value: 'second-option',
    label: 'Second Option',
  },
]

;<div>
  <Select
    label="Label"
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
const options = [
  {
    value: 'first-option',
    label: 'First Option',
  },
  {
    value: 'second-option',
    label: 'Second Option',
  },
]

;<div>
  <Select
    isDisabled={true}
    label="Label"
    options={options}
    isMulti={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
  <div className="mv5">
    <Select
      isDisabled={true}
      label="Label"
      options={options}
      isMulti={true}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
      value={[
        {
          value: 'first-option',
          label: 'First Option',
        },
      ]}
    />
  </div>
</div>
```

Loading state

```js
const options = [
  {
    value: 'first-option',
    label: 'First Option',
  },
  {
    value: 'second-option',
    label: 'Second Option',
  },
]

;<div>
  <Select
    isLoading={true}
    label="Label"
    options={options}
    isMulti={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```