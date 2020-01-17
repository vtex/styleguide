import React from 'react'
import PropTypes from 'prop-types'

function PageIndicator({
  currentItemFrom,
  itemTo,
  textOf,
  totalItems,
  itemLabel,
  testId,
}) {
  return (
    <div className="c-muted-2 t-small" data-testid={testId}>
      {`${currentItemFrom} - ${itemTo} `}
      {textOf} {totalItems} {itemLabel}
    </div>
  )
}

PageIndicator.defaultProps = {
  itemLabel: '',
}

PageIndicator.propTypes = {
  currentItemFrom: PropTypes.number.isRequired,
  itemTo: PropTypes.number.isRequired,
  textOf: PropTypes.string.isRequired,
  totalItems: PropTypes.node.isRequired,
  itemLabel: PropTypes.node,
  testId: PropTypes.string,
}

export default PageIndicator
