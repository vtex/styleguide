#### The line chart shows the data as a data points connected by a line. They are useful to analyze changes over the time, comparisons, and trends.

```js
  const sampleData = require('../sampleData').default;
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
- Use grids to help your audience trace their finger
from the data to the axis.
- Use axis labels clearly and concise, so, you might be want to abbreviate sometimes.

### 👎 Don'ts
-  Avoid spaghetti chart(don't use more than 4 lines)
```jsx noeditor
const sampleData = require('./multilineSample').default;
const keys = ['uv', 'pv', 'amt', 'gte', 'yaw'];
const schema = {container: { height: 200, width: '30%'}};
<LineChart
  data={sampleData}
  dataKeys={keys}
  schema={schema}
  xAxisKey='name'
/>
```
- Avoid to do grid competes visually with the data.

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

