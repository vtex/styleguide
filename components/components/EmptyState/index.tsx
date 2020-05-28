import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class EmptyState extends PureComponent {
  render() {
    const { title, children, testId } = this.props

    return (
      <div
        className="MAIN br3 flex c-muted-2 justify-center pv9 ph6 ph9-l tc"
        data-testid={testId}>
        <div className="w-80 w-50-l">
          {title && <span className="t-heading-3 mt0 mt0">{title}</span>}
          {children && <div className="t-body lh-copy">{children}</div>}
        </div>
      </div>
    )
  }
}

EmptyState.propTypes = {
  /** Title of the component (String) */
  title: (props, propName, componentName) => {
    if (!props.title && !props.children) {
      return new Error(
        `Prop 'title' or 'children' was not specified in '${componentName}'.`
      )
    }
  },
  /** node */
  children: (props, propName, componentName) => {
    if (!props.title && !props.children) {
      return new Error(
        `Prop 'title' or 'children' was not specified in '${componentName}'.`
      )
    }
  },
  /** Data attribute */
  testId: PropTypes.string,
}

export default EmptyState
