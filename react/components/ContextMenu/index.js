import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconOptionsDots from '../icon/OptionsDots'

export default class ContextMenu extends PureComponent {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      options: this.props.options,
    }
  }

  handleIconClick() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Fragment>
        <div onClick={this.handleIconClick}>
          <IconOptionsDots />
        </div>
      </Fragment>
    )
  }
}

ContextMenu.propTypes = {
  options: PropTypes.array,
}
