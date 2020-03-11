⚠️The table combined with its hooks is already versatile enough to handle most tabular data display problems. But sometimes we are creating a new component that shares/extends API and/or styles of the Table. This advanced section explains how the table works internally so that you can compose your own components if needed.

Table Sections (`Head`, `Body`, `Row`, and `Cell`) can be controlled by passing the `composableSections` property, which is false by default. This will expose disuse the default rendering and enable de composable one.

##### Default Render

This example shows the exact same table of all the examples above. The `Body` and `Head` has its own default renders, which will be explained further.

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

const items = customers.slice(0, 5)

function ComposableExample() {
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
      composableSections>
      <Table.Sections>
        <Table.Sections.Head />
        <Table.Sections.Body />
      </Table.Sections>
    </Table>
  )
}

;<ComposableExample />
```

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableSort from '../hooks/useTableSort'
import { customers } from './sampleData'

const initItems = customers.slice(0, 5)

const ascOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
const dscOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

function CreateExample() {
  const measures = useTableMeasures({ size: initItems.length })
  const sorting = useTableSort()

  const items = React.useMemo(() => {
    const {
      sorted: { order, by },
    } = sorting
    if (!order) {
      return initItems
    }
    const ascending = order === 'ASC'
    const comparator = ascending ? ascOrdering(by) : dscOrdering(by)
    return initItems.sort(comparator)
  }, [sorting.sorted, initItems])

  return (
    <Table
      sorting={sorting}
      measures={measures}
      columns={[
        {
          id: 'name',
          title: 'Name',
          sortable: true,
        },
        {
          id: 'location',
          title: 'Location',
          sortable: true,
        },
      ]}
      items={items}
      composableSections>
      <Table.Sections>
        <Table.Sections.Head>
          {({ props, column, key, suffix }) => (
            <Table.Sections.Head.Cell key={key} {...props}>
              {column.title}
              {suffix}
            </Table.Sections.Head.Cell>
          )}
        </Table.Sections.Head>
        <Table.Sections.Body />
      </Table.Sections>
    </Table>
  )
}

;<CreateExample />
```

#### Sections Anatomy

TODO

##### Head

TODO

##### Body

TODO

```ts
const { Body } = Table.Sections

Props

return <Body>
  <Row {...props}>
</Body>
```

##### Row

##### Cell

The cell is a component that represents a cell API:

```ts
interface CellProps {
  // width of the cell
  width?: number | string | React.
  // custom class names
  className?: string
  // function trigged when you click it
  onClick?: () => void
  // if is a heading cell (uses the th tag)
  header?: boolean
  // if you are currently sorting (used by Head only)
  sortable?: boolean
  // if you are currently sorting (used by Head only)
  sorting?: boolean
  // if you are currently sorting (used by Head only)
  sticky?: boolean
}
```

#### List

This example shows how to create a list, by no rendering the table Head.

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
  const measures = useTableMeasures({ size: 5, headless: true })

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

  const columns = [
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
  ]

  return (
    <div className="w-70 center">
      <Table
        measures={measures}
        columns={columns}
        items={displayItems}
        composableSections>
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

#### Tree data

The example bellow shows how to render a tree data by extending the `Row` to create a `Node`, which renders this children (related) recursivelly.

```js
import isEmpty from 'lodash/isEmpty'

import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { productTree } from './sampleData'
import CaretUp from '../../icon/CaretUp'
import CaretDown from '../../icon/CaretDown'
import ButtonPlain from '../../ButtonPlain'

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
      composableSections>
      <Table.Sections>
        <Table.Sections.Head />
        <Table.Sections.Body>
          {({ props, key }) => (
            <Node
              key={key}
              rowProps={props}
              nodesKey="related"
              {...collapsed}
            />
          )}
        </Table.Sections.Body>
      </Table.Sections>
    </Table>
  )
}

function Node({ rowProps, nodesKey, isCollapsed, toggleCollapsed, depth = 0 }) {
  const Row = Table.Sections.Body.Row
  const { data } = rowProps

  const toggleChildren = React.useCallback(() => toggleCollapsed(data), [
    data,
    toggleCollapsed,
  ])

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
