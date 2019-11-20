import { commonDefaultProps } from './commonProps'

const getDefaultProps = (userProps: ChartSchema)  => {
    const configs = {...commonDefaultProps, ...userProps}
    return { configs }
}

export default getDefaultProps