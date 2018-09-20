Search

```js
initialState = { value1: 'Passw0rd', value2: 'Passw0rd', value3: 'Passw0rd' }
;<div>
  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value1)
    }}
  >
    <PasswordInput value={state.value1} onChange={e => setState({ value1: e.target.value })} />
  </form>

  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value2)
    }}
  >
    <PasswordInput
      value={state.value2}
      size="large"
      onChange={e => setState({ value2: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value2)
      }}
    />
  </form>

  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value3)
    }}
  >
    <PasswordInput
      value={state.value3}
      size="x-large"
      onChange={e => setState({ value3: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value3)
      }}
    />
  </form>
</div>
```
