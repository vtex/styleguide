type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine', 'padding'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>
type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>

type ChartProps = {
  xAxis?: BaseAxisProps,
  yAxis?: BaseAxisProps, 
  container?: BaseContainerProps,
  grid?: BaseGridProps
}

type LineProps = {
  type?: LineType
}
