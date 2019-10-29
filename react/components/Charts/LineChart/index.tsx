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
import useChart from '../hooks/useChart'

interface Props {
    data: any,
    dataKeys: string[],
    xAxisKey: string,
    yAxisKey?: string,
    schema: ChartProps
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
    schema
}) => {

    const { configs } = useChart(schema); 
    
    return (
        <ResponsiveContainer {...configs.container}>
            <LineChartBase data={data}>
                <XAxis dataKey={xAxisKey} {...configs.axis}/>
                <YAxis {...configs.axis}/>
                <CartesianGrid
                    horizontal={configs.grid.horizontal}
                    vertical={configs.grid.vertical}
                />
                <Tooltip cursor={false}/>
                {renderLines(dataKeys)}
            </LineChartBase>
        </ResponsiveContainer>
    )
}

export default LineChart