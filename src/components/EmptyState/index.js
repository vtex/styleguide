import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class EmptyState extends PureComponent {
  render() {
    const { title, children } = this.props

    return (
      <div className="b--black-10 ba br3 flex gray justify-center pa9 tc">
        <div className="w-50">
          {title && <h1 className="f3 fw5 mt0 mt0">{title}</h1>}
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
