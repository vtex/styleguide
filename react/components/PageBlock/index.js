import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Box from '../Box/index'

class PageBlock extends Component {
  render() {
    const {
      title,
      subtitle,
      variation,
      titleAside,
      testId,
      boxProps: receivedBoxProps,
      fill,
    } = this.props
    const isAnnotated = variation === 'annotated'

    const headerClasses = classNames({
      'w-third': isAnnotated,
      'flex flex-row justify-between': !isAnnotated && titleAside,
      'flex flex-column': isAnnotated && titleAside,
    })

    const titleClasses = classNames(
      'styleguide__pageBlock_title t-heading-3 mb3 ml5 ml3-ns',
      {
        mt0: titleAside,
        mt4: !titleAside,
      }
    )

    const containerClasses = classNames('styleguide__pageBlock flex', {
      'flex-row': isAnnotated,
      'flex-column': !isAnnotated,
      'h-100 w-100': fill,
    })

    const boxesContainerClasses = classNames(
      'flex flex-column flex-row-ns mb5-ns',
      {
        'w-two-thirds': isAnnotated,
        'w-100 h-100': !isAnnotated && fill,
      }
    )

    const boxProps = {
      fill,
      ...receivedBoxProps,
    }

    return (
      <div className={containerClasses} data-testid={testId}>
        {/* Title, subtitle & aside */}
        {(title || subtitle) && (
          <div className={headerClasses}>
            <div className="flex-grow-1">
              {title && <h2 className={titleClasses}>{title}</h2>}
              {subtitle && (
                <div
                  className={`t-body lh-copy c-muted-1 mb7 ml3 ${!isAnnotated &&
                    'w-two-thirds-ns w-100'}`}>
                  {subtitle}
                </div>
              )}
            </div>
            {titleAside && !isAnnotated && (
              <div className="flex-grow-1">{titleAside}</div>
            )}
          </div>
        )}

        {/* Boxes and the content itself */}
        <div className={boxesContainerClasses}>
          {variation === 'half' ? (
            <Fragment>
              <div className="w-50-ns w-100 mr3-ns mb0-ns mb5">
                <Box {...boxProps}>
                  {this.props.children && this.props.children[0]}
                </Box>
              </div>
              <div className="w-50-ns w-100 ml3-ns mb0-ns mb5">
                <Box {...boxProps}>
                  {this.props.children && this.props.children[1]}
                </Box>
              </div>
            </Fragment>
          ) : variation === 'aside' ? (
            <Fragment>
              <div className="w-two-thirds-ns w-100 mr3-ns mb0-ns mb5">
                <Box {...boxProps}>
                  {this.props.children && this.props.children[0]}
                </Box>
              </div>
              <div className="w-third-ns w-100 ml3-ns mb0-ns mb5">
                <Box {...boxProps}>
                  {this.props.children && this.props.children[1]}
                </Box>
              </div>
            </Fragment>
          ) : (
            <div className="w-100 mb0-ns mb5">
              <Box {...boxProps}>{this.props.children}</Box>
            </div>
          )}
        </div>
      </div>
    )
  }
}

PageBlock.defaultProps = {
  variation: 'full',
  fill: false,
}

PageBlock.propTypes = {
  /** Type of layout grid for the content. */
  variation: PropTypes.oneOf(['full', 'half', 'annotated', 'aside']),
  /** Title for the block. */
  title: PropTypes.string,
  /** Data attribute */
  testId: PropTypes.string,
  /** Subtitle for the block. */
  subtitle: PropTypes.string,
  /** Content on the right side of the title. */
  titleAside: PropTypes.node,
  /** Contents of the boxes. Can be 1 or 2 nodes depending on the variation chosen. */
  children: function(props, propName, componentName) {
    PropTypes.checkPropTypes(
      {
        children: PropTypes.node.isRequired,
      },
      props,
      'props',
      componentName
    )

    const isAsideOrHalf = ['half', 'aside'].indexOf(props.variation) !== -1
    const hasRequiredChildren = props[propName] && props[propName].length === 2

    if (isAsideOrHalf && !hasRequiredChildren) {
      return new Error(
        `Invalid prop \`children\` supplied to \`${componentName}\` with variation "${
          props.variation
        }", it must have 2 nodes as children. It was passed ${
          props.children
            ? props.children.length
              ? props.children.length
              : 'one'
            : 'nothing'
        }.`
      )
    }
  },
  /** Box component props */
  boxProps: PropTypes.shape({
    noPadding: PropTypes.bool,
    title: PropTypes.string,
  }),
  /** Determines if the PageBlock should fill the parent's element dimensions */
  fill: PropTypes.bool,
}

export default PageBlock
