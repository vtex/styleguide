#### A Checkbox represents a need for the user to do a choice that is binary, required and independent from other choices.

### 👍 Dos

- Initialize it with a default value that makes sense to your needs.
- Use a text label, which should be intuitive and provide sufficient context for the user take that decision.

### 👎 Don'ts

- Don't use negative labels because they are harder to interpret.
- Don't implement an "autosave" behavior: checkboxes should always require the use of a button (like "SAVE" or "OK") to commit the choice.

### Related components

- Consider using a <a href="#toggle">Toggle</a> if the choice could be read as "turning something on or off".

Default

```js
initialState = { check1: true, check2: false }
;<div>
  <div className="mb3">
    <Checkbox
      checked={state.check1}
      id="option-0"
      label="Option 0"
      name="default-checkbox-group"
      onChange={e => setState({ check1: !state.check1 })}
      value="option-0"
    />
  </div>
  <Checkbox
    checked={state.check2}
    id="option-1"
    label="Option 1"
    name="default-checkbox-group"
    onChange={e => setState({ check2: !state.check2 })}
    value="option-1"
  />
</div>
```

Disabled

```js
initialState = { check1: true, check2: false }
;<div>
  <div className="mb3">
    <Checkbox
      checked={state.check1}
      disabled
      label="Option 0"
      name="disabled-checkbox-group"
      onChange={() => {}}
      value="option-0"
    />
  </div>
  <Checkbox
    checked={state.check2}
    disabled
    label="Option 1"
    name="disabled-checkbox-group"
    onChange={() => {}}
    value="option-1"
  />
</div>
```
