import React, { FC, memo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { constants } from '../util'

const propTypes = {
  /** Controls the table loading state */
  loading: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const SimpleTable: FC<Props> = props => {
  const { columns, items } = useTableContext()

  const renderHeadingRow = (heading: string, headingIndex: number) => (
    <Cell
      key={`col-${headingIndex}`}
      content={columns[heading].title}
      isHeading
    />
  )

  const renderRow = (row: Object, rowIndex: number) => (
    <tr
      style={{ height: constants.ROW_HEIGHT }}
      className="w-100 h-100 ph4 truncate"
      key={`row-${rowIndex}`}>
      {Object.keys(row).map((cel: string, cellIndex: number) => (
        <Cell key={`${rowIndex}-${cellIndex}`} content={row[cel]} />
      ))}
    </tr>
  )

  return (
    <div className="mw-100">
      <div className="overflow-x-auto">
        <table className="w-100" style={{ borderSpacing: 0 }}>
          <thead>
            {
              <tr
                key="heading"
                className="w-100 h-100 c-muted-2 f6 truncate ph4 overflow-x-hidden"
                style={{
                  height: constants.TABLE_HEADER_HEIGHT,
                }}>
                {Object.keys(columns).map(renderHeadingRow)}
              </tr>
            }
          </thead>
          <tbody>{items.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  )
}

SimpleTable.defaultProps = {
  loading: false,
}

SimpleTable.propTypes = propTypes

export default memo(SimpleTable)
