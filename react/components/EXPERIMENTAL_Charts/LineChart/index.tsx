import React, { FC } from 'react'
import { zipWith, curry } from 'lodash'
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
import PropTypes from 'prop-types'
import { colors, tooltipProps } from './constants'
import getChartDefaultProps from '../helpers'
import getLineDefaultProps from './helpers';

interface Props {
  data: any,
  dataKeys: string[],
  xAxisKey: string,
  config: ChartProps,
  tooltipFormatter: TooltipFormatter,
  lineProps: LineProps,
}

const renderLine = (lineConfigs, key, color) =>(
  <Line
    key={key}
    dataKey={key}
    stroke={color}
    {...lineConfigs}
  />
)


const LineChart: FC<Props> = ({
  data,
  dataKeys,
  xAxisKey,
  config,
  tooltipFormatter,
  lineProps
}) => {
  const { configs } = getChartDefaultProps(config); 
  const { lineConfigs } = getLineDefaultProps(lineProps)

  return (
    <ResponsiveContainer {...configs.container}>
      <LineChartBase data={data}>
        <CartesianGrid {...configs.grid}/>
        <XAxis dataKey={xAxisKey} {...configs.xAxis}/>
        <YAxis  {...configs.yAxis} />
        <Tooltip formatter={tooltipFormatter} {...tooltipProps}/>
        {zipWith(dataKeys, colors, curry(renderLine)(lineConfigs))}
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
  tooltipFormatter: PropTypes.func,
  
  /** The schema prop changes some styles of the chart. This prop should be given as an object.*/
  config: PropTypes.object,

  /** The interpolation defines how data points should be connected when creating a path.*/
  lineProps: PropTypes.object,
}
  
export default LineChart