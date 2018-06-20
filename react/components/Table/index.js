import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Column,
  Table as VirtualTable,
  AutoSizer,
} from 'react-virtualized'

class Table extends PureComponent {
  render() {
    const { schema, items, indexColumn, indexColumnLabel } = this.props
    const properties = Object.keys(schema.properties)
    let newItems = items
    if (indexColumn) {
      newItems = items.map((item, index) => {
        return {
          ...item,
          _reactVirtualizedIndex: index,
        }
      })
    }
    return (
      <div className="vh-50">
        <AutoSizer>
          {({ width, height }) => (
            <VirtualTable
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={50}
              rowCount={newItems.length}
              rowGetter={({ index }) => newItems[index]}
              className="flex flex-column"
              headerClassName="b pv4"
              rowClassName={({ index }) =>
                `flex flex-row items-center pv4 ${index === -1 ? 'bt bb' : 'bb'} b--light-gray`
              }
            >
              {
                indexColumn
                  ? <Column
                    headerRenderer={() => <React.Fragment>Index</React.Fragment>}
                    dataKey="_reactVirtualizedIndex"
                    label={indexColumnLabel}
                    width={70}
                  />
                  : null
              }
              {
                properties.map((key, index) => {
                  const label = schema.properties[key].title
                  const cellWidth = schema.properties[key].width || 200
                  const headerRenderer = schema.properties[key].headerRenderer
                  const cellRenderer = schema.properties[key].cellRenderer
                  return (
                    <Column
                      key={index}
                      headerRenderer={headerRenderer || function ({ label }) {
                        return (
                          <div className="truncate ph4">
                            {label}
                          </div>
                        )
                      }}
                      cellRenderer={cellRenderer || function ({ cellData }) {
                        return (
                          <div className="truncate ph4">
                            {cellData}
                          </div>
                        )
                      }}
                      dataKey={key}
                      label={label}
                      width={cellWidth}
                    />
                  )
                })
              }
            </VirtualTable>
          )}
        </AutoSizer>
      </div>
    )
  }
}
Table.defaultProps = {
  indexColumnLabel: 'Index',
}
Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** Json Schema data model for the items */
  schema: PropTypes.object.isRequired,
  /** Should first column be row index */
  indexColumn: PropTypes.bool,
  /** Row index column label */
  indexColumnLabel: PropTypes.string,
}

export default Table
