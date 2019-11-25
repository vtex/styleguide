import { defaultProps } from './constants'
import { merge } from '../helpers'

const getLineDefaultProps = (userProps: LineProps)  => {
    const lineConfigs = merge(defaultProps, userProps)
    return { lineConfigs }
}


export default getLineDefaultProps