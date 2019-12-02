export const defaultProps: DefaultBarProps  = {
  layout: 'horizontal',
}

export const chartDefaultConfig: ChartSchema = {
  xAxis: {
    axisLine: true,
    tickLine: true,
    type: 'category',
  },
  yAxis: {
    axisLine: true,
    tickLine: true,
    type: 'number',
  },
}