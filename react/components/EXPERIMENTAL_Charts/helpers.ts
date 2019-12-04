import { merge as mergeBase } from 'lodash'
import { commonDefaultProps } from './commonProps'
import { defaultProps as defaultLineProps } from './LineChart/constants'
import { defaultProps as defaultBarProps } from './BarChart/constants'

const merge = (defaultProps: any, userProps: any) => {
  const props = defaultProps
  userProps && Object.keys(userProps).forEach(key => (
    props[key] = mergeBase(props[key], userProps[key])
  ))

  return props
}

const getChartDefaultProps = (userProps: ChartConfig)  => {
  return { configs: merge(commonDefaultProps, userProps) }
}

const getLineDefaultProps = (userProps: LineProps) => ({
  lineConfigs: {...defaultLineProps, ...userProps}
})

const getBarDefaultProps = (userProps: BarProps) => ({ 
  barConfigs: {...defaultBarProps,...userProps} 
})

export {
  getChartDefaultProps,
  getLineDefaultProps,
  getBarDefaultProps
}