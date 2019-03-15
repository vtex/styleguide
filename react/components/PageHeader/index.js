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
      <div className="vtex-pageHeader__container pa5 pa7-ns">
        {linkLabel && (
          <div className="vtex-pageHeader-link__container">
            <Button
              size="small"
              variation="tertiary"
              neutral
              onClick={this.handleClick}>
              <span
                className="flex align-baseline relative"
                style={{ marginLeft: '-16px' }}>
                <span className="mr3">
                  <ArrowBack color="currentColor" />
                </span>
                {linkLabel}
              </span>
            </Button>
          </div>
        )}

        <div className="flex flex-row flex-wrap justify-between">
          <div
            className={`vtex-pageHeader__title c-on-base flex flex-wrap
            ${linkLabel ? 'mt0' : 'mt7'}`}>
            <div className="t-heading-2 order-0 order-0-ns flex-grow-1">
              {this.props.title}
            </div>
            {children && (
              <div className="vtex-pageHeader__children order-2 order-0-ns">
                {children}
              </div>
            )}
            <div className="w-100" />
            <div className="t-body c-muted-1 mv5 order-1 order-0-ns">
              {this.props.subtitle}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  linkLabel: PropTypes.string,
  onLinkClick: PropTypes.func,
  children: PropTypes.node,
}

export default PageHeader
