type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<
  YAxisProps,
  'axisLine' | 'tickLine' | 'tick' | 'hide' | 'type' | 'tickMargin'
>
type BaseContainerProps = Pick<
  ResponsiveContainerProps,
  'height' | 'width' | 'aspect'
>
type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>
type DefaultBarProps = Pick<LineProps, 'layout'>

type ChartConfig = {
  xAxis?: BaseAxisProps
  yAxis?: BaseAxisProps
  zAxis?: BaseAxisProps
  container?: BaseContainerProps
  grid?: BaseGridProps
}

type BaseChartProps = {
  data: object[]
  dataKeys: string[]
  xAxisKey: string
  yAxisKey: string
  zAxisKey: string
  config: ChartConfig
}

type LineProps = {
  type?: LineType
}

type BarProps = {
  layout?: LayoutType
}
