export const BAR_GAP = '20%'

export enum Layout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export const defaultProps: DefaultBarProps = {
  layout: Layout.HORIZONTAL,
}

export const chartDefaultConfig: ChartConfig = {
  xAxis: {
    axisLine: true,
    tickLine: false,
    tickMargin: 5,
    type: 'category',
    tick: true,
    hide: false,
  },
  yAxis: {
    axisLine: true,
    tickLine: false,
    tickMargin: 10,
    type: 'number',
    tick: true,
    hide: false,
  },
}
