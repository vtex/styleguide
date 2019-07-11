import React from 'react'

interface Props {
  /** Content of the box */
  children: React.ReactNode
  /** Use the full size of the box. */
  noPadding?: boolean
}

const Box: React.FC<Props> = ({ children, noPadding }) => {
  const padding = noPadding ? '' : 'pa7-ns'
  return (
    <div
      className={`styleguide__box bg-base t-body c-on-base ${padding} br3-ns b--muted-4 bt bb bl-ns br-ns`}>
      {children}
    </div>
  )
}

export default Box
