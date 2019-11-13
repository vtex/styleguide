import { commonDefaultProps } from './commonProps'

const getDefaultProps = (userProps: ChartProps)  => {
    const configs: ChartProps = {...commonDefaultProps, ...userProps}
    return { configs }
}


export default getDefaultProps