#### A Dropdown lets the user pick an option from a list.

### 👍 Dos

- Mind the order of the options, like putting more probable to be picked on that. In doubt, sort them alphanumerically (from A to Z and from 0 to 9).

### 👎 Don'ts

- Don't use a Dropdown if you have more than a few dozens options. Most users don't know about the keyboard search feature and will have to scan through all the options. In this case you'll probably need something a little fancier (work not in progress).

### Related components

- Consider a <a href="#/Components/Forms/RadioGroup">Radio Group</a> if there are fewer than 4 options to choose from, or you need more space to explain each of the options.
- For multiple picks, use the <a href="#/Components/👻%20Experimental/Select">Select</a> (work in progress).

Sizes

```js
initialState = {
  selected1: 'visa',
  selected2: 'mastercard',
  selected3: 'diners',
}
options = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'elo', label: 'Elo' },
  { value: 'diners', label: 'Diners' },
  { value: 'giftcard', label: 'Gift Card' },
  { value: 'amex', label: 'American Express' },
]
;<div className="w-100 w-50-ns">
  <div className="mb5">
    <Dropdown
      label="Small"
      size="small"
      options={options}
      value={state.selected1}
      onChange={(_, v) => setState({ selected1: v })}
      onFocus={() => console.log('onFocus fired!')}
      onBlur={() => console.log('onBlur fired!')}
      onMouseEnter={() => console.log('onMouseEnter fired!')}
      onMouseLeave={() => console.log('onMouseLeave fired!')}
    />
  </div>

  <div className="mb5">
    <Dropdown
      label="Regular"
      options={options}
      value={state.selected2}
      onChange={(_, v) => setState({ selected2: v })}
      onFocus={() => console.log('onFocus fired!')}
      onBlur={() => console.log('onBlur fired!')}
      onMouseEnter={() => console.log('onMouseEnter fired!')}
      onMouseLeave={() => console.log('onMouseLeave fired!')}
    />
  </div>

  <div className="mb5">
    <Dropdown
      label="Large"
      size="large"
      options={options}
      value={state.selected3}
      onChange={(_, v) => setState({ selected3: v })}
      onFocus={() => console.log('onFocus fired!')}
      onBlur={() => console.log('onBlur fired!')}
      onMouseEnter={() => console.log('onMouseEnter fired!')}
      onMouseLeave={() => console.log('onMouseLeave fired!')}
    />
  </div>
</div>
```

Variations

```js
initialState = {
  selected1: 'visa',
  selected2: 'mastercard',
  selected3: 'diners',
  selected4: 'elo',
  selected5: 'question1',
  selected6: 'amex',
}
options = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'elo', label: 'Elo' },
  { value: 'diners', label: 'Diners' },
  { value: 'giftcard', label: 'Gift Card' },
  { value: 'amex', label: 'American Express' },
]
;<div className="w-100 w-50-ns">
  <div className="mb5">
    <Dropdown
      label="Placeholder"
      placeholder="Select an artist"
      options={options}
      value={state.selected1}
      onChange={(_, v) => setState({ selected1: v })}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="Disabled"
      disabled
      options={options}
      value={state.selected2}
      onChange={(_, v) => setState({ selected2: v })}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="Error"
      errorMessage="Required field"
      options={options}
      value={state.selected3}
      onChange={(_, v) => setState({ selected3: v })}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="With help text"
      helpText={<span>Method payment required</span>}
      options={options}
      value={state.selected4}
      onChange={(_, v) => setState({ selected4: v })}
    />
  </div>
  <div>
    <Dropdown
      label="Prevent truncate"
      preventTruncate
      options={[
        {
          value: 'question1',
          label:
            'Why does payment with registered bank slip require authentication?',
        },
        {
          value: 'question2',
          label: 'How do you calculate payments in installments with interest?',
        },
        {
          value: 'question3',
          label:
            'What offline payment conditions are available in Latin America?',
        },
      ]}
      value={state.selected5}
      onChange={(_, v) => setState({ selected5: v })}
    />
  </div>
  <div className="mt5">
    Inline example:
    <Dropdown
      variation="inline"
      size="large"
      options={options}
      value={state.selected6}
      onChange={(_, v) => setState({ selected6: v })}
    />
  </div>
</div>
```
