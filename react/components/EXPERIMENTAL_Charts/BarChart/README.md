#### The bar charts shows the data as a rectangular bars, they express quantities through a bar's length, using a common baseline. The bar charts are more effective to compare discrete categories, change over time and make a ranking. 

```js
const data = require('./sampleData').default;

  <BarChart
    data={data}
    xAxisKey='name'
    yAxisKey='pv'
    dataKeys={['pv']}
    schema={{container: { height: '100%', width: '99%'}}}
  />
```

### 👍 Dos
- Start at the zero baseline. 

### 👎 Don'ts
- Rotate bar labels
- Use bar chart like an histogram

### Orientation
The bars can be plotted horizontally or vertically. To do this, use the prop `barProps` and set the `layout` key, according do you want. In recharts, the things are switched, so take careful with this.

- Vertical: `{layout: 'horizontal'}`
```js
const data = require('./sampleData').default;

  <BarChart
    data={data}
    xAxisKey='name'
    yAxisKey='pv'
    dataKeys={['pv']}
    schema={{container: { height: '30%', width: '30%'}, xAxis: {type: 'category'}, yAxis: {type: 'number'}}}
    barProps={{layout: 'horizontal'}}
  />

```
- Horizontal: `{layout: 'vertical'}`
```js
const data = require('./sampleData').default;
  <BarChart
    data={data}
    xAxisKey='pv'
    yAxisKey='name'
    dataKeys={['pv']}
    schema={{container: { height: '30%', width: '30%'}, xAxis: {type: 'number'}, yAxis: {type: 'category'}}}
    barProps={{layout: 'vertical'}}
  />
```
**OBS:** For you can change correctly the orientation, sets the type of the axis, otherwise, the chart doesn't work.
For default, xAxis is a `category` and yAxis is a `number`
```js static
const schema = {
  xAxis: {
    type: 'number'
  },
  yAxis: {
    type: 'category'
  }
};
```

