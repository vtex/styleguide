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
 **/
import React, { Component } from 'react'

// Attempt to get the wrapped component's name
const getComponentName = target => {
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
  return {
    ...props,
    ...newProps,
  }
}

export default function deprecated({ useNewComponent, useNewProps }) {
  return WrappedComponent =>
    class Deprecated extends Component {
      componentDidMount() {
        if (useNewComponent) {
          console.warn(
            `"${useNewComponent.old}" component is deprecated, you should use "${useNewComponent.new}" instead`
          )
        }
        if (useNewProps) {
          Object.keys(useNewProps).map(deprecatedProp => {
            if (this.props[deprecatedProp]) {
              console.warn(
                `"${getComponentName(
                  WrappedComponent
                )}" prop "${deprecatedProp}" is deprecated, you should use "${
                  useNewProps[deprecatedProp]
                }" instead`
              )
            }
          })
        }
      }

      render() {
        const newProps = useNewProps
          ? mapNewProps(useNewProps, this.props)
          : this.props
        return <WrappedComponent {...newProps} />
      }
    }
}
