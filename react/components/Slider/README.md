Simple slider

```jsx
<Slider
  onChange={([value]) => {}}
  min={0}
  max={99}
  step={1}
  disabled={false}
  defaultValues={[0]}
  alwaysShowCurrentValue={false}
  formatValue={a => a + 1}
/>
```

Range slider

```jsx
<Slider
  onChange={([leftValue, rightValue]) => {}}
  min={0}
  max={99}
  step={1}
  disabled={false}
  defaultValues={[0, 50]}
  alwaysShowCurrentValue={false}
  formatValue={a => a + 1}
  range
/>
```

Slider with programmatically controlled values

```js
const Input = require('../Input').default
const Button = require('../Button').default

const [inputValues, setInputValues] = React.useState({ left: '0', right: '99' })
const [values, setValues] = React.useState({ left: 0, right: 99 })

const { left, right } = values

const handleInputChange = event => {
  event.persist()

  if (event.target.name === 'left') {
    setInputValues({ ...inputValues, left: event.target.value })
  } else {
    setInputValues({ ...inputValues, right: event.target.value })
  }
}

const handleSubmit = () => {
  const { left: leftValueInput, right: rightValueInput } = inputValues

  const left = Math.max(parseInt(leftValueInput) || 0, 0)
  const right = Math.min(parseInt(rightValueInput) || 99, 99)

  if (left > right) {
    return
  }

  setValues({
    left,
    right,
  })
}

;<>
  <div className="mb5">
    <Input
      name="left"
      placeholder="Left"
      size="small"
      label="Small"
      onChange={handleInputChange}
      value={inputValues.left}
    />
  </div>
  <div className="mb5">
    <Input
      name="right"
      placeholder="Right"
      size="small"
      label="Small"
      onChange={handleInputChange}
      defaultValue="99"
      value={inputValues.right}
    />
  </div>
  <Button onClick={handleSubmit} variation="primary">
    Submit
  </Button>
  <Slider
    onChange={values => {
      setValues({
        left: values[0],
        right: values[1],
      })
    }}
    min={0}
    max={99}
    step={1}
    disabled={false}
    alwaysShowCurrentValue={false}
    formatValue={a => a + 1}
    values={[left, right]}
    range
  />
</>
```
