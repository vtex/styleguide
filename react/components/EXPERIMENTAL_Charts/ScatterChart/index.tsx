import React, { FC } from 'react'
import {
  ScatterChart as ScatterChartBase,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
} from 'recharts'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import { commonDefaultProps } from './constants'
import { getChartDefaultProps, getRangeOfZAxis } from '../helpers'
import { colors } from '../commonProps'

const CustomTooltip = props => {
  return props.payload.map(item => (
    <p key={uuid()}>{`${item.dataKey}: ${item.value}`}</p>
  ))
}

const ScatterChart: FC<BaseChartProps> = ({
  data,
  config,
  xAxisKey,
  yAxisKey,
  zAxisKey,
}) => {
  const { configs } = getChartDefaultProps(config, commonDefaultProps)

  return (
    <ResponsiveContainer {...configs.container}>
      <ScatterChartBase data={data}>
        <CartesianGrid {...configs.grid} />
        <XAxis dataKey={xAxisKey} {...configs.xAxis} />
        <YAxis dataKey={yAxisKey} {...configs.yAxis} />
        {zAxisKey && (
          <ZAxis dataKey={zAxisKey} range={getRangeOfZAxis(zAxisKey, data)} />
        )}
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Scatter fill={colors[0]} />
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
      hide: PropTypes.bool,
    }),
    yAxis: PropTypes.shape({
      axisLine: PropTypes.bool,
      tickLine: PropTypes.bool,
      tick: PropTypes.bool,
      hide: PropTypes.bool,
    }),
    container: PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    grid: PropTypes.shape({
      horizontal: PropTypes.bool,
      vertical: PropTypes.bool,
    }),
  }),

  /** The key of x-axis which is corresponding to the data. */
  xAxisKey: PropTypes.string.isRequired,

  /** The keys of y-axis which is corresponding to the data. */
  yAxisKey: PropTypes.string.isRequired,

  /** The keys or getter of a group of data which should be unique in a ScatterChart. */
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** The key of y-axis which is corresponding to the data, it measures size of dot. */
  zAxisKey: PropTypes.string.isRequired,
}

export default ScatterChart
