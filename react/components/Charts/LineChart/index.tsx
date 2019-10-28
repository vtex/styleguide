import React, { FC } from 'react'
import {
    Line,
    LineChart as LineChartBase,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'
import { colors, defaultProps } from './constants'
import withChartProps from '../withChartProps'

interface Props extends ChartProps {
    hasVerticalGrid?: boolean,
    hasHorizontalGrid?: boolean,
    data: any,
    dataKeys: string[],
    xAxisKey: string,
    yAxisKey?: string,
}

const renderLines = (keys: string[]) => {
    return keys.map((key, i) => 
      <Line
        key={key}
        dataKey={key}
        stroke={colors[i]}
        {...defaultProps}
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

    const showHorizontalGrid = hasHorizontalGrid || baseProps.grid.horizontal
    const showVerticalGrid = hasVerticalGrid || baseProps.grid.vertical
    
    return (
        <ResponsiveContainer {...baseProps.container}>
            <LineChartBase data={data}>
                <XAxis dataKey={xAxisKey} {...baseProps.axis}/>
                <YAxis {...baseProps.axis}/>
                <CartesianGrid
                    horizontal={showHorizontalGrid}
                    vertical={showVerticalGrid}
                />
                <Tooltip cursor={false}/>
                {renderLines(dataKeys)}
            </LineChartBase>
        </ResponsiveContainer>
    )
}

export default withChartProps(LineChart)