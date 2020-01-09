import React, { FC } from 'react'
import {
  BarChart as BarChartBase,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import PropTypes from 'prop-types'

import { getChartDefaultProps, getBarDefaultProps } from '../helpers'
import { BAR_GAP, Layout, chartDefaultConfig } from './constants'
import { colors, tooltipProps } from '../commonProps'

type Props = {
  barProps: BarProps
}

const BarChart: FC<Props & BaseChartProps> = ({
  config,
  xAxisKey,
  data,
  yAxisKey,
  barProps,
}) => {
  const { configs } = getChartDefaultProps(config, chartDefaultConfig)
  const { barConfigs } = getBarDefaultProps(barProps)
  const dataKey = barConfigs.layout == Layout.HORIZONTAL ? yAxisKey : xAxisKey

  return (
    <ResponsiveContainer {...configs.container}>
      <BarChartBase data={data} barCategoryGap={BAR_GAP} {...barConfigs}>
        <CartesianGrid {...configs.grid} />
        <XAxis dataKey={xAxisKey} dy={-5} {...configs.xAxis} />
        <YAxis dataKey={yAxisKey} dy={10} {...configs.yAxis} />
        <Tooltip {...tooltipProps} />
        <Bar dataKey={dataKey} fill={colors[1]} radius={[3, 3, 0, 0]} />
      </BarChartBase>
    </ResponsiveContainer>
  )
}

BarChart.propTypes = {
  /** The source data, in which each element is an object. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** The key of x-axis which is corresponding to the data. */
  xAxisKey: PropTypes.string,

  /** The key of y-axis which is corresponding to the data. */
  yAxisKey: PropTypes.string,

  /** The schema prop changes some styles of the chart.
   * This prop should be given as an object. Check an example [here](/#/Components/Charts/LineChart?id=chart-config)*/
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

  /** An object that will change specific bar props, like the orientation */
  barProps: PropTypes.object,
}

export default BarChart
