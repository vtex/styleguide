Default

```js
const sampleData = require('./sampleData').default;
<div>
  <div className="mb5">
    <Table
      schema={sampleData.defaultSchema}
      items={sampleData.items}
    />
  </div>
</div>
```

Custom components

```js
const sampleData = require('./sampleData').default;
<div>
  <div className="mb5">
    <Table
      schema={sampleData.customSchema}
      items={sampleData.items}
      indexColumn
    />
  </div>
</div>
```

