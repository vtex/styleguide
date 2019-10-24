#### A Select lets the user pick one or more options from a list.

### Options

The options prop accepts the following types:

```ts
type Options = {
  label: string
  value: string | {}
}[]

type GroupedOptions = {
  label: string
  options: Options
}
```

### 👍 Dos

- Mind the order of the options, like putting the more probable one to be selected at the top. In doubt, sort them alphanumerically (from A to Z and from 0 to 9).

### 👎 Don'ts

- If there are just a few options to choose from (like 4), consider a **Radio Group** (for single select) or **Checkbox** (for multi select).

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
      defaultValue={options[0]}
      size="small"
      multi={true}
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
      defaultValue={options[0]}
      multi={true}
      label="Regular"
      options={options}
      onChange={values => {
        console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
      }}
    />
  </div>
  <div className="mb5">
    <Select
      defaultValue={options[0]}
      size="large"
      multi={true}
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
    label="Label"
    options={options}
    multi={false}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

No label

```js
const options = [
  {
    value: 'first-option',
    label: 'First option',
  },
  {
    value: 'second-option',
    label: 'Second option',
  },
]

;<div>
  <Select
    options={options}
    multi={true}
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
    multi={true}
    errorMessage="Required!"
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

With creatable option

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
    multi={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
    creatable
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
    disabled={true}
    label="Label"
    options={options}
    multi={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
  <div className="mv5">
    <Select
      disabled={true}
      label="Label"
      options={options}
      multi={true}
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
    loading={true}
    label="Label"
    options={options}
    multi={true}
    onChange={values => {
      console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
    }}
  />
</div>
```

Using ref

```js
const Button = require('../Button').default

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

const ref = React.createRef()

;<div>
  <Select
    ref={ref}
    label="Click in the button below to focus on this Select"
    options={options}
  />
  <div className="pt2">
    <Button size="small" onClick={() => ref.current.focus()}>
      Focus on input
    </Button>
  </div>
</div>
```
