Default

```js
initialState = { check1: true, check2: false };
<div>
  <Checkbox
    checked={state.check1}
    id="option-0"
    label="Option 0"
    name="default-checkbox-group"
    onChange={e => setState({ check1: !state.check1 })}
    value="option-0"
  />
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
initialState = { check1: true, check2: false };
<div>
  <Checkbox
    checked={state.check1}
    disabled
    label="Option 0"
    name="disabled-checkbox-group"
    onChange={() => {}}
    value="option-0"
  />
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

