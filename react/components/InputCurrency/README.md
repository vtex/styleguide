#### InputCurrency lets an user easily enter monetary values. The component understands currency codes and locales, so it can automatically format the input with the correct combination of commas, periods, etc.

Sizes

```js
initialState = { value: undefined }
;<div>
  <div className="mb5">
    <InputCurrency
      label="Small"
      size="small"
      placeholder="Type a monetary value"
      locale="pt-BR"
      currencyCode="BRL"
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
    />
  </div>
  <div className="mb5">
    <InputCurrency
      label="Regular"
      placeholder="Type a monetary value"
      locale="pt-BR"
      currencyCode="BRL"
      value={state.value}
      onChange={e => setState({ value: e.target.value })}
    />
  </div>
  <div className="mb5">
    <InputCurrency
      label="Large"
      size="large"
      placeholder="Type a monetary value"
      locale="pt-BR"
      currencyCode="BRL"
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
      selectedCurrency: 'USD',
      currencyOptions: [
        {
          label: 'Real',
          value: 'BRL',
        },
        {
          label: 'US Dollar',
          value: 'USD',
        },
        {
          label: 'Euro',
          value: 'EUR',
        },
        {
          label: 'Yen',
          value: 'JPY',
        },
      ],
    }
  }

  render() {
    const { currencyOptions, selectedCurrency, value } = this.state

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
            locale="pt-BR"
            currencyCode={selectedCurrency}
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
