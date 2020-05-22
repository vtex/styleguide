import React, { forwardRef, Ref } from 'react'

import { useBodyContext } from '../context/body'
import { useDataContext } from '../context/data'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'
import { useLoadingContext } from '../context/loading'
import useTableMotion from '../hooks/useTableMotion'
import Row, { ROW_TRANSITIONS, ComposableRow } from './Row'
import { ComposableWithRef, RenderProps, NativeTableSection } from '../types'

interface BodyRenderProps {
  props: {
    data: object
    motion: ReturnType<typeof useTableMotion>
    height: number
  }
  key: string
  index: number
}

type Props = RenderProps<NativeTableSection, BodyRenderProps>

function Tbody(
  { children, ...rest }: Props,
  ref: Ref<HTMLTableSectionElement>
) {
  const { items } = useDataContext()
  const { rowHeight } = useMeasuresContext()
  const { rowKey } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
      {items.map((data, index) => {
        const key = rowKey({ rowData: data })
        const props = {
          data,
          motion,
          height: rowHeight,
        }

        return children ? (
          children({
            props,
            key,
            index,
          })
        ) : (
          <Row key={key} {...props} />
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
