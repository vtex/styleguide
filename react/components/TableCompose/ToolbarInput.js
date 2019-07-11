import React from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../InputSearch'

const ToolbarInput = ({ disabled, inputSearch }) => {
  const handleInputSearchSubmit = e => {
    !!inputSearch.onSubmit && inputSearch.onSubmit(e)
  }

  return (
    <form className="w-40" onSubmit={handleInputSearchSubmit}>
      <InputSearch disabled={disabled} {...inputSearch} />
    </form>
  )
}

ToolbarInput.propTypes = {
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
  disabled: PropTypes.bool,
}

export default ToolbarInput
