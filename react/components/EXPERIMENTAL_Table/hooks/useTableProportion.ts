import { useMemo } from 'react'

import { Column } from '../types'

export default function useTableProportion({ columns, ratio }: ProportionData) {
  const calculatedWidths = useMemo(() => calculateWidths(columns, ratio), [
    columns,
    ratio,
  ])

  const sizedColumns = useMemo(
    () => columns.map((col, i) => ({ ...col, width: calculatedWidths[i] })),
    [calculatedWidths, columns]
  )

  return {
    sizedColumns,
  }
}

function calculateWidths(columns: Array<Column>, ratio: Array<number>) {
  const slicedRatio = ratio.slice(0, columns.length)
  const sum = (acc: number, num: number) => acc + num
  const ratioSum = slicedRatio.reduce(sum, 0)
  const fullPortion = 100
  const minPortion = fullPortion / ratioSum
  return slicedRatio.map(value => `${value * minPortion}%`)
}

type ProportionData = {
  columns: Array<Column>
  ratio: Array<number>
}
