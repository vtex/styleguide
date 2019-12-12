import { useMemo } from 'react'
import { Column } from '../index'

export default function useTableProportion({ columns, ratio }: ProportionData) {
  const calculatedWidths = useMemo(() => calculateWidths(columns, ratio), [
    columns,
    ratio,
  ])

  const sizedColumns = useMemo(
    () => columns.map((col, i) => ({ ...col, width: calculatedWidths[i] })),
    [columns, ratio]
  )

  return {
    sizedColumns,
  }
}

function calculateWidths(columns: Array<Column>, ratio: Array<number>) {
  const slicedRatio = ratio.slice(0, columns.length)

  const sum = (acc: number, num: number) => acc + num
  const ratioSum = slicedRatio.reduce(sum, 0)
  const minPortion = 100 / ratioSum

  return slicedRatio.map(value => `${value * minPortion}%`)
}

type ProportionData = {
  columns: Array<Column>
  ratio: Array<number>
}
