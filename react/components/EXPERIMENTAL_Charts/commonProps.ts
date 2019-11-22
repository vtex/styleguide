export const commonDefaultProps: ChartSchema = {
  container:{
    height: '99%',
    width: '100%',
    aspect: 4.0/3.0
  },
  xAxis: {
    axisLine: false,
    tickLine: false,
    type: 'category',
    padding: { left: 10, right: 10 }
  },
  yAxis: {
    axisLine: false,
    tickLine: false,
    type: 'number',
    padding: { top: 10, bottom: 10 }
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
