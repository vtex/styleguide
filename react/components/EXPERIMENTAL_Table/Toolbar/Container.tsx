import React, { FC } from 'react'
import { NAMESPACES, JUSTIFY_OPTIONS } from '../constants'

type Props = {
  justify?: FlexJustify
}

const Container: FC<Props> = ({ justify, children }) => (
  <div
    id={NAMESPACES.TOOLBAR.CONTAINER}
    className={`order-0 mb5 flex flex-row w-100 justify-${justify}`}>
    {children}
  </div>
)

Container.defaultProps = {
  justify: JUSTIFY_OPTIONS.END,
}

export default Container
