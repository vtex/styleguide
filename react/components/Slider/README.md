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

const [inputValues, setInputValues] = React.useState({ left: 0, right: 99 })
const [values, setValues] = React.useState({ left: 0, right: 99 })

const { left, right } = values

const handleInputChange = event => {
  if (event.target.name === 'left') {
    setInputValues({ ...inputValues, left: event.target.value })
  } else {
    setInputValues({ ...inputValues, right: event.target.value })
  }
}

const handleSubmit = (e) => {
  e.preventDefault()

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
  <form className="flex items-end mb5">
    <div className="mr5">
      <Input
        type="number"
        name="left"
        placeholder="Left"
        size="small"
        label="Left value"
        onChange={handleInputChange}
        value={inputValues.left}
      />
    </div>
    <div className="mr5">
      <Input
        name="right"
        placeholder="Right"
        size="small"
        label="Right value"
        onChange={handleInputChange}
        value={inputValues.right}
      />
    </div>
    <Button type="submit" onClick={handleSubmit} variation="primary" size="small">
      Submit
    </Button>
  </form>
  <Slider
    onChange={values => {
      const [left, right] = values
      setValues({ left, right })
      setInputValues({ left, right })
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
