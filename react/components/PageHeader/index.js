import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ArrowBack from '../icon/ArrowBack'
import Button from '../Button'

class PageHeader extends PureComponent {
  handleClick = e => {
    this.props.backClick && this.props.backClick(e)
  }

  render() {
    const { backLabel } = this.props

    return (
      <div className="bg-near-white pa5">
        {backLabel && (
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

              {backLabel}
            </span>
          </Button>
        )}

        <div
          className={`near-black f2 fw6 mt2 mb7 ${
            backLabel ? 'mt2' : 'mb2 mt8'
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
  backLabel: PropTypes.string,
  backClick: PropTypes.func,
}

export default PageHeader
