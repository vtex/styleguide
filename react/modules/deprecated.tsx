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

interface UseNewProps {
  submitFilterLable: string
  newFilterLable: string
}

interface UseNewComponent {
  old: string
  new: string
}

interface DeprecatedProps {
  useNewProps?: UseNewProps
  useNewComponent?: UseNewComponent
}

// Attempt to get the wrapped component's name
function getComponentName<T>(target: ComponentType<T>) {
  if (target.displayName && typeof target.displayName === 'string') {
    return target.displayName
  }

  return target.name || 'Unamed component'
}

const mapNewProps = (propsMap, props) => {
  const newProps = {}
  Object.keys(propsMap).map(deprecatedProp => {
    if (props[deprecatedProp]) {
      newProps[propsMap[deprecatedProp]] = props[deprecatedProp]
    }
  })
  return { ...props, ...newProps }
}

export default function deprecated<
  T extends DeprecatedProps = DeprecatedProps
>({ useNewComponent, useNewProps }: T) {
  return (WrappedComponent: React.ComponentType<T>) => {
    return class Deprecated extends Component {
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
            if (this.props[deprecatedProp]) {
              console.warn(
                '"%s" prop "%s" is deprecated, you should use "%s" instead',
                getComponentName(WrappedComponent),
                deprecatedProp,
                useNewProps[deprecatedProp]
              )
            }
          })
        }
      }

      public render() {
        const newProps = useNewProps
          ? mapNewProps(useNewProps, this.props)
          : this.props
        return <WrappedComponent {...newProps} />
      }
    }
  }
}
