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
            prefix="R$"
            type="number"
          />
        </div>
        <div className="mb5">
          <Input
            label="With suffixIcon"
            value={this.state.withSuffixValue}
            onChange={e => this.setState({ withSuffixValue: e.target.value })}
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
            value={this.state.withSuffixLargeValue}
            onChange={e =>
              this.setState({ withSuffixLargeValue: e.target.value })
            }
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
            value={this.state.withSuffixXLargeValue}
            onChange={e =>
              this.setState({ withSuffixXLargeValue: e.target.value })
            }
            suffixIcon={
              <span className="pointer">
                <IconHelp size={20} />
              </span>
            }
            size="x-large"
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
