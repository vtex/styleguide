Default

```js
initialState = { checked: true, checked2: false };
<div>
  <div className="dib">
    <Toggle
      label="Checked"
      checked={state.checked}
      onClick={(e) => setState((prevState) => ({ checked: !prevState.checked }))} />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Unchecked"
      checked={state.checked2}
      onClick={(e) => setState((prevState) => ({ checked2: !prevState.checked2 }))} />
  </div>
</div>
```

Semantic
```js
initialState = { checked: true, checked2: false };
<div>
  <div className="dib">
    <Toggle
      label="Checked"
      semantic
      checked={state.checked}
      onClick={(e) => setState((prevState) => ({ checked: !prevState.checked }))} />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Unchecked"
      semantic
      checked={state.checked2}
      onClick={(e) => setState((prevState) => ({ checked2: !prevState.checked2 }))} />
  </div>
</div>
```

Disabled

```js
<div>
  <div className="dib">
    <Toggle disabled checked label="Checked" />
  </div>
  <br/>
  <div className="dib">
    <Toggle disabled label="Unchecked"/>
  </div>
</div>
```
