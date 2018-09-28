import React, { PureComponent } from 'react'

class EmptyState extends PureComponent {
  render() {
    const { title, children } = this.props

    return (
      <div className="br3 flex c-muted-2 justify-center pv9 ph6 ph9-l tc">
        <div className="w-80 w-50-l">
          {title && <h2 className="f3 fw5 mt0 mt0">{title}</h2>}
          {children && <div className="f5 lh-copy">{children}</div>}
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
        `Prop 'title' or 'children' was not specified in '${componentName}'.`,
      )
    }
  },
  /** node */
  children: (props, propName, componentName) => {
    if (!props.title && !props.children) {
      return new Error(
        `Prop 'title' or 'children' was not specified in '${componentName}'.`,
      )
    }
  },
}

export default EmptyState
