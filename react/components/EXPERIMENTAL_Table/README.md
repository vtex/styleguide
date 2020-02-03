#### A table displays any kind of structured data and offers controls to easily navigate, search and filter through it. Data may be from just numbers to complex entities that employ other components to represent itself, like images, tags, links, etc.

# Columns

The `columns` property is an `Array` used to define the table columns and how they should behave visually. Each column describes each item field should be handled by the `Table`.

```ts
type ReturnedData = {
  data: unknown | object
  rowHeight: number
  currentDensity: Density
  motion: ReturnType<typeof useTableMotion>
}

type Column = {
  id?: string
  title?: string | Element | Function
  width?: number | string
  cellRenderer?: (data: ReturnedData) => React.ReactNode
  sortable?: boolean
  extended?: boolean
  condensed?: string[]
}
```

##### id

- Defines the property name that the column represents.
- This property is required and must be a string.

##### title

- Controls the title which appears on the table Header.
- It can receive either a string or an element.

##### width

- Defines a fixed width for the specific column.
- Receives either a string or number.
- By default, the column's width is defined to fit the available space without breaking the content.

##### cellRenderer

- Customize the render method of a single column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ data, rowHeight, currentDensity, motion })
- data: the value of the current cell.
- rowHeight: current height of the row.
- currentDensity: current table density.
- motion: current row motion, that can be used by internal elements.
- The default is rendering the value as a string.

##### Sortable

- Indicates if the table can be sorted using this column as a reference.

##### Extended

- Indicates if a column is extended or not.
- It is generally used to express actions or general information about each row.

##### Condensed

- Indicates if a column is condensed or not.
- Condensed columns are a combination of two or more columns.
- It's important to notice that it must have it's ID to represent the join.
- It receives an array of string, which are the props that will compose the `data` object.

#### Live example

This live example features all columns props (unless `sortable`, which will be discussed in the `Sort` section).

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const ActionMenu = require('../ActionMenu/index.js').default
const OptionsDots = require('../icon/OptionsDots/index.js').default
const data = require('./sampleData.ts')

