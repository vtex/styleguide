import React, { FC } from 'react'
import { getChartDefaultProps } from '../helpers'
import { 
  BarChart as BarChartBase,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { colors, tooltipProps } from '../commonProps'
import { getBarDefaultProps } from '../helpers'
import PropTypes from 'prop-types'

type Props = {
  barProps: BarProps
}

const BarChart:FC<Props & BaseChartProps> = ({
  config,
  xAxisKey,
  dataKeys,
  data,
  yAxisKey,
  barProps 
}) => {
  const { configs } = getChartDefaultProps(config)
  const { barConfigs } = getBarDefaultProps(barProps)

  return (
    <ResponsiveContainer {...configs.container} >
      <BarChartBase
        data={data}
        barCategoryGap='20%'
        {...barConfigs}
      >
        <CartesianGrid {...configs.grid} />
        <XAxis dataKey={xAxisKey} {...configs.xAxis} />
        <YAxis dataKey={yAxisKey} {...configs.yAxis}/>
        <Tooltip {...tooltipProps}/>
        <Bar dataKey={dataKeys[0]} fill={colors[1]} radius={[3, 3, 0, 0]}/>
      </BarChartBase>
    </ResponsiveContainer>
  )
}

BarChart.propTypes = {
  /** The source data, in which each element is an object. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** The keys or getter of a group of data which should be unique in a LineChart. */
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** The key of x-axis which is corresponding to the data. */
  xAxisKey: PropTypes.string,

  /** The key of y-axis which is corresponding to the data. */
  yAxisKey: PropTypes.string,
  
  /** The schema prop changes some styles of the chart. 
   * This prop should be given as an object. Check an example [here](/#/Components/Charts/LineChart?id=chart-config)*/
  config: PropTypes.object,

  /** An object that will change specific bar props, like the orientation */
  barProps: PropTypes.object
}

export default BarChart
