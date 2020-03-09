import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'

import { useBodyContext } from '../context/body'
import { useDataContext } from '../context/data'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'
import { useLoadingContext } from '../context/loading'
import useTableMotion from '../hooks/useTableMotion'
import Row, { ROW_TRANSITIONS, ComposableRow } from './Row'
import { RFC, ComposableWithRef } from '../types'

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

const Tbody: RFC<HTMLTableSectionElement, Props> = (
  { children, ...rest },
  ref
) => {
  const { items } = useDataContext()
  const { rowHeight } = useMeasuresContext()
  const { rowKey } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
      {items.map((data, index) => {
        const props = {
          key: rowKey({ rowData: data }),
          data: data,
          motion,
          height: rowHeight,
        }

        return children ? (
          children({
            props,
            data,
            index,
          })
        ) : (
          <Row {...props} />
        )
      })}
    </tbody>
  ) : null
}

interface Composites {
  Row: ComposableRow
}

export type ComposableTbody = ComposableWithRef<
  HTMLTableSectionElement,
  Props,
  Composites
>

const FowardedTbody: ComposableTbody = forwardRef(Tbody)

FowardedTbody.Row = Row

export default FowardedTbody
