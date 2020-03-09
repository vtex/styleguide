#### Checkboxes

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useCheckboxTree from '../../EXPERIMENTAL_useCheckboxTree'
import { customers } from './sampleData'
import Checkbox from '../../Checkbox'

const items = customers.slice(0, 5)

function CheckboxesExample() {
  const measures = useTableMeasures({ size: items.length })
  const [withCheckboxes, isRowActive] = useColumnsWithCheckboxes({
    columns: [
      {
        id: 'name',
        title: 'Name',
      },
      {
        id: 'location',
        title: 'Location',
      },
    ],
    items,
  })
  return (
    <Table
      isRowActive={isRowActive}
      measures={measures}
      columns={withCheckboxes}
      items={items}
    />
  )
}

function useColumnsWithCheckboxes({ columns, items }) {
  const checkboxes = useCheckboxTree({ items })
  const mappedCheckboxes = checkboxes.itemTree.children.map(item => {
    const id = `${item.id}`
    return (
      <Checkbox
        key={id}
        id={id}
        checked={checkboxes.isChecked(item)}
        partial={checkboxes.isPartiallyChecked(item)}
        disabled={checkboxes.isDisabled(item)}
        onChange={() => checkboxes.toggle(item)}
      />
    )
  })

  const withCheckboxes = [
    {
      id: 'checkbox',
      title: (
        <div className="bg-base">
          <Checkbox
            id={`${checkboxes.itemTree.id}`}
            checked={checkboxes.allChecked}
            partial={checkboxes.someChecked}
            onChange={checkboxes.toggleAll}
          />
        </div>
      ),
      width: 30,
      extended: true,
      cellRenderer: ({ data }) => {
        return <div>{mappedCheckboxes[data.id - 1]}</div>
      },
    },
    ...columns,
  ]

  return [withCheckboxes, data => checkboxes.isChecked(data)]
}

;<CheckboxesExample />
```

#### Render Agnostic

```js
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

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
  const measures = useTableMeasures({ size: items.length })
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
    <Table measures={measures} columns={columns} items={items} unstableRender>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Table.Data ref={provided.innerRef}>
              <Table.Data.Body>
                {({ props, data, index }) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}>
                    {(provided, snapshot) => (
                      <Table.Data.Body.Row
                        ref={provided.innerRef}
                        style={{
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}>
                        {({ props, data }) => (
                          <Table.Data.Body.Row.Cell {...props}>
                            {data}
                          </Table.Data.Body.Row.Cell>
                        )}
                      </Table.Data.Body.Row>
                    )}
                  </Draggable>
                )}
              </Table.Data.Body>
              {provided.placeholder}
            </Table.Data>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  )
}

;<RenderAgnostic />
```
