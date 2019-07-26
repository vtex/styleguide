import React, { useRef, useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import useOutsideClick from '../hooks/useOutsideCick'
import ButtonToolbar from './ButtonToolbar'
import Box from './Box'

const MenuContext = createContext(null)

const Item = ({ isSelected, handleCallback, closeMenuOnClick, children }) => {
  const { setBoxVisible } = useContext(MenuContext)

  const handleClick = () => {
    closeMenuOnClick && setBoxVisible(false)
    handleCallback()
  }

  return (
    <div
      className={`flex justify-between ph6 pv3 ${
        isSelected ? 'b--emphasis' : 'b--transparent'
      } pointer hover-bg-muted-5 bl bw1`}
      onClick={handleClick}>
      <span className={`w-100 flex justify-between ${isSelected ? 'fw5' : ''}`}>
        {children}
      </span>
    </div>
  )
}

const MenuToolbar = ({ button, box, children }) => {
  const [isBoxVisible, setBoxVisible] = useState(false)
  const buttonRef = useRef(null)

  useOutsideClick(buttonRef, () => setBoxVisible(false), isBoxVisible)

  return (
    <MenuContext.Provider value={{ isBoxVisible, setBoxVisible }}>
      <ButtonToolbar
        {...button}
        ref={buttonRef}
        onClick={() => setBoxVisible(!isBoxVisible)}>
        {isBoxVisible && <Box {...box}>{children}</Box>}
      </ButtonToolbar>
    </MenuContext.Provider>
  )
}

MenuToolbar.Item = Item

Item.propTypes = {
  isSelected: PropTypes.bool,
  handleCallback: PropTypes.func,
  closeMenuOnClick: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

MenuToolbar.propTypes = {
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

export default MenuToolbar
