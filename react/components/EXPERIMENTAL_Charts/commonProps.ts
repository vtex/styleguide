export const commonDefaultProps: ChartSchema = {
  container:{
    height: '100%',
    width: '100%',
    aspect: 4.0/3.0
  },
  xAxis: {
    axisLine: false,
    tickLine: false,
    tick: true,
    tickMargin: 15,
    hide: false,
    type: 'category'
  },
  yAxis: {
    axisLine: false,
    tickLine: false,
    tick: true,
    tickMargin: 10,
    hide: false,
    type: 'number'
  },
  grid: {
    horizontal: false,
    vertical: false,
  }
}

export const colors = [
  '#EE7850',
  '#4CAABF',
  '#9F50B6',
  '#479A5E',
  '#0000FF'
]