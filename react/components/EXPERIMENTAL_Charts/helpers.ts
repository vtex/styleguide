import { commonDefaultProps } from './commonProps'

const getDefaultProps = (userProps: ChartProps)  => {
    const alteredKeys = Object.keys(userProps);
    const props = commonDefaultProps
    alteredKeys.map(key => props[key] = {...commonDefaultProps[key], ...userProps[key]})
    return { configs: props}
}


export default getDefaultProps