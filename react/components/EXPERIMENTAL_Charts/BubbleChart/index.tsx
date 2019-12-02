import React, {FC} from 'react'
import {
  ScatterChart as ScatterChartBase, 
  XAxis, 
  YAxis,
  ZAxis, 
  Tooltip,
  Scatter,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { getChartDefaultProps, getRangeOfZAxis } from '../helpers'
import { commonDefaultProps, colors } from '../commonProps'


const BubbleChart:FC<BaseChartProps> = ({
  data,
  schema,
  xAxisKey,
  yAxisKey,
  zAxisKey
}) => {
  const { configs } = getChartDefaultProps(commonDefaultProps, schema)

  return (
    <ResponsiveContainer {...configs.container} >
      <ScatterChartBase data={data}>
        <CartesianGrid {...configs.grid}/>
        <XAxis dataKey={xAxisKey} {...configs.xAxis} />
        <YAxis dataKey={yAxisKey} {...configs.yAxis} />
        <ZAxis dataKey={zAxisKey} range={getRangeOfZAxis(zAxisKey, data)}/>
        <Tooltip cursor={false}/>
        <Scatter fill={colors[0]} />
      </ScatterChartBase>
    </ResponsiveContainer>
  )
}

export default BubbleChart