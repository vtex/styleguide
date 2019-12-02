#### The Scatter charts shows the data as a collection of points, they useful for detect if a relationship or correlation of multiple variables. 

```js
const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

<ScatterChart
  schema={{container: {width: '100%', height: '100%'}}}
  data={data}
  xAxisKey='x'
  yAxisKey='y'
/>
```