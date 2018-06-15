Default

```js
<div>
  <Tabs options={["label 1", "label 2", "label 3"]} active="label 1" />
</div>
```

Working example

```js
initialState = { active: "label 1" };
<div>
  <div>
    <Tabs
      options={["label 1", "label 2", "label 3"]}
      active={state.active}
      onClick={e => {
        setState({ active: e.target.id });
      }}
    />
  </div>
  {state.active === "label 1" && <p>Content 1</p>}
  {state.active === "label 2" && <p>Content 2</p>}
  {state.active === "label 3" && <p>Content 3</p>}
</div>;
```
