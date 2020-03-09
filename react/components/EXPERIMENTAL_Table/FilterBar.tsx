import React, { forwardRef } from 'react'
import { InferProps } from 'prop-types'

import FilterBarBase, { filterBarPropTypes } from '../FilterBar/index.js'
import { ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'
import { E2ETestable, RFC } from './types'
import { useTestingContext } from './context/testing'

const FilterBar: RFC<HTMLElement, FilterBarProps> = (props, ref) => {
  const { testId } = useTestingContext()
  return (
    <ActionBar
      testId={`${testId}__filter-bar`}
      order={ORDER_CLASSNAMES.FILTER_BAR}>
      <FilterBarBase ref={ref} {...props} />
    </ActionBar>
  )
}

export type FilterBarProps = InferProps<typeof filterBarPropTypes> & E2ETestable

export default forwardRef(FilterBar)
