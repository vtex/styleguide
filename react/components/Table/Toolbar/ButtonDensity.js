import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import IconDensity from '../../icon/Density'
import ButtonToolbar from './ButtonToolbar'
import Box from './Box'
import { constants } from '../util'

import useOutsideClick from '../hooks/useOutsideCick'
import useTableContext from '../hooks/useTableContext'

const BOX_HEIGHT =
  constants.DENSITY_OPTIONS.length * constants.FIELDS_BOX_ITEM_HEIGHT

const ButtonDensity = ({ density, disabled }) => {
  const [isDensityBoxVisible, setDensityBoxVisible] = useState(false)
  const { state, setDensity } = useTableContext()
  const densityBtnRef = useRef(null)

  useOutsideClick(
    densityBtnRef,
    () => setDensityBoxVisible(false),
    isDensityBoxVisible
  )

  return (
    <ButtonToolbar
      id="toggleDensity"
      title={density.buttonLabel}
      ref={densityBtnRef}
      icon={<IconDensity size={constants.MEDIUM_ICON_SIZE} />}
      disabled={disabled}
      onClick={() => setDensityBoxVisible(!isDensityBoxVisible)}>
      {isDensityBoxVisible && (
        <Box height={BOX_HEIGHT} alignMenu={density.alignMenu}>
          {constants.DENSITY_OPTIONS.map((key, index) => {
            const isKeySelected = state.selectedDensity === key
            return (
              <div
                key={index}
                className={`flex justify-between ph6 pv3 ${
                  isKeySelected ? 'b--emphasis' : 'b--transparent'
                } pointer hover-bg-muted-5 bl bw1`}
                onClick={() => {
                  setDensity(key)
                  setDensityBoxVisible(false)
                  density.handleCallback && density.handleCallback(key)
                }}>
                <span className={`w-100 ${isKeySelected ? 'fw5' : ''}`}>
                  {density[`${key}OptionLabel`]}
                </span>
              </div>
            )
          })}
        </Box>
      )}
    </ButtonToolbar>
  )
}

ButtonDensity.propTypes = {
  density: PropTypes.shape({
    buttonLabel: PropTypes.string,
    lowOptionLabel: PropTypes.string,
    mediumOptionLabel: PropTypes.string,
    highOptionLabel: PropTypes.string,
    handleCallback: PropTypes.func,
    alignMenu: PropTypes.oneOf(['right', 'left']),
  }),
  disabled: PropTypes.bool,
}

export default ButtonDensity
