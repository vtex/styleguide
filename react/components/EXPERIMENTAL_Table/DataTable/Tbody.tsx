import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'

import {
  useBodyContext,
  useLoadingContext,
  useTestingContext,
  useMeasuresContext,
} from '../context'
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
  const { rowHeight } = useMeasuresContext()
  const { items, rowKey } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
      {(items as unknown[]).map((data, index) => {
        const props = {
          key: rowKey({ rowData: data }),
          data: data,
          motion,
          height: rowHeight,
        }

        return children ? (
          //TODO: Create types for renderProps
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
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
