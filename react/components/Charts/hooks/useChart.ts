import { commonDefaultProps } from '../commonProps'

const useChart = (userProps: ChartProps)  => {
    const configs: ChartProps = {...commonDefaultProps, ...userProps}
    return { configs }
}

export default useChart