/** Columns definition, must be an array */
const columns = [
  {
    /** Prop that this column represents */
    id: 'id',
    /** Title that will appear on Header */
    title: 'ID',
    /** Fixed width */
    width: '3rem',
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    /** Cellrenderer using the default data, which is costPrice in this case */
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
  {
    id: 'profit',
    /** This is a custom title */
    title: <ProfitTitle />,
    /** Profit is a condensed column generated using retailPrice and costPrice props */
    condensed: ['retailPrice', 'costPrice'],
    cellRenderer: ({ data }) => {
      /** As you can see the data is the object of the two props */
      const { costPrice, retailPrice } = data
      const profit = parseFloat(retailPrice) - parseFloat(costPrice)
      return <Currency value={profit} />
    },
  },
  {
    id: 'actions',
    width: '3rem',
    cellRenderer: props => <Actions {...props} />,
    /** This column is extended, its data is the entire row */
    extended: true,
  },
]

function ProfitTitle() {
  return <>💸 Profit</>
}

const formatCurrency = value => parseFloat(value).toFixed(2)

function Currency({ value }) {
  return <span>$ {formatCurrency(value)}</span>
}

function Actions({ data }) {
  return (
    <ActionMenu
      buttonProps={{
        variation: 'tertiary',
        icon: <OptionsDots />,
      }}
      options={[
        {
          label: 'Action 1',
          onClick: () =>
            alert(
              `Executed action for ${data.name} of price ${data.retailPrice}`
            ),
        },
        {
          label: 'DANGEROUS Action',
          isDangerous: true,
          onClick: () =>
            alert(
              `Executed a DANGEROUS action for ${data.name} of price ${data.retailPrice}`
            ),
        },
      ]}
    />
  )
}

const items = data.products

function ColumnsExample() {
  /** The useTableMeasures hook will be discussed on the Measures section */
  const measures = useTableMeasures({ size: items.length })
  return <Table measures={measures} items={items} columns={columns} />
}
;<ColumnsExample />
```

# Table Props

This example, showcase the table using all of its simple props that are `loading`, `emptyState`, `onRowClick`, `columns`, `measures` and `items`

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Toggle = require('../Toggle/index.js').default
const Button = require('../Button/index.js').default
const Spinner = require('../Spinner/index.js').default
const items = require('./sampleData.ts').customers.slice(0, 5)

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'location',
    title: 'Location',
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        loading: !state.loading,
        customLoading: false,
        empty: false,
        customEmpty: false,
      }
    case 'custom-loading':
      return {
        loading: false,
        customLoading: !state.customLoading,
        empty: false,
        customEmpty: false,
      }
    case 'empty':
      return {
        loading: false,
        customLoading: false,
        empty: !state.empty,
        customEmpty: false,
      }
    case 'custom-empty':
      return {
        loading: false,
        customLoading: false,
        empty: false,
        customEmpty: !state.customEmpty,
      }
    default:
      return state
  }
}

function SimpleExample() {
  const measures = useTableMeasures({ size: items.length })
  const [
    { loading, customLoading, empty, customEmpty },
    dispatch,
  ] = React.useReducer(reducer, {
    loading: false,
    customLoading: false,
    empty: false,
    customEmpty: false,
  })

  const onRowClick = ({ rowData }) => {
    const { name, location } = rowData
    alert(`Your character is ${name}, from ${location}`)
  }

  const emptyState = {
    label: 'This is a default empty state for title',
  }

  const customEmptyState = {
    label: 'This is a default empty state for title',
    children: (
      <React.Fragment>
        <p>
          A longer explanation of what should be here, and why should I care
          about what should be here.
        </p>
        <div className="pt5">
          <Button variation="secondary" size="small">
            <span className="flex align-baseline">Suggested action</span>
          </Button>
        </div>
      </React.Fragment>
    ),
  }

  const tableLoading = customLoading
    ? {
        loading: {
          renderAs: () => {
            return <Spinner color="red" size={50} />
          },
        },
      }
    : { loading }

  return (
    <>
      <div className="mb5 flex">
        <Toggle
          label="Toggle loading"
          checked={loading}
          onChange={() => dispatch({ type: 'loading' })}
        />
        <Toggle
          label="Toggle CUSTOM loading"
          checked={customLoading}
          onChange={() => dispatch({ type: 'custom-loading' })}
        />
      </div>
      <div className="mb5 flex">
        <Toggle
          label="Toggle empty state"
          checked={empty}
          onChange={() => dispatch({ type: 'empty' })}
        />
        <Toggle
          label="Toggle CUSTOM empty state"
          checked={customEmpty}
          onChange={() => dispatch({ type: 'custom-empty' })}
        />
      </div>
      <Table
        measures={measures}
        columns={columns}
        items={items}
        onRowClick={onRowClick}
        {...tableLoading}
        empty={empty || customEmpty}
        emptyState={empty ? emptyState : customEmptyState}
      />
    </>
  )
}
;<SimpleExample />
```

# State handlers

## useTableMeasures

```ts
enum Density {
  Compact = 'compact',
  Regular = 'regular',
  Comfortable = 'comfortable',
}
```

### Inputs

| Property | Type    | Required | Default         | Description               |
| -------- | ------- | -------- | --------------- | ------------------------- |
| size     | number  | ✅       | 0               | Length of the table items |
| density  | Density | 🚫       | Density.Regular | Initial Density           |

### Outputs

| Property          | Type                       | Description               |
| ----------------- | -------------------------- | ------------------------- |
| currentDensity    | Density                    | The table current density |
| rowHeight         | number                     | The height of each row    |
| tableHeight       | number                     | Table's full height       |
| setCurrentDensity | (density: Density) => void | Sets the current density  |

### Usage

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
  },
  {
    id: 'location',
    title: 'Location',
  },
]

const customers = data.customers.slice(0, 5)

function MeasuresExample() {
  const measures = useTableMeasures({ size: customers.length })
  return <Table measures={measures} columns={columns} items={customers} />
}
;<MeasuresExample />
```

## useTableProportion

### Inputs

| Property | Type     | Required | Default | Description          |
| -------- | -------- | -------- | ------- | -------------------- |
| columns  | Column[] | ✅       | 🚫      | Columns of the table |
| ratio    | number[] | ✅       | 🚫      | Ratio of each column |

### Outputs

| Property     | Type     | Description                                   |
| ------------ | -------- | --------------------------------------------- |
| sizedColumns | Column[] | Columns of the table with the selected ratios |

### Usage

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableProportion = require('./hooks/useTableProportion.ts').default
const ButtonGroup = require('../ButtonGroup/index.js').default
const Button = require('../Button/index.js').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
  },
]

const items = data.customers.slice(0, 3)

const ratios = [
  {
    id: 1,
    title: '1 | 1 | 1',
    value: [1, 1, 1],
  },
  {
    id: 2,
    title: '0.1 | 0.5 | 1',
    value: [0.1, 0.5, 1],
  },
  {
    id: 3,
    title: '0.5 | 0.5 | 1',
    value: [0.5, 0.5, 1],
  },
]

function ProportionExample() {
  const [currentRatio, setCurrentRatio] = React.useState(ratios[0])
  const measures = useTableMeasures({
    size: items.length,
  })

  const { sizedColumns } = useTableProportion({
    columns,
    ratio: currentRatio.value,
  })

  return (
    <>
      <div className="mb5">
        <ButtonGroup
          buttons={ratios.map(ratio => (
            <Button
              size="small"
              isActiveOfGroup={ratio.id === currentRatio.id}
              onClick={() => setCurrentRatio(ratio)}>
              Ratio: {ratio.title}
            </Button>
          ))}
        />
      </div>
      <Table measures={measures} columns={sizedColumns} items={items} />
    </>
  )
}
;<ProportionExample />
```

