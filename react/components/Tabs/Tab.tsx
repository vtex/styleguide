import React, { PropsWithChildren } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useDevice from '../utils/useDevice'

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export type TabProps = PropsWithChildren<{
  label: string
  onClick?: (event: ClickEvent) => void
  active?: boolean
  fullWidth?: boolean
  hidden?: boolean
  disabled?: boolean
}>

function getTabStyle(active: boolean, disabled: boolean) {
  if (active && disabled) {
    return 'fw5 b--muted-1 c-muted-2'
  }
  if (active) {
    return 'c-on-muted b--emphasis fw5 vtex-tab__button--active'
  }
  if (disabled) {
    return 'b--muted-4 c-muted-3'
  }
  return 'c-muted-1 b--transparent hover-c-action-primary pointer vtex-tab__button--inactive'
}

function Tab({
  label,
  onClick = () => null,
  active = false,
  fullWidth = false,
  hidden = false,
  disabled = false,
}: TabProps) {
  const { isMobile } = useDevice()
  const isFullWidth = fullWidth ?? isMobile
  const tabStyle = getTabStyle(active, disabled)

  const handleClick = (event: ClickEvent) => {
    !disabled && onClick && onClick(event)
  }

  return (
    <button
      onClick={handleClick}
      className={classNames(
        tabStyle,
        'vtex-tab__button bt-0 bl-0 br-0 bw1 v-mid relative h-regular ph6 t-body bg-transparent outline-0',
        {
          'w-100': isFullWidth,
          dn: hidden && isFullWidth,
          'o-0': hidden && !isFullWidth,
        }
      )}
    >
      {label}
    </button>
  )
}

Tab.propTypes = {
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  isMobile: PropTypes.bool,
}

export default Tab
