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

Search

```js
initialState = { value1: '', value2: '', value3: '' }
;<div className="w-40">
  <div className="mb5">
    <Input
      placeholder="Search..."
      type="search"
      value={state.value1}
      onChange={e => setState({ value1: e.target.value })}
      onSubmit={(e, v) => {
        e.preventDefault()
        console.log(v)
      }}
    />
  </div>
  <div className="mb5">
    <Input
      placeholder="Search..."
      type="search"
      value={state.value2}
      onChange={e => setState({ value2: e.target.value })}
      onSubmit={(e, v) => {
        e.preventDefault()
        console.log(v)
      }}
      size="large"
    />
  </div>
  <div className="mb5">
    <Input
      placeholder="Search..."
      type="search"
      value={state.value3}
      onChange={e => setState({ value3: e.target.value })}
      onSubmit={(e, v) => {
        e.preventDefault()
        console.log(v)
      }}
      size="x-large"
    />
  </div>
</div>
```