## useTableSort

```ts
enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

type Sorted = {
  /** order of the sorting */
  order?: SortOrder
  /** reference prop */
  by?: string
}
```

### Outputs

| Property | Type                 | Description                             |
| -------- | -------------------- | --------------------------------------- |
| sorted   | Sorted               | Order and referecen prop of the sorting |
| clear    | () => void           | Clears sorting                          |
| sort     | (id: string) => void | Toggle sorting by some prop             |

### Usage

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableSort = require('./hooks/useTableSort.ts').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    id: 'qty',
    title: 'Qty',
    sortable: true,
  },
  {
    id: 'costPrice',
    title: 'Cost',
    sortable: true,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    sortable: true,
  },
]

const products = data.products.slice(0, 5)

const ascOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
const dscOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

function SortExample() {
  const sorting = useTableSort()
  const measures = useTableMeasures({
    size: products.length,
  })

  const items = React.useMemo(() => {
    const {
      sorted: { order, by },
    } = sorting
    if (!order) {
      return products
    }
    const ascending = order === 'ASC'
    const comparator = ascending ? ascOrdering(by) : dscOrdering(by)
    return products.sort(comparator)
  }, [sorting.sorted, data.products])

  return (
    <Table
      measures={measures}
      columns={columns}
      items={items}
      sorting={sorting}
    />
  )
}
;<SortExample />
```

## useTableVisibility

### Inputs

| Property      | Type     | Required | Default | Description                      |
| ------------- | -------- | -------- | ------- | -------------------------------- |
| columns       | Column[] | ✅       | 🚫      | Columns of the table             |
| hiddenColumns | string[] | 🚫       | []      | Columns that are initally hidden |

### Outputs

| Property       | Type                 | Description                      |
| -------------- | -------------------- | -------------------------------- |
| visibleColumns | Column[]             | Columns that are visible         |
| hiddenColumns  | string[]             | Columns that are hidden          |
| toggleColumn   | (id: string) => void | Toggle a column visibility by id |
| showAllColumns | () => void           | Make all columns visible         |
| hideAllColumns | () => void           | Make all columns hidden          |

### Usage

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
  },
  {
    id: 'location',
    title: 'location',
  },
]

const items = data.customers.slice(0, 5)

function VisibilityExample() {
  const measures = useTableMeasures({
    size: items.length,
  })
  const visibility = useTableVisibility({
    columns,
    hiddenColumns: ['id', 'location'],
  })

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  return (
    <>
      <Table
        measures={measures}
        columns={visibility.visibleColumns}
        items={items}>
        <Table.Toolbar>
          <Table.Toolbar.ButtonGroup>
            <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
          </Table.Toolbar.ButtonGroup>
        </Table.Toolbar>
      </Table>
    </>
  )
}
;<VisibilityExample />
```

# 📚 Migration Guide

This section is designed to `Table V1` users that desire to upgrade and enjoy the `V2` benefits. Will be discussed the key differences between the two. The reading of the V2 documentation is essential, though.

### Schema vs Columns

The V1 introduced the concept of the table schema, which was a JSON object of type:

```ts
type Schema = {
  properties: {
    [key: string]: {
      title: string
      width: number
      minWidth: number
      cellRenderer: ({
        cellData,
        rowData,
        updateCellMeasurements,
      }) => React.ReactNode
      headerRight: boolean
      sortable: boolean
      headerRenderer: ({ columnIndex, key, title }) => React.ReactNode
    }
  }
}
```

The V2 take on the same problem is the `columns` property, which is an array of columns of type:

```ts
type Column = {
  id?: string
  title?: string | Element | Function
  width?: number | string
  cellRenderer?: ({
    data: unknown | object
    rowHeight: number
    currentDensity: Density
    motion: ReturnType<typeof useTableMotion>
  }) => React.ReactNode
  sortable?: boolean
  extended?: boolean
  condensed?: string[]
}
```

We can conclude that:

- ➕ The `title` now supports strings or objects.
- ➕ The `width` that was a number, is now a string or a number.
- ➕ We have two new props: `extended` and `condensed`, to handle what rowData was supposed to deal with.
- ♻️ The `key` was converted to an `id` prop of the column object.
- ♻️ `sortable` is kept and did not even change its purpose or type.
- The `cellRenderer` props:
  - ➕ The cell can react to `rowHeight`, `currentDensity` and `motion`.
  - ♻️ `cellData` is now called `data`
  - 🚫 `rowData` is deprecated
  - 🚫 `updateCellMeasurements` is deprecated
- 🚫 The `minWidth` is deprecated.
- 🚫 `headerRight` is deprecated
- 🚫 `headerRenderer` is deprecated since its job is done by title.
