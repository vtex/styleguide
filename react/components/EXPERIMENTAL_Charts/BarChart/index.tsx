import React, { FC } from 'react'
import getChartDefaultProps from '../helpers'
import { 
  BarChart as BarChartBase,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { colors } from '../commonProps'
import getBarDefaultProps from './helpers'

type Props = {
  barProps: BarProps
}

const BarChart:FC<Props & BaseChartProps> = ({
  schema,
  xAxisKey,
  dataKeys,
  data,
  barProps 
}) => {
  const { configs } = getChartDefaultProps(schema)
  const { barConfigs } = getBarDefaultProps(barProps)

  return (
  <ResponsiveContainer {...configs.container} >
    <BarChartBase data={data} {...barConfigs}>
      <CartesianGrid {...configs.grid} />
      <XAxis dataKey={xAxisKey} {...configs.xAxis} />
      <YAxis  {...configs.yAxis}/>
      <Tooltip/>
      <Bar dataKey={dataKeys[0]} fill={colors[1]} />
    </BarChartBase>
  </ResponsiveContainer>
  )
}

export default BarChart