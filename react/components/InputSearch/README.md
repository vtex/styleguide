```js
initialState = { value1: '', value2: '', value3: '' }
;<div>
  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value2)
    }}
  >
    <InputSearch
      placeholder="Search..."
      value={state.value2}
      size="large"
      onChange={e => setState({ value2: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value2)
      }}
    />
  </form>
</div>
```