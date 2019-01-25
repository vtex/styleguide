#### InputCurrency is designed to be used when working with monetary values.

Sizes

```js
initialState = { value: undefined }
;<div>
  <div className="mb5">
    <InputCurrency
      label="Small"
      size="small"
      placeholder="Type a monetary value"
      currencySymbol="R$"
      decimalSeparator=","
      thousandSeparator="."
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
    />
  </div>
  <div className="mb5">
    <InputCurrency
      label="Regular"
      placeholder="Type a monetary value"
      currencySymbol="R$"
      decimalSeparator=","
      thousandSeparator="."
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
    />
  </div>
  <div className="mb5">
    <InputCurrency
      label="Large"
      size="large"
      placeholder="Type a monetary value"
      currencySymbol="R$"
      decimalSeparator=","
      thousandSeparator="."
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
    />
  </div>
</div>
```

Currency variations

```js
const Dropdown = require('../Dropdown/index.js').default
class InputExamples extends React.Component {
  constructor() {
    super()
    this.state = {
      value: undefined,
      selectedCurrency: JSON.stringify({
        currencySymbol: 'R$',
        decimalSeparator: ',',
        thousandSeparator: '.',
      }),
      currencyOptions: [
        {
          label: 'Real',
          value: JSON.stringify({
            currencySymbol: 'R$',
            decimalSeparator: ',',
            thousandSeparator: '.',
          }),
        },
        {
          label: 'US Dollar',
          value: JSON.stringify({
            currencySymbol: 'US$',
            decimalSeparator: '.',
            thousandSeparator: ',',
          }),
        },
        {
          label: 'Euro',
          value: JSON.stringify({
            currencySymbol: '€',
            decimalSeparator: ',',
            thousandSeparator: '.',
          }),
        },
        {
          label: 'Yen',
          value: JSON.stringify({
            currencySymbol: '¥',
            thousandSeparator: ',',
          }),
        },
      ],
    }
  }

  render() {
    const { currencyOptions, selectedCurrency, value } = this.state
    const { currencySymbol, decimalSeparator, thousandSeparator } = JSON.parse(
      selectedCurrency
    )

    return (
      <div className="w-40">
        <div className="mb5">
          <Dropdown
            label="Currency"
            options={currencyOptions}
            value={selectedCurrency}
            onChange={(e, value) => this.setState({ selectedCurrency: value })}
          />
        </div>
        <div className="mb5">
          <InputCurrency
            label="Product value"
            placeholder="Type a monetary value"
            currencySymbol={currencySymbol}
            decimalSeparator={decimalSeparator}
            thousandSeparator={thousandSeparator}
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </div>
      </div>
    )
  }
}
;<InputExamples />
```
