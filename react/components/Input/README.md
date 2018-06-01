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
<div className="w-40">
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
      label="With prefix, size large"
      size="large"
      prefix="R$"
      type="number"
    />
  </div>

  <div className="mb5">
    <Input
      label="With prefix, size x-large"
      type="number"
      size="x-large"
      prefix="R$"
    />
  </div>
</div>
```
