import React from 'react'
import PropTypes from 'prop-types'

function PageIndicator({
  currentItemFrom,
  itemTo,
  textOf,
  totalItems,
  itemLabel,
}) {
  return (
    <div className="c-muted-2 t-small">
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
}

export default PageIndicator
