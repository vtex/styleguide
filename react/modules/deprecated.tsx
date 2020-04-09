/**
 * This module helps warning deprecated Components or props
 * API props:
 * deprecated({
 *  useNewComponent: {
 *    old: OldComponentName
 *    new: NewComponentName,
 *  },
 *  useNewProps: {
 *    OldPropName: NewPropName,
 *    OtherOldPropName: OtherNewPropName,
 *  },
 * })(Component)
 * */
import React, { Component, ComponentType } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type genericObj = Record<string, any>

interface DeprecatedProps {
  useNewProps?: genericObj
  useNewComponent?: genericObj
}

// Attempt to get the wrapped component's name
function getComponentName<T>(target: ComponentType<T>) {
  if (target.displayName && typeof target.displayName === 'string') {
    return target.displayName
  }

  return target.name || 'Unamed component'
}

const mapNewProps = (propsMap: genericObj, props: genericObj) => {
  const newProps: genericObj = {}
  Object.keys(propsMap).map(deprecatedProp => {
    if (props[deprecatedProp]) {
      newProps[propsMap[deprecatedProp]] = props[deprecatedProp]
    }
    return null
  })
  return { ...props, ...newProps }
}

export default function deprecated<T extends DeprecatedProps>({
  useNewComponent,
  useNewProps,
}: T) {
  return (WrappedComponent: ComponentType<T>) => {
    return class Deprecated extends Component<T> {
      public componentDidMount() {
        if (useNewComponent) {
          console.warn(
            '"%s" component is deprecated, you should use "%s" instead',
            useNewComponent.old,
            useNewComponent.new
          )
        }
        if (useNewProps) {
          Object.keys(useNewProps).map(deprecatedProp => {
            if (deprecatedProp in this.props) {
              console.warn(
                '"%s" prop "%s" is deprecated, you should use "%s" instead',
                getComponentName(WrappedComponent),
                deprecatedProp,
                useNewProps[deprecatedProp]
              )
            }
            return null
          })
        }
      }

      public render() {
        const newProps = (useNewProps
          ? mapNewProps(useNewProps, this.props)
          : this.props) as T
        return <WrappedComponent {...newProps} />
      }
    }
  }
}
