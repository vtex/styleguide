#### A Checkbox represents a need for the user to do a choice that is binary, required and independent from other choices.

### 👍 Dos

- Initialize it with a default value that makes sense to your needs.
- Use a text label, which should be intuitive and provide sufficient context for the user take that decision.

### 👎 Don'ts

- Don't use negative labels because they are harder to interpret.
- Don't implement an "autosave" behavior: checkboxes should always require the use of a button (like "SAVE" or "OK") to commit the choice.

### Related components

- Consider using a <a href="#/Components/Forms/Toggle">Toggle</a> if the choice could be read as "turning something on or off".
- If the checkboxes are related, you can consider the use of a <a href="#/Components/Forms/CheckboxGroup">CheckboxGroup</a>

Default

```js
initialState = { check1: true, check2: false, check3: false }
;<div>
  <div className="mb3">
    <Checkbox
      checked={state.check1}
      id="option-0"
      label="Checked"
      name="default-checkbox-group"
      onChange={e => setState({ check1: !state.check1 })}
      value="option-0"
    />
  </div>
  <div className="mb3">
    <Checkbox
      checked={state.check2}
      partial={true}
      id="option-3"
      label="Partial"
      name="default-checkbox-group"
      onChange={e => setState({ check2: !state.check2 })}
      value="option-3"
    />
  </div>
  <Checkbox
    checked={state.check3}
    id="option-1"
    label="Not checked"
    name="default-checkbox-group"
    onChange={e => setState({ check3: !state.check3 })}
    value="option-1"
  />
</div>
```

Disabled

```js
<div>
  <div className="mb3">
    <Checkbox
      checked={true}
      disabled
      label="Option 1"
      id="option-1"
      name="disabled-checkbox-group"
      onChange={() => {}}
      value="option-1"
    />
  </div>
  <div className="mb3">
    <Checkbox
      checked={false}
      partial={true}
      disabled
      label="Option 2"
      id="option-2"
      name="disabled-checkbox-group"
      onChange={() => {}}
      value="option-2"
    />
  </div>
  <Checkbox
    checked={false}
    disabled
    label="Option 3"
    id="option-3"
    name="disabled-checkbox-group"
    onChange={() => {}}
    value="option-3"
  />
</div>
```

Without label

```js
initialState = { check1: true, check2: false, check3: false }
;<div>
  <div className="mb3">
    <Checkbox
      checked={state.check1}
      name="disabled-checkbox-group"
      onChange={e => setState({ check1: !state.check1 })}
      value="option-0"
      id="option-0"
    />
  </div>
  <div className="mb3">
    <Checkbox
      checked={state.check2}
      partial={true}
      name="disabled-checkbox-group"
      onChange={e => setState({ check2: !state.check2 })}
      value="option-1"
      id="option-1"
    />
  </div>
  <Checkbox
    checked={state.check3}
    name="disabled-checkbox-group"
    onChange={e => setState({ check3: !state.check3 })}
    value="option-2"
    id="option-2"
  />
</div>
```
