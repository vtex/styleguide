import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ArrowBack from '../icon/ArrowBack'
import Button from '../Button'

class PageHeader extends PureComponent {
  handleClick = e => {
    this.props.onLinkClick && this.props.onLinkClick(e)
  }

  handleButtonClick = e => {
    this.props.onButtonClick && this.props.onButtonClick(e)
  }

  render() {
    const { linkLabel, buttonLabel } = this.props

    return (
      <div className="vtex-pageHeader__container bg-light-silver pa7">
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
          className={`vtex-pageHeader__title near-black f2 fw6 flex flex-row justify-between ${
            linkLabel ? 'mt0' : 'mt7'
          }`}
        >
          <span>{this.props.title}</span>
          {buttonLabel && (
            <Button
              size="small"
              variation="primary"
              neutral
              onClick={this.handleButtonClick}
            >
              {buttonLabel}
            </Button>
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
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
}

export default PageHeader
