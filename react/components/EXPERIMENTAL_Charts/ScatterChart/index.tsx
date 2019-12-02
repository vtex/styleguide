import React, {FC} from 'react'
import {
  ScatterChart as ScatterChartBase, 
  XAxis, 
  YAxis, 
  Tooltip,
  Scatter,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { getChartDefaultProps } from '../helpers'
import { commonDefaultProps, colors} from '../commonProps'

const ScatterChart:FC<BaseChartProps> = ({
  data,
  config,
  xAxisKey,
  yAxisKey
}) => {
  const { configs } = getChartDefaultProps(config)
  
  return (
  <ResponsiveContainer {...configs.container} >
    <ScatterChartBase data={data}>
      <CartesianGrid {...configs.grid}/>
      <XAxis dataKey={xAxisKey} {...configs.xAxis} />
      <YAxis dataKey={yAxisKey} {...configs.yAxis} />
      <Tooltip cursor={false}/>
      <Scatter fill={colors[0]} />
    </ScatterChartBase>
  </ResponsiveContainer>
  )
  
}

export default ScatterChart