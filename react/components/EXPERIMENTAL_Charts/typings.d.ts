type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseXAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine' | 'padding' | 'tick' | 'hide'>
type BaseYAxisProps = Pick<YAxisProps, 'axisLine' | 'tickLine' | 'padding' | 'tick' | 'hide'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>
type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>

type ChartProps = {
  xAxis?: BaseXAxisProps,
  yAxis?: BaseYAxisProps, 
  container?: BaseContainerProps,
  grid?: BaseGridProps
}

type LineProps = {
  type?: LineType
}
