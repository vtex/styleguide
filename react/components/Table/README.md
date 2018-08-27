Default

```js
const sampleData = require('./sampleData').default;
// sample data default schema example:
// defaultSchema: {
//     properties: {
//       name: {
//         type: 'string',
//         title: 'Name',
//       },
//       email: {
//         type: 'string',
//         title: 'Email',
//         width: 35, (this should be a % of containers width, default is 25%)
//       },
//       number: {
//         type: 'number',
//         title: 'Number',
//       },
//     },
//   }
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
// Sample data Custom Schema example:
// {
//   properties: {
//     name: {
//       type: 'string',
//       title: 'Name',
//       headerRenderer: ({ label }) => {
//         return (
//           <div
//             className="truncate ph4">
//             <span
//               className="pointer"
//               onClick={() => {
//                  alert('You can customize and call an external function')
//                  // you can for example, sort your items alphabetically etc...
//               }}>
//               {`${label} `}<ArrowDown size={11} />
//             </span>
//           </div>
//         )
//       },
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
//             <Badge bgColor={cellData.color} color="#fff">
//               <span className="nowrap">
//                 {cellData.label}
//               </span>
//             </Badge>
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

