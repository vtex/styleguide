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

const BarChart:FC<BaseChartProps> = ({
  schema,
  xAxisKey,
  dataKeys,
  data 
}) => {
  const { configs } = getChartDefaultProps(schema)
  return (
  <ResponsiveContainer {...configs.container} >
    <BarChartBase data={data} layout='vertical'>
      <CartesianGrid {...configs.grid} />
      <XAxis type='number' {...configs.xAxis} />
      <YAxis type='category' {...configs.yAxis} hide/>
      <Tooltip/>
      <Bar dataKey={dataKeys[0]} fill={colors[1]} />
  </BarChartBase>
  </ResponsiveContainer>
  )
}

export default BarChart