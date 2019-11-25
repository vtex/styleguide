import { defaultProps } from './constants'
import { merge } from '../helpers' 

const getBarDefaultProps = (userProps: BarProps)  => {
  const barConfigs = merge(defaultProps, userProps)
  return { barConfigs }
}

export default getBarDefaultProps