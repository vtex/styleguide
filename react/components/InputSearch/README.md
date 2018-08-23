Search

```js
initialState = { value1: '', value2: '', value3: '' }
;<div>
  <div className="mb5">
    <InputSearch
      inputProps={{
        placeholder: 'Search...',
        type: 'search',
        value: state.value1,
        onChange: e => setState({ value1: e.target.value }),
      }}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value1)
      }}
    />
  </div>
  <div className="mb5">
    <InputSearch
      inputProps={{
        placeholder: 'Search...',
        type: 'search',
        value: state.value2,
        size: 'large',
        onChange: e => setState({ value2: e.target.value }),
      }}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value2)
      }}
    />
  </div>
  <div className="mb5">
    <InputSearch
      inputProps={{
        placeholder: 'Search...',
        type: 'search',
        value: state.value3,
        size: 'x-large',
        onChange: e => setState({ value3: e.target.value }),
      }}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value3)
      }}
    />
  </div>
</div>
```
