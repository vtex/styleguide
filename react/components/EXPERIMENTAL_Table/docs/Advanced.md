#### Render Agnostic

```js
const useMeasures = require('./hooks/useTableMeasures.tsx').default
const Row = require('./DataTable/Row.tsx').default
const customers = require('./sampleData.ts').customers
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const columns = [
  {
    id: 'name',
    title: 'Name',
    width: 300,
  },
  {
    id: 'location',
    title: 'Location',
    width: 300,
  },
]

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
})

function RenderAgnostic() {
  const [items, setItems] = React.useState(customers)
  const measures = useMeasures({ size: items.length })
  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
    density: measures,
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const draftItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(draftItems)
  }

  return (
    <Table
      measures={measures}
      columns={columns}
      items={items}
      __unsafe__giveMeMyRender>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Table.DataTable ref={provided.innerRef}>
              <Table.Head columns={columns} />
              <Table.Body
                columns={columns}
                items={items}
                rowKey={({ id }) => `${id}`}
                renderer={({ idx, rowData, height, ...rest }) => (
                  <Draggable
                    key={rowData.id}
                    draggableId={rowData.id.toString()}
                    index={idx}>
                    {(provided, snapshot) => (
                      <Row
                        ref={provided.innerRef}
                        height={height}
                        style={{
                          display: 'table',
                          height: height,
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...rest}
                      />
                    )}
                  </Draggable>
                )}
              />
              {provided.placeholder}
            </Table.DataTable>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  )
}

;<RenderAgnostic />
```
