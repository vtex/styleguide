import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { NAMESPACES } from '../constants'

const propTypes = {
  justify: PropTypes.oneOf(['between', 'end', 'start', 'around', 'center']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

type Props = InferProps<typeof propTypes>

const Container: FC<Props> = ({ justify = 'end', children }) => (
  <div
    id={NAMESPACES.TOOLBAR.CONTAINER}
    className={`mb5 flex flex-row w-100 justify-${justify}`}>
    {children}
  </div>
)

Container.propTypes = propTypes

export default Container
