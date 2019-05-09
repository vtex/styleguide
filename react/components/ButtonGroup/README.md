Button group receives a list of button components with an extra available prop `isActiveOfGroup` as a boolean to display an active state. This has to be handled on the app side.

```js
initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}>
        one
      </Button>,
      <Button
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}>
        two
      </Button>,
      <Button
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}>
        three
      </Button>,
    ]}
  />
</div>
```

```js
initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button
        size="small"
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}>
        one
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}>
        two
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}>
        three
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 4}
        onClick={() => setState({ active: 4 })}>
        four
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 5}
        onClick={() => setState({ active: 5 })}>
        five
      </Button>,
    ]}
  />
</div>
```
