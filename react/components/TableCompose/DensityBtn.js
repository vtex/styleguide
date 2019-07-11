import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import IconDensity from '../icon/Density'
import ButtonWithIcon from '../ButtonWithIcon'
import useOutsideClick from './useOutsideCick'

const DENSITY_OPTIONS = ['low', 'medium', 'high']
const FIELDS_BOX_ITEM_HEIGHT = 36
const BOX_SHADOW_STYLE = { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' }
const ICON_OPTICAL_COMPENSATION = { marginTop: '1.5px' }
const MEDIUM_ICON_SIZE = 14

const DensityBtn = ({
  density,
  disabled,
  handleToggleDensity,
  selectedDensity,
}) => {
  const [isDensityBoxVisible, setDensityBoxVisible] = useState(false)
  const densityBtnRef = useRef(null)

  useOutsideClick(
    densityBtnRef,
    () => setDensityBoxVisible(false),
    isDensityBoxVisible
  )

  return (
    <div
      id="toggleDensity"
      title={density.buttonLabel}
      ref={densityBtnRef}
      className="relative mh2">
      <ButtonWithIcon
        icon={
          <span className="c-on-base mh2" style={ICON_OPTICAL_COMPENSATION}>
            <IconDensity size={MEDIUM_ICON_SIZE} />
          </span>
        }
        disabled={disabled}
        variation="tertiary"
        size="small"
        onClick={() => setDensityBoxVisible(!isDensityBoxVisible)}
      />
      {isDensityBoxVisible && (
        <div
          className={`absolute ${
            density.alignMenu === 'right' ? 'right-0' : 'left-0'
          } z-999 ba b--muted-4 br2 mt2 mh2`}
          style={BOX_SHADOW_STYLE}>
          <div className="w-100 b2 br2 bg-base">
            <div
              style={{ height: 3 * FIELDS_BOX_ITEM_HEIGHT }}
              className="overflow-auto">
              {DENSITY_OPTIONS.map((key, index) => {
                const isKeySelected = selectedDensity === key
                return (
                  <div
                    key={index}
                    className={`flex justify-between ph6 pv3 ${
                      isKeySelected ? 'b--emphasis' : 'b--transparent'
                    } pointer hover-bg-muted-5 bl bw1`}
                    onClick={() => {
                      handleToggleDensity(key)
                      setDensityBoxVisible(false)
                      density.handleCallback && density.handleCallback(key)
                    }}>
                    <span className={`w-100 ${isKeySelected ? 'fw5' : ''}`}>
                      {density[`${key}OptionLabel`]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

DensityBtn.propTypes = {
  density: PropTypes.shape({
    buttonLabel: PropTypes.string,
    lowOptionLabel: PropTypes.string,
    mediumOptionLabel: PropTypes.string,
    highOptionLabel: PropTypes.string,
    alignMenu: PropTypes.oneOf(['right', 'left']),
  }),
  disabled: PropTypes.bool,
  handleToggleDensity: PropTypes.func,
  selectedDensity: PropTypes.string,
}

export default DensityBtn
