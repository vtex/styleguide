#### The bar charts shows the data as rectangular bars. They express quantities through a bar's length, using a common baseline. The bar charts are more effective to compare discrete categories, change over time and make a ranking. 

```js
const data = require('./sampleData').default;

  <BarChart
    data={data}
    xAxisKey='name'
    yAxisKey='pv'
    config={{
      container: { height: '100%', width: '100%'}
    }}
  />
```

### 👍 Dos
- Start at the zero baseline. 

### 👎 Don'ts
- Rotate bar labels
- Use bar chart like an histogram

### Orientation
The bars can be plotted horizontally or vertically. To do this, use the prop `barProps` and set the `layout` key, according do you want. In recharts, the things are switched, so take careful with this.


- Horizontal: `{layout: 'vertical'}`
```js
const data = require('./sampleData').default;
const CustomizedLabel = (props) => {
  const {
    x, y, fill, payload,
  } = props
  const value = (typeof payload.value) == 'string' ? 
  payload.value.split(' ')[0]: payload.value 
 
  return (
    <text x={x/16} y={y} fill={fill} fontSize={14}>
      {value}
    </text>
  )
};
  <BarChart
    data={data}
    xAxisKey='pv'
    yAxisKey='name'
    config={{
      container: { height: '60%', width: '60%'},
      xAxis: {type: 'number'}, 
      yAxis: {type: 'category', tick: <CustomizedLabel/>}
    }}
    barProps={{layout: 'vertical'}}
  />
```

- Vertical: `{layout: 'horizontal'}`
```js
const data = require('./sampleData').default;

  <BarChart
    data={data}
    xAxisKey='name'
    yAxisKey='pv'
    config={{
      container: {height: '60%', width: '60%'},
      xAxis: {type: 'category'},
      yAxis: {type: 'number'}
    }}
    barProps={{layout: 'horizontal'}}
  />

```
**OBS:** To correctly change the orientation, set both axis types.
For default, xAxis is a `category` and yAxis is a `number`

```js static
  <BarChart
    data={data}
    xAxisKey='name'
    yAxisKey='pv'
    config={{
      xAxis: {type: 'category'},
      yAxis: {type: 'number'}
    }}
    barProps={{layout: 'horizontal'}}
  />
```
