import React, { ComponentType } from 'react'
import { commonDefaultProps } from './commonProps'

const withChartProps = <T extends DefaultProps>(WrappedComponent: ComponentType<T>) => {
    return (props: T) => <WrappedComponent {...props} {...commonDefaultProps}/>
}

export default withChartProps