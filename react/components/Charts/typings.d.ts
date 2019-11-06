type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine', 'padding'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>

type ChartProps = {
  axis: BaseAxisProps,
  container: BaseContainerProps,
  grid: BaseGridProps
}