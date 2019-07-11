import React from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../InputSearch'

const ToolbarInput = ({ onSubmit, disabled, inputSearch }) => {
  return (
    <form className="w-40" onSubmit={onSubmit}>
      <InputSearch disabled={disabled} {...inputSearch} />
    </form>
  )
}

ToolbarInput.propTypes = {
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
}

export default ToolbarInput
