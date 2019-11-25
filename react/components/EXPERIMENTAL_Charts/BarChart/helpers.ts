import { defaultProps } from './constants'

const merge = (defaultProps: any, customProps: any) => {
  const newProps = defaultProps
  customProps && Object.keys(customProps).forEach(key => (
    newProps[key] = merge(newProps[key], customProps[key])
  ))
  return newProps
}

const getBarDefaultProps = (userProps: BarProps)  => {
  const barConfigs = merge(defaultProps, userProps)
  return { barConfigs }
}

export default getBarDefaultProps