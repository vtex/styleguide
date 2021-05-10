import React, { forwardRef, Ref } from 'react'

import { useBodyContext } from '../context/body'
import { useDataContext } from '../context/data'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'
import useTableMotion from '../hooks/useTableMotion'
import Row, { ROW_TRANSITIONS, ComposableRow } from './Row'
import { ComposableWithRef, RenderProps, NativeTableSection } from '../types'
import LoadedView from './LoadedView'

interface BodyRenderProps {
  props: {
    data: unknown
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
  const { testId } = useTestingContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return (
    <LoadedView>
      <tbody ref={ref} {...rest} data-testid={`${testId}__body`}>
        {items?.map((data, index) => {
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
    </LoadedView>
  )
}

interface Composites {
  Row: ComposableRow
}

export type ComposableTbody = ComposableWithRef<
  HTMLTableSectionElement,
  Props,
  Composites
>

const FowardedTbody: ComposableTbody = React.memo(forwardRef(Tbody))

FowardedTbody.Row = Row

export default FowardedTbody
