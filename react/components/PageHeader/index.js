import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ArrowBack from '../icon/ArrowBack'
import Button from '../Button'

class PageHeader extends PureComponent {
  handleClick = e => {
    this.props.onLinkClick && this.props.onLinkClick(e)
  }

  render() {
    const { linkLabel, children } = this.props

    return (
      <div className="vtex-pageHeader__container bg-muted-5 pa7">
        {linkLabel && (
          <div className="vtex-pageHeader-link__container">
            <Button
              size="small"
              variation="tertiary"
              neutral
              onClick={this.handleClick}
            >
              <span
                className="flex align-baseline relative"
                style={{ marginLeft: '-16px' }}
              >
                <span className="mr3">
                  <ArrowBack color="currentColor" />
                </span>
                {linkLabel}
              </span>
            </Button>
          </div>
        )}

        <div
          className={`vtex-pageHeader__title c-on-base f2 fw6 flex flex-row justify-between ${
            linkLabel ? 'mt0' : 'mt7'
          }`}
        >
          <span>{this.props.title}</span>

          {children && (
            <div className="vtex-pageHeader__children">{children}</div>
          )}
        </div>
      </div>
    )
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  linkLabel: PropTypes.string,
  onLinkClick: PropTypes.func,
  children: PropTypes.node,
}

export default PageHeader
