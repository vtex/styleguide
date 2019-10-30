import React, { FC } from 'react'
import csx from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'

const Container: FC<ContainerProps> = ({ justify, children }) => (
  <div
    id={NAMESPACES.TOOLBAR.CONTAINER}
    className={csx(
      ORDER_CLASSNAMES.TOOLBAR,
      `mb5 flex flex-row w-100 justify-${justify}`
    )}>
    {children}
  </div>
)

export enum Justify {
  Between = 'between',
  End = 'end',
  Start = 'start',
  Around = 'around',
  Center = 'center',
}

Container.defaultProps = {
  justify: Justify.End,
}

export type ContainerProps = {
  justify?: Justify
}

export default Container
