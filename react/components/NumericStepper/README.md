#### This is a special case of a regular numerical input where you expect the user to modify it by a few incremental steps.

### 👍 Dos

- Do use a default value. If you don't know which do use, use 1. This way the user is not forced to type something and then click the buttons.
- The lean mode is intended to be used on lists, that: have a high density of content, and where being able to type the number is not important. It is especially useful in mobile contexts or cramped containers.

### 👎 Don'ts

- Don't use for big numbers. Steppers make more sense for small numbers that might be adjusted with a few clicks.
- Don't stretch it too much, the buttons in the extremes and the centered label will look really weird.

### Related components

In doubt, use a regular <a href="#/Components/Forms/Input">Input</a>.

Sizes

```js
initialState = {
  value1: 0,
  value2: 0,
  value3: 0,
}

;<React.Fragment>
  <div className="mb5 flex">
    <NumericStepper
      label="Small"
      size="small"
      value={state.value1}
      onChange={event => setState({ value1: event.value })}
    />
  </div>
  <div className="mb5 flex">
    <NumericStepper
      label="Regular"
      value={state.value2}
      onChange={event => setState({ value2: event.value })}
    />
  </div>
  <div className="mb5 flex">
    <NumericStepper
      label="Large"
      size="large"
      value={state.value3}
      onChange={event => setState({ value3: event.value })}
    />
  </div>
</React.Fragment>
```

Minimum and maximum values

```js
initialState = {
  value1: 1,
  value2: 2,
  value3: 0,
}

;<React.Fragment>
  <div className="mb5">
    <NumericStepper
      label="Minimum value = 1"
      minValue={1}
      value={state.value1}
      onChange={event => setState({ value1: event.value })}
    />
  </div>
  <div className="mb5">
    <NumericStepper
      label="Minimum 2, maximum 6"
      minValue={2}
      maxValue={6}
      value={state.value2}
      onChange={event => setState({ value2: event.value })}
    />
  </div>
</React.Fragment>
```

Styling

```js
initialState = {
  value1: 1,
  value2: 1,
  value3: 1,
  value4: 1,
}

;<React.Fragment>
  <div className="mb5">
    <NumericStepper
      label="Default"
      minValue={1}
      value={state.value1}
      onChange={event => setState({ value1: event.value })}
    />
  </div>
  <div className="mb5">
    <NumericStepper
      label="Lean mode"
      minValue={1}
      lean
      value={state.value2}
      onChange={event => setState({ value2: event.value })}
    />
  </div>
  <div className="mb5">
    <NumericStepper
      label="Read Only"
      minValue={1}
      readOnly
      value={state.value3}
      onChange={event => setState({ value3: event.value })}
    />
  </div>
  <div className="mb5">
    <NumericStepper
      label="lean Read Only"
      minValue={1}
      lean
      readOnly
      value={state.value4}
      onChange={event => setState({ value4: event.value })}
    />
  </div>
</React.Fragment>
```

Box types

Used to make the component fit the parent container's width, either larger or smaller than the default size.

```js
<React.Fragment>
  <div className="mb5">
    <NumericStepper
      label="Default"
      size="small"
      value={1}
      onChange={() => {}}
    />
  </div>
  <div className="mb5">
    <NumericStepper size="large" value={1} onChange={() => {}} />
  </div>
  <div className="mb5 w4 ba b--gray" style={{ borderStyle: 'dotted' }}>
    <NumericStepper
      label="Block"
      size="small"
      value={1}
      block
      onChange={() => {}}
    />
  </div>
  <div className="mb5 ba b--gray" style={{ borderStyle: 'dotted' }}>
    <NumericStepper size="large" value={1} block onChange={() => {}} />
  </div>
</React.Fragment>
```
