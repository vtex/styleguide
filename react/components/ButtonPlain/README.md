#### A low-prominence button for progressive disclosure of secondary flows.

### 👍 Dos

- Use it for progressive disclosure purposes, such as displaying elements related to secondary actions (e.g edit buttons).
- Use it when it's semantically a button, but the prominence is akin to a link.
- Use it for placing low-key icons that behave as a button. Strongly consider the use of labels, though.
- Use it for buttons with relatively long labels that can’t be abbreviated.

### 👎 Don'ts

- Don’t use it with other in-line elements very close to it.
- Don’t position it in-line with other types of buttons.
- Don’t use it when the use case calls for the prominence of a primary or secondary button.

### Related components

- [Button](#/Components/Forms/Button)
- [ButtonGroup](#/Components/Forms/ButtonGroup)
- [ButtonWithIcon](#/Components/Forms/ButtonWithIcon)

#### Variations

```js
<div>
  <div className="flex w-50 center justify-between pa4">
    <ButtonPlain>Plain</ButtonPlain>
    <ButtonPlain disabled>Plain disabled</ButtonPlain>
  </div>
  <div className="flex w-50 center justify-between pa4">
    <ButtonPlain variation="danger">Danger</ButtonPlain>
    <ButtonPlain variation="danger" disabled>Danger disabled</ButtonPlain>
  </div>
  <div className="flex w-50 center justify-between bg-base--inverted pa4 mt4">
    <ButtonPlain variation="inverted">Inverted</ButtonPlain>
    <ButtonPlain variation="inverted" disabled>Inverted disabled</ButtonPlain>
  </div>
</div>
```

#### Sizes

```js
<div>
  <div className="flex w-50 center justify-between pa4">
    <ButtonPlain size="small">Small plain</ButtonPlain>
    <ButtonPlain variation="danger" size="small">Small danger</ButtonPlain>
  </div>
  <div className="flex w-50 center justify-between pa4">
    <ButtonPlain>Regular plain</ButtonPlain>
    <ButtonPlain variation="danger">Regular danger</ButtonPlain>
  </div>
  <div className="flex w-50 center justify-between pa4">
    <ButtonPlain size="large">Large plain</ButtonPlain>
    <ButtonPlain variation="danger" size="large">Large danger</ButtonPlain>
  </div>
</div>
```

#### Link mode

```js
<ButtonPlain variation="primary" href="http://vtex.com" target="_blank">Sign in</ButtonPlain>
```

#### Loading state

```js
initialState = { isLoading: false };

<ButtonPlain
  variation="primary"
  onClick={
    () => {
      setState({ isLoading: true })
      setTimeout(() => { setState({ isLoading: false }) }, 2000)
    }
  }
  isLoading={state.isLoading}
>
  Start loading
</ButtonPlain>
```

#### Use case examples

### Example 1: Click to show the content

```js
initialState = { showShippingOptions: false, showCoupon: false };

<div className="c-on-base">
  <div className="pb4">
    <h3 className="t-heading-4">Shipping</h3>
    {
      !state.showShippingOptions
      ? (
        <div>
          <ButtonPlain onClick={() => setState({ showShippingOptions: true }) }>
            View shipping options
          </ButtonPlain>
        </div>
      ) :
      (
        <div className="lh-copy">
          List of options here!
        </div>
      )
    }
  </div>
  <div>
    <h3 className="t-heading-4">Coupon</h3>
    {
      !state.showCoupon
      ? (
        <div>
          <ButtonPlain onClick={() => setState({ showCoupon: true }) }>
            Add a discount coupon
          </ButtonPlain>
        </div>
      ) :
      (
        <div className="lh-copy">
          Coupon code form here!
        </div>
      )
    }
  </div>
</div>
```

### Example 2: Edit info

```js
<div className="c-on-base w-40">
  <div className="flex justify-between">
    <div className="lh-copy mr4">
      <div className="mb3 fw5">
        Shipping options for
      </div>
      <div>
        1585 Broadway, New York, NY
      </div>
      <div>
        10036, United States
      </div>
    </div>
    <div><ButtonPlain>Edit</ButtonPlain></div>
  </div>
</div>
```
