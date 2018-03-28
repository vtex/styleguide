Types

```js
<div>
  <span className="mr4"><Button>Default</Button></span>
  <span className="mr4"><Button primary>Primary</Button></span>
  <span className="mr4"><Button secondary>Secondary</Button></span>
  <span className="mr4"><Button disabled>Disabled</Button></span>
</div>
```

Sizes

```js
<div>
  <div className="mb4">
    <span className="mr4"><Button>Default</Button></span>
    <span className="mr4"><Button size="large">Large</Button></span>
    <span className="mr4"><Button size="x-large">Extra large</Button></span>
  </div>
  <div className="mb4">
    <span className="mr4"><Button primary>Default</Button></span>
    <span className="mr4"><Button primary size="large">Large</Button></span>
    <span className="mr4"><Button primary size="x-large">Extra large</Button></span>
  </div>
  <div className="mb4">
    <span className="mr4"><Button secondary>Default</Button></span>
    <span className="mr4"><Button secondary size="large">Large</Button></span>
    <span className="mr4"><Button secondary size="x-large">Extra large</Button></span>
  </div>
  <div>
    <span className="mr4"><Button disabled>Default</Button></span>
    <span className="mr4"><Button disabled size="large">Large</Button></span>
    <span className="mr4"><Button disabled size="x-large">Extra large</Button></span>
  </div>
</div>
```

Box types

```js
<div>
  <div className="mb4"><Button primary>Default</Button></div>
  <div className="mb4"><Button primary block>Block</Button></div>
</div>
```

Colored container background

```js
<div className="bg-washed-blue pa5">
  <span className="mr4"><Button>Default</Button></span>
  <span className="mr4"><Button primary>Primary</Button></span>
  <span className="mr4"><Button secondary>Secondary</Button></span>
  <span className="mr4"><Button disabled>Disabled</Button></span>
</div>
```

With icon

```js
const CloseIcon = require('../icon/Close').default;
<Button icon primary>
  <CloseIcon color="#fff" />
</Button>
```
