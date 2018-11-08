#### Inputs let users type in data in a variety of ways. Take a look at the options available to see which one fits best with what you need.

### 👍 Dos

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
const Input = require('./index.js').default
;<div>
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
const Input = require('./index.js').default
const IconHelp = require('../icon/Help').default
const IconSearch = require('../icon/Search').default
class InputExamples extends React.Component {
  constructor() {
    super()
    this.state = {
      errorValue: '404',
      helpTextValue: '',
      passwordValue: '123456',
      tokenValue: 'DUq0xuJZAD7Rvezv',
      withPrefixValue: '',
      withSuffixValue: '',
      withSuffixLargeValue: '',
      withSuffixXLargeValue: '',
    }
  }

  render() {
    return (
      <div className="w-40">
        <div className="mb5">
          <Input disabled value="Hayao Miyazaki" label="Disabled" />
        </div>
        <div className="mb5">
          <Input
            type="password"
            value={this.state.passwordValue}
            onChange={e => this.setState({ passwordValue: e.target.value })}
            label="Type Password"
          />
        </div>
        <div className="mb5">
          <Input
            label="Token"
            value={this.state.tokenValue}
            onChange={e => this.setState({ tokenValue: e.target.value })}
            token
          />
        </div>
        <div className="mb5">
          <Input
            label="Error"
            onChange={e => this.setState({ errorValue: e.target.value })}
            value={this.state.errorValue}
            errorMessage="Invalid field value"
          />
        </div>
        <div className="mb5">
          <Input
            label="Help text"
            onChange={e => this.setState({ helpTextValue: e.target.value })}
            vaue={this.state.helpTextValue}
            placeholder="Placeholder"
            helpText={<span>Yout help text goes here!</span>}
          />
        </div>
        <div className="mb5">
          <Input
            label="With prefix"
            value={this.state.withPrefixValue}
            onChange={e => this.setState({ withPrefixValue: e.target.value })}
            prefix={<IconSearch />}
            type="number"
          />
        </div>
        <div className="mb5">
          <Input
            label="With suffix"
            value={this.state.withSuffixValue}
            onChange={e => this.setState({ withSuffixValue: e.target.value })}
            suffix={<IconHelp />}
          />
        </div>
      </div>
    )
  }
}
;<InputExamples />
```

Using ref

```js
const Input = require('./index.js').default;
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
