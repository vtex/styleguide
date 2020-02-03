import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import FilterBarBase, { filterBarPropTypes } from '../FilterBar/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'

const FilterBar: FC<FilterBarProps> = props => {
  return (
    <ActionBar id={NAMESPACES.FILTER_BAR} order={ORDER_CLASSNAMES.FILTER_BAR}>
      <FilterBarBase {...props} />
    </ActionBar>
  )
}

type FilterBarProps = InferProps<typeof filterBarPropTypes>

export default FilterBar
