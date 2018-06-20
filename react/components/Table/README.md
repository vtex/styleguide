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
// Schema example:
// {
//   properties: {
//     name: {
//       type: 'string',
//       title: 'Name',
//     },
//     email: {
//       type: 'string',
//       title: 'Email',
//       width: 35, (this should be a % of containers width, default is 25%)
//     },
//     color: {
//       type: 'object',
//       title: 'Color',
//       cellRenderer: ({ cellData }) => {
//         return (
//           <div className="mh4">
//             <Badge bgColor={cellData.color} color="#fff">{cellData.label}</Badge>
//           </div>
//         )
//       },
//     },
//   },
// }
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

