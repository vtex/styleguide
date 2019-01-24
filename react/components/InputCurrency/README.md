```js
initialState = { value: '' }
;<div>
  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value)
    }}>
    <InputCurrency
      size="large"
      placeholder="Type a monetary value"
      currencySymbol="R$"
      decimalSeparator=","
      thousandSeparator="."
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
      onSubmit={e => {
        e.preventDefault()
        console.log(state.value)
      }}
    />
  </form>
</div>
```
