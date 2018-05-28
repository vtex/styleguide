Default

```js
<div>
  <Tab label="label 1" active />
  <Tab label="label 2" />
  <Tab label="label 3" />
</div>
```

Working example

```js
initialState = { active: 1 }
;<div>
  <div>
    <Tab
      label="label 1"
      active={state.active === 1}
      onClick={() => setState({ active: 1 })}
    />
    <Tab
      label="label 2"
      active={state.active === 2}
      onClick={() => setState({ active: 2 })}
    />
    <Tab
      label="label 3"
      active={state.active === 3}
      onClick={() => setState({ active: 3 })}
    />
  </div>
  {state.active === 1 && <p>Content 1</p>}
  {state.active === 2 && <p>Content 2</p>}
  {state.active === 3 && <p>Content 3</p>}
</div>
```
