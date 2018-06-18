Default

```js
<div>
  <Tabs
    options={[{ id: "1", value: "label 1" }, { id: "2", value: "label 2" }, { id: "3", value: "label 3" }]}
    active="1" />
</div>
```

Working example

```js
initialState = { active: "1" };
<div>
  <div>
    <Tabs
      options={[{ id: "1", value: "label 1" }, { id: "2", value: "label 2" }, { id: "3", value: "label 3" }]}
      active={state.active}
      onClick={e => {
        setState({ active: e.target.id });
      }}
    />
  </div>
  {state.active === "1" && <p>Content 1</p>}
  {state.active === "2" && <p>Content 2</p>}
  {state.active === "3" && <p>Content 3</p>}
</div>;
```
