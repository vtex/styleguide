import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  content: PropTypes.any,
  isHeader: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const Cell: FC<Props> = ({ content, isHeader }) => (
  <div className={`dtc v-mid pa2 tl bb b--muted-4 ${isHeader ? 'bt' : ''}`}>
    {content}
  </div>
)

Cell.defaultProps = {
  content: '',
  isHeader: false,
}

Cell.propTypes = propTypes

export default Cell
