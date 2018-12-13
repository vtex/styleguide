import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Box from '../Box/index'

class PageBlock extends Component {
  constructor(props) {
    super(props)

    const isAsideOrHalf = ['half', 'aside'].indexOf(props.variation) !== -1
    const hasRequiredChildren = props.children && props.children.length === 2

    if (isAsideOrHalf && !hasRequiredChildren) {
      throw new Error(
        `Component PageBlock with variation "${
          props.variation
        }" must have 2 nodes as children. It was passed ${
          props.children
            ? props.children.length
              ? props.children.length
              : 'one'
            : 'nothing'
        }.`
      )
    }
  }

  render() {
    const { title, subtitle, variation } = this.props
    const isAnnotated = variation === 'annotated'

    return (
      <div className={`flex ${isAnnotated ? 'flex-row' : 'flex-column'}`}>
        {/* Title & subtitle */}
        {(title || subtitle) && (
          <div className={isAnnotated ? 'w-third' : ''}>
            {title && <h2 className="t-heading-3 mt4 mb3 ml3">{title}</h2>}
            {subtitle && (
              <div
                className={`t-body lh-copy c-muted-1 mb7 ml3 ${!isAnnotated &&
                  'w-two-thirds-ns w-100'}`}>
                {subtitle}
              </div>
            )}
          </div>
        )}

        {/* Boxes and the content itself */}
        <div
          className={`flex flex-column flex-row-ns ${isAnnotated &&
            'w-two-thirds'}`}>
          {variation === 'half' ? (
            <Fragment>
              <div className="w-50-ns w-100 mr3-ns mb0-ns mb5">
                <Box>{this.props.children && this.props.children[0]}</Box>
              </div>
              <div className="w-50-ns w-100 ml3-ns mb5">
                <Box>{this.props.children && this.props.children[1]}</Box>
              </div>
            </Fragment>
          ) : variation === 'aside' ? (
            <Fragment>
              <div className="w-two-thirds-ns w-100 mr3-ns mb0-ns mb5">
                <Box>{this.props.children && this.props.children[0]}</Box>
              </div>
              <div className="w-third-ns w-100 ml3-ns mb5">
                <Box>{this.props.children && this.props.children[1]}</Box>
              </div>
            </Fragment>
          ) : (
            <div className="w-100 mb5">
              <Box>{this.props.children}</Box>
            </div>
          )}
        </div>
      </div>
    )
  }
}

PageBlock.defaultProps = {
  variation: 'full',
}

PageBlock.propTypes = {
  /** Type of layout grid for the content. Accepts 'full', 'half', 'asided' and 'annotated'. */
  variation: PropTypes.string,
  /** Title for the block. */
  title: PropTypes.bool,
  /** Subtitle for the block. */
  subtitle: PropTypes.bool,
  /** Contents of the boxes. Can be 1 or 2 nodes depending on the variation chosen. */
  children: PropTypes.node.isRequired,
}

export default PageBlock
