Master

```js
initialState = { isChecked: true };
<div>
  <Checkbox
    checked={state.isChecked}
    onChange={e => setState(prevState => ({ isChecked: !prevState.isChecked }))}
    id="master-checkbox-0"
    label="Checked"
    name="master-checkbox-group"
    value="option-0"
    />
</div>
```

Default

```js
initialState = { defaultCheckboxes: ['option-0'] };

function handleChange(e) {
  let checkBoxes = state.defaultCheckboxes.slice()
  let valueIndex = checkBoxes.indexOf(e.target.value)
  if (valueIndex === -1) {
    checkBoxes = checkBoxes.concat(e.target.value)
  } else {
    checkBoxes.splice(valueIndex, 1)
  }
  setState({
    defaultCheckboxes: checkBoxes,
  })
};

<div>
  <Checkbox
    checked={state.defaultCheckboxes.indexOf('option-0') !== -1}
    id="default-checkbox-0"
    label="Option 0"
    name="default-checkbox-group"
    onChange={e => handleChange(e)}
    value="option-0"
  />
  <Checkbox
    checked={state.defaultCheckboxes.indexOf('option-1') !== -1}
    id="default-checkbox-1"
    label="Option 1"
    name="default-checkbox-group"
    onChange={e => handleChange(e)}
    value="option-1"
    />
</div>
```

Disabled

```js
initialState = { disabledCheckboxes: ['option-0'] };
<div>
  <Checkbox
    checked={state.disabledCheckboxes.indexOf('option-0') !== -1}
    disabled
    id="disabled-checkbox-0"
    label="Option 0"
    name="disabledcheckbox-group"
    onChange={() => {}}
    value="option-0"
  />
  <Checkbox
    checked={state.disabledCheckboxes.indexOf('option-1') !== -1}
    disabled
    id="disabled-checkbox-1"
    label="Option 1"
    name="disabled-checkbox-group"
    onChange={() => {}}
    value="option-1"
    />
</div>
```

