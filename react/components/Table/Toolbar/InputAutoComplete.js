import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../../Spinner'
import InputSearch from '../../InputSearch'
import useOutsideClick from '../hooks/useOutsideCick'
import Box from './Box'

const InputAutoComplete = ({ inputSearch, disabled }) => {
  const {
    onSubmit: handleSubmit,
    autoComplete: { isLoading },
  } = inputSearch

  const [isBoxVisible, setBoxVisible] = useState(false)

  const formRef = useRef(null)
  useOutsideClick(formRef, () => setBoxVisible(false), isBoxVisible)

  const handleFocus = () => {
    setBoxVisible(true)
  }
  const handleBlur = () => {
    setBoxVisible(false)
  }

  return (
    <form
      ref={formRef}
      className="w-40 flex flex-column"
      onSubmit={handleSubmit}>
      <InputSearch
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        {...inputSearch}
      />
      {isBoxVisible && (
        <div className="relative">
          <Box
            borderClasses="br--bottom br2 bb bl br bw1 b--muted-2"
            width={'100%'}
            noMargin>
            {isLoading && (
              <div className="flex flex-row justify-center items-center pa4">
                <Spinner size={20} />
              </div>
            )}
          </Box>
        </div>
      )}
    </form>
  )
}

InputAutoComplete.propTypes = {
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
    autoComplete: PropTypes.shape({
      isLoading: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
}

export default InputAutoComplete
