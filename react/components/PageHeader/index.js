import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ArrowBack from '../icon/ArrowBack'
import Button from '../Button'

class PageHeader extends PureComponent {
  handleClick = e => {
    this.props.onLinkClick && this.props.onLinkClick(e)
  }

  render() {
    const { linkLabel, children, subtitle } = this.props

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

        <div
          className={`c-on-base flex flex-wrap flex-row justify-between
            ${linkLabel ? 'mt0' : 'mt7'}`}>
          <div className="vtex-pageHeader__title t-heading-2 order-0 flex-grow-1">
            {this.props.title}
          </div>
          {children && (
            <div
              className={`vtex-pageHeader__children order-2 order-0-ns ${
                subtitle ? 'mt5' : ''
              } mt0-ns`}>
              {children}
            </div>
          )}
          <div className="w-100" style={{ height: 0 }} />
          {subtitle && (
            <div className="vtex-pageHeader__subtitle t-body lh-copy c-muted-1 mv5 order-1 order-0-ns">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    )
  }
}

PageHeader.propTypes = {
  /** Title for the header */
  title: PropTypes.node.isRequired,
  /** Subtitle for the header */
  subtitle: PropTypes.node,
  /** Label for the back button */
  linkLabel: PropTypes.node,
  onLinkClick: PropTypes.func,
  children: PropTypes.node,
}

export default PageHeader
