import { commonDefaultProps } from './commonProps'

const getDefaultProps = (userProps: ChartSchema)  => {
    const configs: ChartSchema = {...commonDefaultProps, ...userProps}
    return { configs }
}

export default getDefaultProps