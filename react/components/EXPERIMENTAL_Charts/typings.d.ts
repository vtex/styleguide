type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine', 'padding'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>
type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>
type DefaultBarProps = Pick<LineProps, 'layout'>

type ChartSchema = {
  xAxis?: BaseAxisProps,
  yAxis?: BaseAxisProps, 
  container?: BaseContainerProps,
  grid?: BaseGridProps
}

type AxisKey = 'number' | 'category'

type BaseChartProps = {
  data: any,
  dataKeys: string[],
  xAxisKey: string,
  yAxisKey: string,
  schema: ChartSchema
}

type LineProps = {
  type?: LineType
}

type BarProps = {
  layout?: LayoutType 
}
