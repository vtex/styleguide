import {
  TooltipProps,
  CartesianGridProps,
  ResponsiveContainerProps,
  LineChartProps,
  LineProps as RechartsLineProps,
  LineType,
  LayoutType,
  XAxisProps,
  YAxisProps,
  ZAxisProps,
} from 'recharts'

export type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
export type BaseContainerProps = Pick<
  ResponsiveContainerProps,
  'height' | 'width' | 'aspect'
>
export type DefaultLineProps = Pick<
  RechartsLineProps,
  'type' | 'strokeWidth' | 'dot'
>
export type DefaultBarProps = Pick<RechartsLineProps, 'layout'>

export type ChartConfig = {
  container?: Partial<ResponsiveContainerProps>
  lineChart?: Partial<LineChartProps>
  xAxis?: Partial<XAxisProps>
  yAxis?: Partial<YAxisProps>
  zAxis?: Partial<ZAxisProps>
  grid?: Partial<CartesianGridProps>
  tooltip?: Partial<TooltipProps>
}

export type BaseChartProps = {
  data: object[]
  dataKeys: string[]
  xAxisKey: string
  yAxisKey: string
  zAxisKey: string
  config: ChartConfig
}

export type LineProps = {
  type?: LineType
}

export type BarProps = {
  layout?: LayoutType
}
