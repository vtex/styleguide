import React, {
  forwardRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react'

import {
  useBodyContext,
  useLoadingContext,
  useTestingContext,
  useMeasuresContext,
} from '../context'
import useTableMotion from '../hooks/useTableMotion'
import Row, { ROW_TRANSITIONS, ComposableRow } from './Row'
import { RFC, ComposableWithRef } from '../types'

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer?: (props: any) => React.ReactNode
}

const Tbody: RFC<HTMLTableSectionElement, Props> = (
  { renderer, children, ...rest },
  ref
) => {
  const { rowHeight } = useMeasuresContext()
  const { items, rowKey } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
      {items.map((rowData, rowIndex: number) => {
        const props = {
          key: rowKey({ rowData }),
          data: rowData,
          motion,
          height: rowHeight,
        }

        //TODO: Create types for renderProps
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        return children({
          props,
          data: rowData,
          index: rowIndex,
        })
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
