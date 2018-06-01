Default

```js
initialState = { checkedRadioValue: 'option-1' },
<div>
  <Radio
   checked={state.checkedRadioValue === 'option-0'}
   id="radio-0"
   label="Opção 0"
   name="radio-group"
   onChange={e => setState({ checkedRadioValue: 'option-0' })}
   value="option-0"
  />
  <Radio
   checked={!state.checkedRadioValue || state.checkedRadioValue === 'option-1'}
   id="radio-1"
   label="Opção 1"
   name="radio-group"
   onChange={e => setState({ checkedRadioValue: 'option-1' })}
   value="option-1"        
  />
  <Radio
    checked={state.checkedRadioValue === 'option-2'}
    id="radio-2"
    label="Opção 2"
    name="radio-group"
    onChange={e => setState({ checkedRadioValue: 'option-2' })}
    value="option-2"
  />
  <Radio
    checked={state.checkedRadioValue === 'option-3'}
    disabled
    id="radio-3"
    label="Opção 3"
    name="radio-group"
    onChange={e => setState({ checkedRadioValue: 'option-3' })}
    value="option-3"
  />
</div>
```