import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Table as VirtualTable, AutoSizer } from 'react-virtualized'

class Table extends PureComponent {
  render() {
    const { schema, items, indexColumn } = this.props
    return (
      <div className="vh-50">
        <AutoSizer>
          {({ width, height }) => (
            <VirtualTable
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={50}
              rowCount={items.length}
              rowGetter={({ index }) => items[index]}
              className="flex flex-column"
              headerClassName="flex flex-row items-center b pv4 bt bb b--light-silver"
              rowClassName="flex flex-row items-center pv4 bb b--light-silver"
            >
              {
                indexColumn
                  ? <Column
                    className=""
                    headerRenderer={() => {
                      return (
                        <React.Fragment>
                          <div className="">
                            Index
                          </div>
                        </React.Fragment>
                      )
                    }}
                    dataKey="index"
                    label="Index"
                    width={70}
                  />
                  : null
              }
              {
                Object.keys(schema.properties).map((key, index) => {
                  const label = schema.properties[key].title
                  const width = schema.properties[key].width || 200
                  const headerRenderer = schema.properties[key].headerRenderer
                  const cellRenderer = schema.properties[key].cellRenderer
                  return (
                    <Column
                      key={index}
                      className=""
                      headerRenderer={headerRenderer || function ({ label }) {
                        return (
                          <div className="">
                            {label}
                          </div>
                        )
                      }}
                      cellRenderer={cellRenderer || function ({ cellData }) {
                        return (
                          <div className="truncate">
                            {cellData}
                          </div>
                        )
                      }}
                      dataKey={key}
                      label={label}
                      width={width}
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

Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** Json Schema data model for the items */
  schema: PropTypes.object.isRequired,
  /** Should first column be row index */
  indexColumn: PropTypes.bool,
}

export default Table
