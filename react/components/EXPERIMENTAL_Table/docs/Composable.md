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

#### List

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
          {({ props }) => (
            <Node rowProps={props} nodesKey="related" {...collapsed} />
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
