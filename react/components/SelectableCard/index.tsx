import React, { FC } from 'react'
import PropTypes from 'prop-types'

import CheckIcon from '../icon/Check'

const propTypes = {
  /** Content of the card */
  children: PropTypes.node.isRequired,
  /** Use the full size of the card. */
  noPadding: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  /** Use this to group cards on the left. */
  hasGroupLeft: PropTypes.bool,
  /** Use this to group cards on the right. */
  hasGroupRight: PropTypes.bool,
}

const SelectableCard: FC<PropTypes.InferProps<typeof propTypes>> = ({
  children,
  noPadding,
  selected,
  onClick,
  hasGroupLeft,
  hasGroupRight,
}) => {
  const padding = noPadding ? '' : 'pa6'

  return (
    <div
      className={`ba br2 relative ${
        selected ? 'b--action-primary z-999' : 'b--transparent'
      } nh2`}
      style={{ borderWidth: '4px' }}>
      {selected ? (
        <div className="absolute right--1 top--1 br-100 h2 w2 bg-action-primary z-999">
          <div className="pa3">
            <CheckIcon color="white" />
          </div>
        </div>
      ) : null}
      <div
        style={{
          boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.25)',
          clipPath: `inset(-10px ${hasGroupRight ? '0px' : '-10px'} -10px ${
            hasGroupLeft ? '0px' : '-10px'
          })`,
        }}
        className={`vtex-card card w-100 b2 br2 bg-base c-on-base ${padding} ${
          onClick ? 'pointer' : ''
        }`}
        onClick={onClick ? () => onClick() : null}>
        {children}
      </div>
    </div>
  )
}

SelectableCard.propTypes = propTypes

export default SelectableCard
