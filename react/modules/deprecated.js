/**
 * This module helps warning deprecated Components or props
 * API props:
 * deprecated({
 *  useNewComponent: {
 *    OldComponentName: NewComponentName,
 *  },
 *  useNewProps: {
 *    OldPropName: NewPropName,
 *    OtherOldPropName: OtherNewPropName,
 *  },
 *  customMessage: 'Some custom deprecation message'
 * }, Component)
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
    newProps[propsMap[deprecatedProp]] = props[deprecatedProp]
  })
  return {
    ...props,
    ...newProps,
  }
}

function deprecated(
  { useNewComponent, useNewProps, customMessage },
  WrappedComponent
) {
  class Deprecated extends Component {
    componentDidMount() {
      if (useNewComponent) {
        const deprecatedComponentName = Object.keys(useNewComponent)[0]
        console.warn(
          `"${deprecatedComponentName}" is deprecated, you should use "${
            useNewComponent[deprecatedComponentName]
          }" instead`
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
      if (customMessage) {
        console.warn(customMessage)
      }
    }

    render() {
      const newProps = useNewProps
        ? mapNewProps(useNewProps, this.props)
        : this.props
      return <WrappedComponent {...newProps} />
    }
  }

  return Deprecated
}

export default deprecated
