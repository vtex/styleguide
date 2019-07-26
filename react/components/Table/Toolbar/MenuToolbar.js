import React, { useRef, useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import useOutsideClick from '../hooks/useOutsideCick'
import ButtonToolbar from './ButtonToolbar'
import { constants } from '../util'
import Button from '../../Button'

const MenuContext = createContext(null)

const Box = ({ alignMenu, height, width, groupActions, children }) => {
  return (
    <div
      className={`absolute ${
        alignMenu === 'right' ? 'right-0' : 'left-0'
      } z-999 ba b--muted-4 br2 mt2 mh2`}
      style={{
        ...constants.BOX_SHADOW_STYLE,
        width: width,
      }}>
      <div className="w-100 b2 br2 bg-base">
        {groupActions && (
          <div className="flex inline-flex bb b--muted-4 w-100 justify-center pv4">
            {groupActions.map(action => (
              <div className="mh2" key={action.id}>
                <Button
                  variation="secondary"
                  size="small"
                  onClick={action.handleClick}>
                  {action.label}
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="overflow-auto" style={{ height: height }}>
          {children}
        </div>
      </div>
    </div>
  )
}

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

Box.propTypes = {
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
