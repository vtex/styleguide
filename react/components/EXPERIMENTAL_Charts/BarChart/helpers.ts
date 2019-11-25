import { defaultProps } from './constants'

const getBarDefaultProps = (userProps: BarProps)  => {
  const barConfigs = {...defaultProps, ...userProps}
  return { barConfigs }
}

export default getBarDefaultProps