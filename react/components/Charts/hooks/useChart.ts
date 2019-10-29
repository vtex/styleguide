import { commonDefaultProps } from '../commonProps'

const useChart = (userProps: ChartProps): ChartProps => {
    return {...commonDefaultProps, ...userProps};
}

export default useChart