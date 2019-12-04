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
    tooltipFormatter={formatter}
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
const customConfig = {container: { height: '40%', width: '40%'}};
<LineChart
  data={sampleData}
  dataKeys={keys}
  xAxisKey='name'
  config={customConfig}
/>
```
- Avoid the grid from visually competing with the data.

# Chart config
The config prop is common to all the charts, and defines the style of the chart. This should be given as an object with styles defined for `axis`, `grid`, `container`, according to your needs.  

```js noeditor static
const config = {
  container:{
    height: 300,
    width: '100%'
  },
  xAxis: {
    axisLine: false,
    tickLine: false,
    hide: false
  },
  yAxis: {
    axisLine: false,
    tickLine: false,
    hide: false
  },
  grid: {
    horizontal: false,
    vertical: false,
  }
};
```

#### xAxis or yAxis
This axis property is responsible to change the visual appearance of the axis in the chart.

- `tickLine`: If set true, axis tick lines will be drawn.
- `axisLine`: If set true, axis line will be drawn.
- `hide`: If set true, the axis does not display in the chart.
- `tick`: Renders a label of the axis. If you pass your component instance, it will receive
the props needed to render the label, like the `x` and `y` position of the tick in the line axis, the `payload` which represents the data
and the `fill` the label color. As you can see below:

```js
const CustomizedLabel = (props) => {
  const {
    x, y, fill, payload,
  } = props

  return (<text x={x} y={y} fill={fill} textAnchor="middle">{`${payload.value.toUpperCase()}`}</text>)
};

const sampleData = require('./sampleData').default;
const keys = ['customers'];

<LineChart
  data={sampleData}
  dataKeys={keys}
  xAxisKey='hour'
  config={{
    xAxis:{tick: <CustomizedLabel />}
  }}
/>
```

#### grid
The grid property is responsible to show a grid inside the chart.

- `horizontal`: If set to `true`, horizontal grid lines will be drawn.
- `vertical`: If set to `true`, vertical grid lines will be drawn.

```js
const sampleData = require('./sampleData').default;
const keys = ['customers'];

<LineChart
  data={sampleData}
  dataKeys={keys}
  xAxisKey='hour'
  config={{ 
    xAxis:{tick: true},
    grid: {vertical: true, horizontal: true}
  }}
/>
```


#### container
The container property is responsible to define the size of the box that will render the chart.

- `height`: The percentage value of the chart's width or a fixed width.
- `width`: The percentage value of the chart's width or a fixed height.

```js
const sampleData = require('./sampleData').default;
const keys = ['customers'];

<LineChart
  data={sampleData}
  dataKeys={keys}
  xAxisKey='hour'
  config={{
    xAxis: {tick: true}, 
    grid: {vertical: false, horizontal: false}
  }}
/>
```

### Line props

- `type`: The interpolation type of line.
```js
const sampleData = require('./sampleData').default;
const keys = ['customers'];

const Dropdown = require('../../Dropdown/index.js').default;
const options = [
  { value: 'basis', label: 'Basis' },
  { value: 'basisClosed', label: 'Basis Closed' },
  { value: 'basisOpen', label: 'Basis Open' },
  { value: 'linear', label: 'Linear' },
  { value: 'linearClosed', label: 'Linear Closed' },
  { value: 'natural', label: 'Natural' },
  { value: 'monotoneX', label: 'MonotoneX' },
  { value: 'monotoneY', label: 'MonotoneY' },
  { value: 'monotone', label: 'Monotone' },
  { value: 'step', label: 'Step' },
  { value: 'stepBefore', label: 'Step Before' },
  { value: 'stepAfter', label: 'Step After' },
]

class InterpolationExample extends React.Component {
  constructor() {
    super();
    this.state = {
      interpolation: "monotone",
    };
  }
  render() {
    return (
      <div>
        <Dropdown
          label="Interpolation"
          size="small"
          options={options}
          value={this.state.interpolation}
          onChange={(event) => {
            this.setState({interpolation: event.target.value})
          }}
        />
        <br/> <br/>
        <LineChart
          data={sampleData}
          dataKeys={keys}
          xAxisKey='hour'
          config={{
            grid: {vertical: false, horizontal: false}
          }}
          lineProps={{type: this.state.interpolation}}
        />
      </div>
    )
  }
}

<InterpolationExample/>
```

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
