import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ArrowBack from '../icon/ArrowBack'
import Button from '../Button'

class PageHeader extends PureComponent {
  handleClick = e => {
    this.props.linkClick && this.props.linkClick(e)
  }

  render() {
    const { linkLabel } = this.props

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
          className={`vtex-pageHeader__title near-black f2 fw6 ${
            linkLabel ? 'mt0' : 'mt7'
          }`}
        >
          {this.props.title}
        </div>
      </div>
    )
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  linkLabel: PropTypes.string,
  linkClick: PropTypes.func,
}

export default PageHeader
