import { defaultProps } from './constants'

const getLineDefaultProps = (userProps: LineProps)  => {
    const lineConfigs = {...defaultProps, ...userProps}
    return { lineConfigs }
}


export default getLineDefaultProps