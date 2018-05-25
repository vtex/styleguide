import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class EmptyState extends PureComponent {
  render() {
    const { title, children } = this.props

    return (
      <div className="b--black-10 ba br3 flex gray justify-center pv9 ph6 ph9-l tc">
        <div className="w-80 w-50-l">
          {title && <h2 className="f3 fw5 mt0 mt0">{title}</h2>}
          {children && <div className="f5 lh-copy">{children}</div>}
        </div>
      </div>
    )
  }
}

EmptyState.propTypes = {
  children: PropTypes.node,
  title: PropTypes.bool,
}

export default EmptyState
