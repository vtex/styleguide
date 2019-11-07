#### The line chart shows the data as a data points connected by a line. They are useful to analyze changes over the time, comparisons, and trends.

```js
  const sampleData = require('./sampleData').default;
  const keys = ['customers', 'orders', 'totalSpent'];
  const mapper = {
    'customers': 'Customers',
    'orders': 'Orders',
    'totalSpent': 'Total Spent'
  }
  const formatter = (value, name) => {
    if(name == 'totalSpent')
        value = `$${value}`
    return [value, mapper[name]]

  }
  <LineChart
    data={sampleData}
    dataKeys={keys}
    xAxisKey='hour'
    formatter={formatter}
  />
```

### 👍 Dos
- *Coming Soon*

### 👎 Don'ts
- *Coming Soon*

# Line chart schema
The schema prop defines the style of the chart. This should be given as an object with styles defined for `axis`, `grid`, `container`, according to your needs.  

```js noeditor static
const schema = {
  container:{
    height: 300,
    width: '100%'
  },
  axis: {
    axisLine: false,
    tickLine: false
  },
  grid: {
    horizontal: false,
    vertical: false,
  }
};

```

#### axis
The axis property is responsible to change visual appearence of the axis in the chart.

- `tickLine`: If set true, axis tick lines will be drawn
- `axisLine`: If set true, axis line will be drawn.

#### grid
The grid property is responsible to show a grid inside the chart.

- `horizontal`: If set true, horizontal grid lines will be drawn.
- `vertical`: If set true, vertical grid lines will be drawn. 

### Formatting values on the tooltip

The formatter prop takes a `function` which will be used to render each content of tooltip. If you want to customize the content of your tooltip, make sure that your function follows this signature:

```js noeditor static
const mapper = {
  'customers': 'Customers',
  'orders': 'Orders',
  'totalSpent': 'Total Spent'
}

const formatter = (value, name) => {
  if(name == 'totalSpent')
    value = `$${value}`
  return [value, mapper[name]]
}

const formatter2 = (value, name) => {
  return mapper[name]
}
```

