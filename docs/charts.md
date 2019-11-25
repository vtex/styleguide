There are many ways to visualize data, charts are one of the best known ways. When using a certain chart type, keep in mind mainly two things: The data you want to communicate and what you want to demonstrate with that data.

Our chart components enable you to create complete and cohesive graphics that fit the needs of your project. The following guide demonstrates some of the different types, their use cases, and how you can create custom styles.

### Available charts

- [LineChart](/#/Components/Charts/LineChart)


### Chart schema
The schema prop is common to all the charts, it defines the style of the chart. This should be given as an object with styles defined for `axis`, `grid`, `container`, according to your needs.  

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

- `tickLine`: If set true, axis tick lines will be drawn.
- `axisLine`: If set true, axis line will be drawn.

#### container
The container property is responsible to define the size of box that will render the chart.

- `height`: The percentage value of the chart's width or a fixed width.
- `width`: The percentage value of the chart's width or a fixed height.

#### grid
The grid property is responsible to show a grid inside the chart.

- `horizontal`: If set true, horizontal grid lines will be drawn.
- `vertical`: If set true, vertical grid lines will be drawn. 
