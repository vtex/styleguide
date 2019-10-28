type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>

type DefaultProps = {
    axis: BaseAxisProps,
    container: BaseContainerProps,
    grid: BaseGridProps
}