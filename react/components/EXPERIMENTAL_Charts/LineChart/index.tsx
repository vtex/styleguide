import React, { FC } from 'react'
import zipWith from 'lodash/zipWith'
import curry from 'lodash/curry'
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
import uuid from 'uuid'

import { colors, tooltipProps } from '../commonProps'
import { getChartDefaultProps, getLineDefaultProps } from '../helpers'
import { LineProps, BaseChartProps } from '../types'

interface Props {
  tooltipFormatter: TooltipFormatter
  lineProps: LineProps
}

const renderLine = (lineConfigs, key, color) => (
  <Line key={uuid()} dataKey={key} stroke={color} {...lineConfigs} />
)

const LineChart: FC<Props & BaseChartProps> = ({
  data,
  dataKeys,
  xAxisKey,
  config,
  tooltipFormatter,
  lineProps,
}) => {
  const { configs } = getChartDefaultProps(config)
  const { lineConfigs } = getLineDefaultProps(lineProps)

  return (
    <ResponsiveContainer {...configs.container}>
      <LineChartBase data={data} {...configs.lineChart}>
        <CartesianGrid {...configs.grid} />
        <XAxis dataKey={xAxisKey} {...configs.xAxis} />
        <YAxis {...configs.yAxis} />
        <Tooltip
          formatter={tooltipFormatter}
          {...tooltipProps}
          {...configs.tooltip}
        />
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

  /** The config prop changes some styles of the chart. This prop should be given as an object. */
  config: PropTypes.shape({
    /** Container custom configuration (according to the Recharts API) */
    container: PropTypes.object,
    /** LineChart custom configuration (according to the Recharts API) */
    lineChart: PropTypes.object,
    /** XAxis custom configuration (according to the Recharts API) */
    xAxis: PropTypes.object,
    /** YAxis custom configuration (according to the Recharts API) */
    yAxis: PropTypes.object,
    /** Grid custom configuration (according to the Recharts API) */
    grid: PropTypes.object,
    /** Tooltip custom configuration (according to the Recharts API) */
    tooltip: PropTypes.object,
  }),

  /** The interpolation defines how data points should be connected when creating a path. */
  lineProps: PropTypes.object,
}

export default LineChart
