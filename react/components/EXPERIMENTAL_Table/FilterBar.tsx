import React, { FC } from 'react'
import { InferProps } from 'prop-types'
import csx from 'classnames'

import FilterBarBase, { filterBarPropTypes } from '../FilterBar/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'

const FilterBar: FC<FilterBarProps> = props => {
  return (
    <div
      id={NAMESPACES.FILTER_BAR}
      className={csx('mb5', ORDER_CLASSNAMES.FILTER_BAR)}>
      <FilterBarBase {...props} />
    </div>
  )
}

type FilterBarProps = InferProps<typeof filterBarPropTypes>

export default FilterBar
