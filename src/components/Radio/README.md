Default

```js
initialState = {
  checkedRadioValue: 'option-2',
}

function onChange(e, value) {
  console.log('value', value)
  setState({
    checkedRadioId: value,
  })
}

<div>
  <Radio
    id="radio-1"
    checked={state.checkedRadioValue}
    label="Opção 1"
    name="radio-group"
    onChange={onChange}
    value="option-1"
  />
  <Radio
    id="radio-2"
    checked={state.checkedRadioValue}
    label="Opção 2"
    name="radio-group"
    onChange={onChange}
    value="option-2"
  />
  <Radio
    id="radio-3"
    checked={state.checkedRadioValue}
    label="Opção 3"
    name="radio-group"
    onChange={onChange}
    value="option-3"
  />
</div>
```
