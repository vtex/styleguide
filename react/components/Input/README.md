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
