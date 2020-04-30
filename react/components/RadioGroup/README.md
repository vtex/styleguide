#### A Radio Group represents a need for the user to make a choice among a few offered options.

### 👍 Dos

- Keep the list of options short. More than 6 options might start looking weird.
- Labels should be clear and if possible short.
- Mind the order of the options. Some good rule of thumbs for ordering are: most to least frequently used, simplest to most complex, least to most risk.
- Use a "None" option if you need an unselected state.
- Consider adding an "Other" option if needed, maybe in conjunction with a Text Input to capture the user need.

### 👎 Don'ts

- Don't offer overlapping options, they should be clearly mutually exclusive.

### Related components

- Consider using a <a href="#/Components/Forms/Checkbox">Checkbox</a> if you need the user to select more than one option.
- Consider using a <a href="#/Components/Forms/Dropdown">Dropdown</a> if you have several options and they don't need much explanation.
- Consider using a <a href="#/Components/Forms/SelectableCard">Selectable Card</a> if you prefer your options to be displayed horizontally or more detailed.

Default

```js
initialState = { value: 'mastercard' }
;<RadioGroup
  hideBorder
  name="paymentMethods"
  options={[
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'visa', label: 'Visa' },
    { value: 'ela', label: 'Elo' },
    { value: 'diners', label: 'Diners' },
  ]}
  value={state.value}
  onChange={e => setState({ value: e.currentTarget.value })}
/>
```

One option disabled

```js
initialState = { value: 'large' }
;<RadioGroup
  hideBorder
  name="sizes"
  options={[
    {
      value: 'large',
      label: (
        <div>
          <div className="b">Large</div>
          <div className="c-muted-1 f6">50x50x60</div>
        </div>
      ),
    },
    {
      value: 'medium',
      label: (
        <div>
          <div className="b">Medium</div>
          <div className="c-muted-1 f6">40x40x40</div>
        </div>
      ),
      disabled: true,
    },
    {
      value: 'small',
      label: (
        <div>
          <div className="b">Small</div>
          <div className="c-muted-1 f6">20x20x30</div>
        </div>
      ),
    },
  ]}
  value={state.value}
  onChange={e => setState({ value: e.currentTarget.value })}
/>
```

Entire group disabled

```js
<RadioGroup
  hideBorder
  name="connectors"
  disabled
  options={[
    { value: 'paypal', label: 'Paypal' },
    { value: 'cielo', label: 'Cielo' },
    { value: 'adyen', label: 'Adyen' },
  ]}
  value="paypal"
  onChange={() => {}}
/>
```

With optional border

```js
initialState = { value: 'active' }
;<RadioGroup
  name="status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'scheduled', label: 'Scheduled' },
  ]}
  value={state.value}
  onChange={e => setState({ value: e.currentTarget.value })}
/>
```

With error highlight

```js
initialState = { value: '', error: true, errorMessage: 'This field is mandatory' };

<RadioGroup
  error={state.error}
  errorMessage={state.error && state.errorMessage}
  name="radioGroupExample4"
  options={[
    { value: 'value1', label: 'Hue' },
    { value: 'value2', label: 'Saturation' },
    { value: 'value3', label: 'Value' },
  ]}
  value={state.value}
  onChange={({ target: { value } }) => 
    setState({ value, error: false, errorMessage: '' })
  }
/>
```
