import React, { FC } from 'react'
import { zipWith } from 'ramda'
import {
  Line,
  LineChart as LineChartBase,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  TooltipFormatter,
} from 'recharts'
import { colors, defaultProps, tooltipProps } from './constants'
import useChart from '../hooks/useChart'
import PropTypes from 'prop-types'

interface Props {
  data: any,
  dataKeys: string[],
  xAxisKey: string,
  schema: ChartProps,
  formatter: TooltipFormatter
}

const renderLine = (key, color) => (
  <Line
    key={key}
    dataKey={key}
    stroke={color}
    {...defaultProps}
  />
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
            <XAxis dataKey={xAxisKey} {...configs.axis} />
            <YAxis {...configs.axis}/>
            <CartesianGrid
                horizontal={configs.grid.horizontal}
                vertical={configs.grid.vertical}
            />
            <Tooltip formatter={formatter} {...tooltipProps}/>
            {zipWith(renderLine, dataKeys, colors)}
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
  
  /** The formatter function of value in tooltip. If you return an array, the first entry will be the formatted "value", and the second entry will be the formatted "key" */
  formatter: PropTypes.func,
  
  /** The schema prop defines the style of the component. This prop should be given as an object with styles defined for axis, grid and container.*/
  schema: PropTypes.object,
}
  

export default LineChart