import { merge } from 'lodash'
import { commonDefaultProps } from './commonProps'
import { defaultProps } from './LineChart/constants'

const getChartDefaultProps = (userProps: ChartProps)  => {
  const props = commonDefaultProps
  userProps && Object.keys(userProps).forEach(key => (
    props[key] = merge(props[key], userProps[key])
  ))
  
  return { configs: props }
}

const getLineDefaultProps = (userProps: LineProps)  => {
    const lineConfigs = {...defaultProps, ...userProps}
    return { lineConfigs }
}

export {
  getChartDefaultProps,
  getLineDefaultProps
}