import React from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../../InputSearch'

const InputToolbar = ({ inputSearch, disabled }) => {
  const { onSubmit: handleSubmit } = inputSearch
  return (
    <form className="w-40" onSubmit={handleSubmit}>
      <InputSearch disabled={disabled} {...inputSearch} />
    </form>
  )
}

InputToolbar.propTypes = {
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
}

export default InputToolbar
