import React, { FC } from 'react'
import getChartDefaultProps from '../helpers'
import { 
  BarChart as BarChartBase,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
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
  yAxisKey,
  barProps 
}) => {
  const { configs } = getChartDefaultProps(schema)
  const { barConfigs } = getBarDefaultProps(barProps)
  console.log(data)
  console.log(parseInt(configs.container.width, 10))
  return (
  <ResponsiveContainer {...configs.container} >
    <BarChartBase
      data={data}
      barCategoryGap={30}
      {...barConfigs}
    >
      <CartesianGrid {...configs.grid} />
      <XAxis dataKey={xAxisKey} {...configs.xAxis} />
      <YAxis dataKey={yAxisKey} {...configs.yAxis}/>
      <Tooltip/>
      <Bar dataKey={dataKeys[0]} fill={colors[1]} radius={[4, 4, 0, 0]}>
      {
        data.map((entry, index) => console.log(entry))
      }
      </Bar>
    </BarChartBase>
  </ResponsiveContainer>
  )
}

export default BarChart