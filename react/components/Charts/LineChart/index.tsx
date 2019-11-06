import React, { FC } from 'react'
import {
    Line,
    LineChart as LineChartBase,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    TooltipFormatter
} from 'recharts'
import { colors, defaultProps, tooltipProps } from './constants'
import useChart from '../hooks/useChart'
import PropTypes from 'prop-types'

interface Props {
    data: any,
    dataKeys: string[],
    xAxisKey: string,
    yAxisKey?: string,
    schema: ChartProps,
    formatter: TooltipFormatter
}

const renderLines = (keys: string[]) => (
    keys.map((key, i) => 
      <Line
        key={key}
        dataKey={key}
        stroke={colors[i]}
        {...defaultProps}
      />
    )
)

const LineChart: FC<Props> = ({
    data,
    dataKeys,
    xAxisKey,
    schema,
    formatter
}) => {

    const { configs } = useChart(schema); 
    
    return (
        <ResponsiveContainer {...configs.container}>
            <LineChartBase data={data}>
                <XAxis dataKey={xAxisKey} {...configs.axis}  padding={{ left: 20 }}/>
                <YAxis {...configs.axis}/>
                <CartesianGrid
                    horizontal={configs.grid.horizontal}
                    vertical={configs.grid.vertical}
                />
                <Tooltip formatter={formatter} {...tooltipProps}/>
                {renderLines(dataKeys)}
            </LineChartBase>
        </ResponsiveContainer>
    )
}

LineChart.propTypes = {
    /** The source data, in which each element is an object. */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** The keys or getter of a group of data which should be unique in a LineChart. */
    dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** The key of x-axis which is corresponding to the data. */
    xAxisKey: PropTypes.string.isRequired,
    /** The schema prop defines the style of the component. The chema prop should be given as an object with styles defined for axis, grid and container.*/
    schema: PropTypes.any,
}
  

export default LineChart