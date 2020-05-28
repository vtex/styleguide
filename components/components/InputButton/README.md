In addition to the props above, InputButton accepts all the props the Input component does.

#### A input with a button should be used in scenarios where the field needs its own button. Newsletter sign up, postal code input and promo code application are some common use case examples.

### 👍 Dos

- Use it when more fields will be loaded below after submission, or when what was typed will be applied.
- Use it when you have an input and a button in-line and the button is directly related to the input.
- Use it in its large size when it's you might need to call attention to the input's existance or it carries importance in the context.

### 👎 Don'ts

- Don't use it exclusively for validating information that has been typed, prefer to do that automatically.
- Don't use it in situations where the input might be read-only or when there's more than one button directly related to the input.
- Don't use it in cramped spaces where the user might not be able to comfortably type the expected response, prefer to use the default input with a button below.

### Related components

- Consider using a <a href="#/Components/Forms/Input">default input</a> with a sufix if you need to display information (e.g. tooltip) that doesn't qualify as a action.
- Use a <a href="#/Components/Forms/InputSearch">InputSearch</a> for search purposes or a <a href="#/Components/Forms/InputPassword">InputPassword</a> for password purposes.

With submit button

```js
;<div>
  <div className="mb5">
    <InputButton placeholder="Placeholder" size="regular" label="Regular" button="Submit" />
  </div>
  <div className="mb5">
    <InputButton placeholder="Placeholder" size="large" label="Large" button="Submit" />
  </div>
</div>
```

Loading state

```js
initialState = { isLoading: false };
<form onSubmit={
    (e) => {
      e.preventDefault
      setState({ isLoading: true })
      setTimeout(() => { setState({ isLoading: false }) }, 1200)
    }
  }>
  <div className="mb5">
    <InputButton
      placeholder="Placeholder"
      size="regular"
      label="Regular loading"
      button="Submit"
      isLoading={state.isLoading}
    />
  </div>
</form>
```

Disabled

```js
;<div>
  <div className="mb5">
    <InputButton placeholder="Placeholder" size="regular" label="Regular disabled" button="Submit" disabled />
  </div>
</div>
```
