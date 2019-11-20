import React, { FC } from 'react'
import getChartDefaultProps from '../helpers'
import { 
  BarChart as BarChartBase,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts'
import { colors } from '../commonProps'

const BarChart:FC<BaseChartProps> = ({
  schema,
  xAxisKey,
  dataKeys,
  data 
}) => {
  const { configs } = getChartDefaultProps(schema)
  return (
  <ResponsiveContainer {...configs.container} >
    <BarChartBase data={data}>
      <CartesianGrid {...configs.grid} />
      <XAxis dataKey={xAxisKey} {...configs.xAxis}/>
      <YAxis {...configs.yAxis} />
      <Bar dataKey={dataKeys[0]} fill={colors[1]}/>
  </BarChartBase>
  </ResponsiveContainer>
  )
}

export default BarChart