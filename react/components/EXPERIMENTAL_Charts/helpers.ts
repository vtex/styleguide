import { merge } from 'lodash'
import { commonDefaultProps } from './commonProps'

const getDefaultProps = (userProps: ChartProps)  => {
  const props = commonDefaultProps
  userProps && Object.keys(userProps).forEach(key => (
    props[key] = merge(props[key], userProps[key])
  ))
  
  return { configs: props }
}


export default getDefaultProps