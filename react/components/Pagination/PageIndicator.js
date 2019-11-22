import React from 'react'
import PropTypes from 'prop-types'

function PageIndicator({ currentItemFrom, itemTo, textOf, totalItems }) {
  return (
    <div className="c-muted-2 t-small">
      {currentItemFrom}
      {' - '}
      {itemTo} {textOf} {totalItems}
    </div>
  )
}

PageIndicator.propTypes = {
  currentItemFrom: PropTypes.number,
  itemTo: PropTypes.number,
  textOf: PropTypes.string,
  totalItems: PropTypes.number,
}

export default PageIndicator
