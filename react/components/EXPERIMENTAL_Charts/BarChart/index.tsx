import React, { FC } from 'react'
import getChartDefaultProps from '../helpers'
import { BarChart as BarChartBase, Bar, CartesianGrid, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

interface Props {
  schema: ChartProps,
}

const BarChart:FC<Props> = ({schema}) => {
  const { configs } = getChartDefaultProps(schema)
  return (
    <ResponsiveContainer {...configs.container} >
  <BarChartBase
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid vertical={false} stroke='#e5e6eb' />
    <XAxis dataKey="name" {...configs.xAxis}/>
    <YAxis {...configs.yAxis} />
    <Bar dataKey="pv" >
    {
      data.map((entry) => {
        const color = entry.uv== 4000 ? "#26baee" : "#edf9fc"
        return <Cell fill={color} />;
      })
    }
    </Bar>
  </BarChartBase>
  </ResponsiveContainer>
  )
}

export default BarChart