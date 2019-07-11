#### Floating Action Bar allow users to easily fint the save button while editing a instance.

### 👍 Dos

- Only use when the action affects the whole page.
-The actions on this component may be used to help user cancel or proceed a new change.
- This component must be used on the bottom of a page.



### 👎 Don'ts

- Avoid to use this component for specific contexts.
- The component can't be afected by the page overflow.
- Never change the component's position

### Related components

- In some cases for numerical inputs you might want a <a href="#/Components/Forms/NumericStepper">NumericStepper</a>.


Version

```js
///This is just an example and Shall be replaced by the component once it is finished.
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
          <Input
            value="This input is read-only."
            readOnly={true}
            label="Read-only"
          />
        </div>
        <div className="mb5">
          <Input disabled value="This input is disabled." label="Disabled" />
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
const Input = require('./index.js').default
this.input = React.createRef()

const handleFocusClick = () => {
  this.input.current.focus()
}

;<div>
  <Input
    ref={this.input}
    placeholder="Placeholder"
    label="Click on the button below to focus on this input"
  />
  <div className="pt2">
    <Button size="small" onClick={handleFocusClick}>
      Focus on input
    </Button>
  </div>
</div>
```
