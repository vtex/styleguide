Default

```js
initialState = {
  value: ""
};
<div>
  <div className="mb6">
    <Textarea label="With a label">I haz content</Textarea>
  </div>
  <div className="mb6">
    <Textarea disabled label="Disabled">
      Cant touch this!
    </Textarea>
  </div>
  <div className="mb6">
    <Textarea
      label="With helper"
      helpText={<span>Your help text goes here!</span>}
    />
  </div>
  <div className="mb6">
    <Textarea label="With error" error errorMessage="Somehow wrong" />
  </div>
  <div className="mb6">
    <Textarea
      label="Controlling text"
      onChange={e => setState({ value: e.target.value.trim() })}
      value={state.value}
    />
  </div>
</div>;
```
