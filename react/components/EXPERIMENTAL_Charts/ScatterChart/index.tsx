import React, { FC } from 'react'
import {
  ScatterChart as ScatterChartBase, 
  XAxis, 
  YAxis, 
  Tooltip,
  Scatter,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { zipWith, curry } from 'lodash'
import PropTypes from 'prop-types'
import { getChartDefaultProps } from '../helpers'
import { colors, tooltipProps } from '../commonProps'
import uuid from 'uuid'


const renderScatter = (key, color) =>(
  <Scatter
    key={uuid()}
    dataKey={key}
    fill={color}
  />
)

const ScatterChart:FC<BaseChartProps> = ({
  data,
  config,
  xAxisKey,
  dataKeys
}) => {
  const { configs } = getChartDefaultProps(config)

  return (
    <ResponsiveContainer {...configs.container} >
      <ScatterChartBase data={data}>
        <CartesianGrid {...configs.grid}/>
        <XAxis dataKey={xAxisKey} {...configs.xAxis} />
        <YAxis {...configs.yAxis} />
        <Tooltip {...tooltipProps}/>
        {zipWith(dataKeys, colors, renderScatter)}
      </ScatterChartBase>
    </ResponsiveContainer>
  ) 
}

ScatterChart.propTypes = {
  /** The source data, in which each element is an object. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** The config prop changes some styles of the chart. This prop should be given as an object.*/
  config: PropTypes.shape({
    xAxis: PropTypes.shape({
      axisLine: PropTypes.bool,
      tickLine: PropTypes.bool,
      tick: PropTypes.bool,
      hide: PropTypes.bool
    }),
    yAxis: PropTypes.shape({
      axisLine: PropTypes.bool,
      tickLine: PropTypes.bool,
      tick: PropTypes.bool,
      hide: PropTypes.bool
    }), 
    container: PropTypes.shape({
      height: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number]
      ),
      width: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number]
      ),
    }),
    grid: PropTypes.shape({
      horizontal: PropTypes.bool,
      vertical: PropTypes.bool,
    })
  }),

  /** The key of x-axis which is corresponding to the data. */
  xAxisKey: PropTypes.string.isRequired,

   /** The keys or getter of a group of data which should be unique in a LineChart. */
   dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ScatterChart