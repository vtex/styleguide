import {
    CartesianGridProps,
    XAxisProps,
    ResponsiveContainerProps
} from 'recharts'
import React, { ComponentType } from 'react'
import { commonDefaultProps } from './commonProps'

type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>

type DefaultProps = {
    axis: BaseAxisProps,
    container: BaseContainerProps,
    grid: BaseGridProps
}

const withChartProps = <T extends DefaultProps>(WrappedComponent: ComponentType<T>) => {
    return (props: T) => <WrappedComponent {...props} {...commonDefaultProps}/>
}

export default withChartProps