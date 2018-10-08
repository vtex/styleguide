### Overview

Inputs let users type in data in a variety of ways. Take a look at the options available to see which one fits best with what you need.

### Dos

- When possible use labels, and keep them short and descriptive. More than 3 words might start looking weird.
- Use the placeholders only to provide complementary information and show examples of how to fill that field. But using the label text is preferred in most cases.
- Do use the required/optional flags when necessary, but prefer using one or another.
- Provide a Tooltip in the label to explain in more details what you couldn't with just a few words.
- Use the Helper Text to explain in more details how the input is expected to be filled.

### Related components

- In some cases for numerical inputs you might want a <a href="#numericstepper">NumericStepper</a>.
- If instead of a free-form entry you expect the user to enter a value from a preset of values you might want to use a <a href="#dropdown">Dropdown</a>, for a single value, or a <a href="#multiselect">Multiselect</a> for multiple values.

Sizes

```js
<div>
  <div className="mb5">
    <Input
      placeholder="Default with data-attributes"
      label="Default"
      dataAttributes={{ 'hj-white-list': true, test: 'string' }}
    />
  </div>

  <div className="mb5">
    <Input placeholder="Placeholder" size="large" label="Large" />
  </div>

  <div>
    <Input placeholder="Placeholder" size="x-large" label="Extra Large" />
  </div>
</div>
```

Variations

```js
const IconHelp = require('../icon/Help').default
;<div className="w-40">
  <div className="mb5">
    <Input disabled value="Hayao Miyazaki" label="Disabled" />
  </div>

  <div className="mb5">
    <Input type="password" label="Type Password" value="hunter2" />
  </div>

  <div className="mb5">
    <Input label="Token" token value="DUq0xuJZAD7Rvezv" />
  </div>

  <div className="mb5">
    <Input label="Error" value="43" errorMessage="Invalid field value" />
  </div>

  <div className="mb5">
    <Input
      label="Help text"
      placeholder="Placeholder"
      helpText={<span>Yout help text goes here!</span>}
    />
  </div>

  <div className="mb5">
    <Input label="With prefix" prefix="R$" type="number" />
  </div>

  <div className="mb5">
    <Input
      label="With suffixIcon"
      suffixIcon={
        <span className="pointer">
          <IconHelp />
        </span>
      }
    />
  </div>
  <div className="mb5">
    <Input
      label="Large with suffixIcon"
      suffixIcon={
        <span className="pointer">
          <IconHelp size={18} />
        </span>
      }
      size="large"
    />
  </div>
  <div className="mb5">
    <Input
      label="X-large with suffixIcon"
      suffixIcon={
        <span className="pointer">
          <IconHelp size={20} />
        </span>
      }
      size="x-large"
    />
  </div>
</div>
```

Using ref

```js
  this.input = React.createRef()

  const handleFocusClick = () => {
    this.input.current.focus()
  }

  <div>
    <Input ref={this.input} placeholder="Placeholder" label="Click on the button below to focus on this input" />
    <div className="pt2">
      <Button size="small" onClick={handleFocusClick}>
        Focus on input
      </Button>
    </div>
  </div>
```

Password input

```js
const PasswordInput = require('../PasswordInput').default
initialState = { value1: 'Passw0rd', value2: 'Passw0rd', value3: 'Passw0rd' }
;<div>
  <form
    className="mb5"
    onSubmit={e => {
      e.preventDefault()
      console.log(state.value2)
    }}
  >
    <PasswordInput
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

Search input

```js
const InputSearch = require('../InputSearch').default
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

Textarea

```js
const Textarea = require('../Textarea').default
initialState = {
  value: '',
}
;<div>
  <div className="mb6">
    <Textarea label="With a label">I haz content</Textarea>
  </div>
  <div className="mb6">
    <Textarea disabled label="Disabled">
      Cant touch this!
    </Textarea>
  </div>
  <div className="mb6">
    <Textarea
      label="With helper"
      helpText={<span>Your help text goes here!</span>}
    />
  </div>
  <div className="mb6">
    <Textarea label="With error" error errorMessage="Somehow wrong" />
  </div>
  <div className="mb6">
    <Textarea
      label="Controlling text (no spaces) with character countdown"
      onChange={e => setState({ value: e.target.value.trim() })}
      value={state.value}
      maxLength="100"
      helpText="You can have helper text alongside the countdown."
    />
  </div>
</div>
```
