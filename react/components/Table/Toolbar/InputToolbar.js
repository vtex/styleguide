import React from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../../InputSearch'

const InputToolbar = ({ disabled, inputSearch }) => {
  const handleInputSearchSubmit = e => {
    !!inputSearch.onSubmit && inputSearch.onSubmit(e)
  }

  return (
    <form className="w-40" onSubmit={handleInputSearchSubmit}>
      <InputSearch disabled={disabled} {...inputSearch} />
    </form>
  )
}

InputToolbar.propTypes = {
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
  disabled: PropTypes.bool,
}

export default InputToolbar
