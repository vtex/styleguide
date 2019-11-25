import { commonDefaultProps } from './commonProps'
import { merge as mergeBase } from 'lodash'

const merge = (defaultProps: any, customProps: any) => {
  const newProps = defaultProps
  customProps && Object.keys(customProps).forEach(key => (
    newProps[key] = mergeBase(newProps[key], customProps[key])
  ))
  return newProps
}

const getDefaultProps = (chartCommonProps: ChartSchema = {}, userProps: ChartSchema)  => {
  const configs = merge(merge(commonDefaultProps, chartCommonProps), userProps)
  return { configs }
}

export default getDefaultProps