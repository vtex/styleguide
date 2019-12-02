type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseXAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine' | 'padding' | 'tick' | 'hide' | 'type'>
type BaseYAxisProps = Pick<YAxisProps, 'axisLine' | 'tickLine' | 'padding' | 'tick' | 'hide' | 'type'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width' | 'aspect'>
type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>
type DefaultBarProps = Pick<LineProps, 'layout'>

type ChartSchema = {
  xAxis?: BaseAxisProps,
  yAxis?: BaseAxisProps, 
  container?: BaseContainerProps,
  grid?: BaseGridProps
}

type BaseChartProps = {
  data: any,
  dataKeys: string[],
  xAxisKey: string,
  yAxisKey: string,
  config: ChartSchema
}

type LineProps = {
  type?: LineType
}

type BarProps = {
  layout?: LayoutType 
}
