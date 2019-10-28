import React, { FC } from 'react'
import {
    Line,
    LineChart as LineChartBase,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    CartesianGridProps,
    XAxisProps,
    ResponsiveContainerProps
} from 'recharts'
import { colors, defaultProps as defaulLineProps } from './constants'
import withChartProps from '../withChartProps'


type BaseGridProps = Pick<CartesianGridProps, 'vertical' | 'horizontal'>
type BaseAxisProps = Pick<XAxisProps, 'axisLine' | 'tickLine'>
type BaseContainerProps = Pick<ResponsiveContainerProps, 'height' | 'width'>

type DefaultProps = {
    axis: BaseAxisProps,
    container: BaseContainerProps,
    grid: BaseGridProps
}
interface Props extends DefaultProps {
    hasVerticalGrid?: boolean,
    hasHorizontalGrid?: boolean,
    data: any,
    dataKeys: string[],
    xAxisKey: string,
    yAxisKey?: string,
}
const renderLines  = (keys: string[]) => {
    return keys.map((key, i) => 
      <Line
        key={key}
        dataKey={key}
        stroke={colors[i]}
        {...defaulLineProps}
      />
    )
  }

const LineChart: FC<Props> = ({
    data,
    dataKeys,
    xAxisKey,
    hasHorizontalGrid,
    hasVerticalGrid,
    ...baseProps
}) => {
    return (
        <ResponsiveContainer {...baseProps.container}>
            <LineChartBase data={data}>
                <XAxis dataKey={xAxisKey} {...baseProps.axis}/>
                <YAxis {...baseProps.axis}/>
                <CartesianGrid {...baseProps.grid}/>
                <Tooltip cursor={false}/>
                {renderLines(dataKeys)}
            </LineChartBase>
        </ResponsiveContainer>
    )
}

export default withChartProps(LineChart)