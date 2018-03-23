Sizes
```js
<div>
  <div className="mb5">
    <Input placeholder="Placeholder" label="Default" />
  </div>

  <div className="mb5">
    <Input placeholder="Placeholder" large label="Large" />
  </div>

  <div>
    <Input placeholder="Placeholder" xLarge label="Extra Large" />
  </div>
</div>
```

Widths
```js
<div>
  <div className="mb5">
    <Input placeholder="Plchldr" short label="Short" />
  </div>

  <div className="mb5">
    <Input placeholder="Placeholder" label="Default" />
  </div>

  <div>
    <Input placeholder="Placeholder" long label="Long" />
  </div>
</div>
```

Widths
```js
<div>
  <div className="mb5">
    <Input xLarge label="Default" placeholder="Placeholder" />
  </div>

  <div>
    <Input xLarge block long label="Block" placeholder="Placeholder" />
  </div>
</div>
```

Variations
```js
<div>
  <div className="mb5">
    <Input disabled value="Hayao Miyazaki" label="Disabled" />
  </div>

  <div className="mb5">
    <Input type="password" label="Type Password" value="hunter2" />
  </div>

  <div className="mb5">
    <Input label="Error" errorMessage="Invalid field value" />
  </div>

  <div>
    <Input label="Help text" placeholder="Placeholder"
      helpText={<span>Yout help text goes here!</span>} />
  </div>
</div>
```
