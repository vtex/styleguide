Sizes 

```js
initialState = {
  value1: 0,
  value2: 0,
  value3: 0,
};

<React.Fragment>
  <div className="mb5 flex">
    <NumericStepper
      label="Regular"
      value={state.value1}
      onChange={value => setState({ value1: value })}
    />
    <Input size="regular" value="oi" label="Label" />
  </div>
  <div className="mb5 flex">
    <NumericStepper
      label="Large"
      size="large"
      value={state.value2}
      onChange={value => setState({ value2: value })}
    />
    <Input size="large" value="oi" label="Label" />
  </div>
  <div className="mb5 flex">
    <NumericStepper
      label="Extra large"
      size="x-large"
      value={state.value3}
      minSize="1"
      maxSize="5"
      onChange={value => setState({ value3: value })}
    />
    <Input size="x-large" value="oi" label="Label" />
  </div>
  <div className="w-50">
    <NumericStepper
      bloc
    />
  </div>
</React.Fragment>
```
