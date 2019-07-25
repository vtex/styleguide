import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import ButtonToolbar from './ButtonToolbar'
import Box from './Box'

import useOutsideClick from '../hooks/useOutsideCick'

const Menu = ({ button, box, children }) => {
  const [isBoxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef(null)

  useOutsideClick(buttonRef, () => setBoxVisible(false), isBoxVisible)

  return (
    <ButtonToolbar
      {...button}
      ref={buttonRef}
      onClick={() => setBoxVisible(!isBoxVisible)}>
      {isBoxVisible && <Box {...box}>{children}</Box>}
    </ButtonToolbar>
  )
}

Menu.propTypes = {
  button: PropTypes.shape({
    id: PropTypes.id,
    title: PropTypes.string,
    icon: PropTypes.element,
    disabled: PropTypes.bool,
  }),
  box: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    alignMenu: PropTypes.oneOf(['right', 'left']),
    groupActions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        handleClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Menu
