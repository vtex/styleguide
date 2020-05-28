Sizes

```js
initialState = { value1: '', value2: '', value3: '' }
;<div>
  <InputSearch
    placeholder="Search..."
    value={state.value1}
    label="Small"
    size="small"
    onChange={e => setState({ value1: e.target.value })}
    onSubmit={e => {
      e.preventDefault()
      console.log('submited! search this: ', e.target.value)
    }}
  />
  <br />
  <InputSearch
    placeholder="Search..."
    value={state.value2}
    label="Regular"
    size="regular"
    onChange={e => setState({ value2: e.target.value })}
    onSubmit={e => {
      e.preventDefault()
      console.log('submited! search this: ', e.target.value)
    }}
  />
  <br />
  <InputSearch
    placeholder="Search..."
    value={state.value3}
    label="Large"
    size="large"
    onChange={e => setState({ value3: e.target.value })}
    onSubmit={e => {
      e.preventDefault()
      console.log('submited! search this: ', e.target.value)
    }}
  />
</div>
```
