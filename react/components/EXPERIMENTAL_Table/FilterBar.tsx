import React, { FC } from 'react'
import { InferProps } from 'prop-types'

import FilterBarBase, { filterBarPropTypes } from '../FilterBar/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable } from './types'

const FilterBar: FC<FilterBarProps> = ({ testId = '', ...props }) => {
  return (
    <ActionBar
      id={NAMESPACES.FILTER_BAR}
      testId={testId}
      order={ORDER_CLASSNAMES.FILTER_BAR}>
      <FilterBarBase {...props} />
    </ActionBar>
  )
}

export type FilterBarProps = InferProps<typeof filterBarPropTypes> & E2ETestable

export default FilterBar
