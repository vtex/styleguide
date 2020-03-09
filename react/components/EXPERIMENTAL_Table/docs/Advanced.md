#### Unstable Render

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

const items = customers.slice(0, 8)

function UnstableExample() {
  const measures = useTableMeasures({ size: items.length })

  return (
    <Table
      measures={measures}
      columns={[
        {
          id: 'name',
          title: 'Name',
        },
        {
          id: 'location',
          title: 'Location',
        },
      ]}
      items={items}
      unstableRender>
      <Table.Sections>
        <Table.Sections.Head />
        <Table.Sections.Body />
      </Table.Sections>
    </Table>
  )
}

;<UnstableExample />
```

#### Rendering tree data

```js
import isEmpty from 'lodash/isEmpty'

import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { productTree } from './sampleData'
import CaretUp from '../../icon/CaretUp'
import CaretDown from '../../icon/CaretDown'
import ButtonPlain from '../../ButtonPlain'

function TreeExample() {
  const measures = useTableMeasures({ size: 7 })
  const collapsed = useCollapsableTree(productTree)
  return (
    <Table
      measures={measures}
      columns={[
        {
          id: 'name',
          title: 'Name',
        },
        {
          id: 'manufacturer',
          title: 'Manufacturer',
        },
      ]}
      items={productTree}
      unstableRender>
      <Table.Sections>
        <Table.Sections.Head />
        <Table.Sections.Body>
          {({ props }) => {
            return (
              <>
                <Node rowProps={props} nodesKey="related" {...collapsed} />
              </>
            )
          }}
        </Table.Sections.Body>
      </Table.Sections>
    </Table>
  )
}

function useCollapsableTree(
  items,
  comparator = item => candidate => item.id === candidate.id
) {
  const [collapsedItems, setCollapsedItems] = React.useState([])

  const isCollapsed = React.useCallback(
    item => collapsedItems.some(comparator(item)),
    [collapsedItems, comparator]
  )

  const toggleCollapsed = React.useCallback(
    item => {
      isCollapsed(item)
        ? setCollapsedItems(
            collapsedItems.filter(
              collapsedItem => !comparator(collapsedItem)(item)
            )
          )
        : setCollapsedItems([...collapsedItems, item])
    },
    [collapsedItems, comparator, isCollapsed]
  )

  return { collapsedItems, isCollapsed, toggleCollapsed }
}

function Node({ rowProps, nodesKey, isCollapsed, toggleCollapsed, depth = 0 }) {
  const Row = Table.Sections.Body.Row
  const { data } = rowProps

  const toggleChildren = React.useCallback(() => toggleCollapsed(data), [
    data,
    toggleCollapsed,
  ])

  console.log(data)

  const hasChildren = !!data[nodesKey]
  const collapsed = isCollapsed(data)

  return hasChildren ? (
    <>
      <Row {...rowProps}>
        {({ props, data, column, index }) => (
          <>
            <Row.Cell {...props}>
              {index === 0 && (
                <Row.Cell.Prefix depth={depth}>
                  <CollapseToggle
                    collapsed={collapsed}
                    onClick={toggleChildren}
                  />
                </Row.Cell.Prefix>
              )}
              {data[column.id]}
            </Row.Cell>
          </>
        )}
      </Row>
      {collapsed &&
        data[nodesKey].map(data => (
          <Node
            rowProps={{ ...rowProps, data }}
            key={data.id}
            depth={depth + 1}
            nodesKey={nodesKey}
            isCollapsed={isCollapsed}
            toggleCollapsed={toggleCollapsed}
          />
        ))}
    </>
  ) : (
    <Row {...rowProps}>
      {({ props, data, column, index }) => (
        <>
          <Row.Cell {...props}>
            {index === 0 && <Row.Cell.Prefix depth={depth} />}
            {data[column.id]}
          </Row.Cell>
        </>
      )}
    </Row>
  )
}

function CollapseToggle({ collapsed, onClick }) {
  const icon = collapsed ? <CaretUp /> : <CaretDown />
  return (
    <ButtonPlain size="regular" onClick={onClick}>
      {icon}
    </ButtonPlain>
  )
}

;<TreeExample />
```

#### Rendering Columns

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

const items = customers.slice(0, 8)

function UnstableExample() {
  const measures = useTableMeasures({ size: items.length })

  return (
    <Table measures={measures} columns={[{}]} items={items} unstableRender>
      <Table.Sections>
        <Table.Sections.Body>
          {({ props }) => (
            <Table.Sections.Body.Row {...props}>
              {({ props, data }) => (
                <>
                  <Table.Sections.Body.Row.Cell {...props}>
                    {data.name}
                  </Table.Sections.Body.Row.Cell>
                  <Table.Sections.Body.Row.Cell {...props}>
                    {data.location}
                  </Table.Sections.Body.Row.Cell>
                </>
              )}
            </Table.Sections.Body.Row>
          )}
        </Table.Sections.Body>
      </Table.Sections>
    </Table>
  )
}

;<UnstableExample />
```

#### List Example

```js
import Table from '../index'
import Icons from 'react-icons/fa'
import useTableMeasures from '../hooks/useTableMeasures'
import { payments } from './sampleData'
import ButtonWithIcon from '../../ButtonWithIcon'
import IconDelete from '../../icon/Delete'

function Icon({ name, height, style }) {
  const SelectedIcon = Icons[name]
  return <SelectedIcon style={style} className="c-muted-1" size={height - 5} />
}

function ListExample() {
  const [items, setItems] = React.useState(payments)
  const [displayItems, setDisplayItems] = React.useState(items)
  const [inputValue, setInputValue] = React.useState('')
  const measures = useTableMeasures({ size: 5 })

  React.useEffect(() => {
    setInputValue('')
    setDisplayItems(items)
  }, [items])

  const inputSearch = {
    value: inputValue,
    placeholder: 'Search names...',
    onChange: e => setInputValue(e.currentTarget.value),
    onClear: () => {
      setInputValue('')
      setDisplayItems(items)
    },
    onSubmit: e => {
      e.preventDefault()
      const filterFn = item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      setDisplayItems(items => items.filter(filterFn))
    },
    standalone: true,
  }
  return (
    <div className="w-70 center">
      <Table
        measures={measures}
        columns={[
          {
            id: 'icon',
            width: 64,
            cellRenderer: ({ data, rowHeight, motion }) => (
              <Icon name={data} style={motion} height={rowHeight} />
            ),
          },
          {
            id: 'name',
          },
          {
            id: 'id',
            width: 32,
            cellRenderer: ({ data: id }) => (
              <ButtonWithIcon
                onClick={() =>
                  setItems(items => items.filter(item => id !== item.id))
                }
                variation="tertiary"
                icon={<IconDelete />}
              />
            ),
          },
        ]}
        items={displayItems}
        unstableRender>
        <Table.Toolbar>
          <Table.Toolbar.InputSearch {...inputSearch} />
        </Table.Toolbar>
        <div className="bb b--muted-4" />
        <Table.Sections>
          <Table.Sections.Body />
        </Table.Sections>
      </Table>
    </div>
  )
}

;<ListExample />
```

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
            <Table.Sections ref={provided.innerRef}>
              <Table.Sections.Body>
                {({ props, data, index }) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}>
                    {(provided, snapshot) => (
                      <Table.Sections.Body.Row
                        ref={provided.innerRef}
                        style={{
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}
                      />
                    )}
                  </Draggable>
                )}
              </Table.Sections.Body>
              {provided.placeholder}
            </Table.Sections>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  )
}

;<RenderAgnostic />
```
