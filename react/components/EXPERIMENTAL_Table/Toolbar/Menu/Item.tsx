import React, { FC } from 'react'

import { useMenuContext } from './context'

export type ItemProps = {
  isSelected: boolean
  handleCallback: Function
  closeMenuOnClick: boolean
}

const Item: FC<ItemProps> = ({
  isSelected,
  handleCallback,
  closeMenuOnClick,
  children,
}) => {
  const { setBoxVisible } = useMenuContext()

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

export default Item
