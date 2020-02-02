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

````js
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
# Simple

Empty states can also be customized, the passed children will be rendered inside an EmptyState component.

⚠️ Customize the empty state using just the `emptyState` prop, so the other table features will behave correctly (e.g. the topbar, pagination, and totalizers).

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

function SipleExample() {
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
    label: 'This is an default empty state title',
  }

  const customEmptyState = {
    label: 'This is an default empty state title',
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
;<SipleExample />
````

# State handlers

## Measures

[TODO] This is the most basic handler. As the name suggests, it controlls the measures of the table.

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

# Features

<div className="center mw7 pv6">
  ![](./table.png)
</div>

# Clickable rows

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default

const columns = [
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

## Proportion

[TODO] - TEXT

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
<<<<<<< HEAD
    id: 'country',
    title: 'Country',
  },
]

const items = [
  {
    id: 1,
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    id: 2,
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 3,
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    id: 4,
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
]

function ClickExample() {
=======
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
>>>>>>> Added examples and removed unused proptypes
  const measures = useTableMeasures({
    size: items.length,
  })

<<<<<<< HEAD
  const onRowClick = ({ rowData }) => {
    const { name, country } = rowData
    alert(`Your character is ${name}, from ${country}`)
  }

  return (
    <Table
      measures={measures}
      columns={columns}
      items={items}
      onRowClick={onRowClick}
    />
  )
}
;<ClickExample />
```

# Sortable

=======
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

````

## Sort

[TODO] - TEXT

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
````

### Outputs

| Property | Type                 | Description                             |
| -------- | -------------------- | --------------------------------------- |
| sorted   | Sorted               | Order and referecen prop of the sorting |
| clear    | () => void           | Clears sorting                          |
| sort     | (id: string) => void | Toggle sorting by some prop             |

### Usage

> > > > > > > Added examples and removed unused proptypes

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

<<<<<<< HEAD
const products = data.products

function SortExample() {
  const sorting = useTableSort()

=======
const products = data.products.slice(0, 5)

const ascOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
const dscOrdering = prop => (a, b) =>
  a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

function SortExample() {
  const sorting = useTableSort()
>>>>>>> Added examples and removed unused proptypes
  const measures = useTableMeasures({
    size: products.length,
  })

<<<<<<< HEAD
  const ascOrdering = prop => (a, b) =>
    a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
  const dscOrdering = prop => (a, b) =>
    a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

=======
>>>>>>> Added examples and removed unused proptypes
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

<<<<<<< HEAD

# Proportion

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableProportion = require('./hooks/useTableProportion.ts').default

const columns = [
  {
    id: 'name',
    title: 'Name',
    cellRenderer,
  },
  {
    id: 'country',
    title: 'Country',
  },
]

const items = [
  {
    id: 1,
    name:
      '⚠️ This is just a text that is very very very large and should be fully visible when it is confortable and truncated otherwise. If you are seeing this part, it means that you are ona  comfortable density 🤓!',
    country: '🇨🇺Cuba',
  },
  {
    id: 2,
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 3,
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    id: 4,
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
]

function cellRenderer({ data, currentDensity }) {
  const confortable = currentDensity === 'comfortable'

  return confortable ? (
    <div className="dib">
      <div className="db ws-normal tj">{data}</div>
    </div>
  ) : (
    <div className="dib mw6 truncate">{data}</div>
  )
}

function ProportionExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const { sizedColumns } = useTableProportion({
    columns,
    ratio: [3, 1],
  })

  const densityProps = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
    density: measures,
  }

  return (
    <Table measures={measures} columns={sizedColumns} items={items}>
      <Table.Toolbar>
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Density {...densityProps} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<ProportionExample />
```

# Loading

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Toggle = require('../Toggle/index.js').default

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

const items = [
  {
    id: 1,
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    id: 2,
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 3,
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    id: 4,
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
]

function LoadingExample() {
  const [loading, setLoading] = React.useState(false)
  const measures = useTableMeasures({ size: items.length })

  return (
    <div>
      <Toggle
        label="Toggle table loading"
        checked={loading}
        onChange={() => setLoading(!loading)}
      />
      <Table
        measures={measures}
        columns={columns}
        items={items}
        loading={loading}
      />
    </div>
  )
}
;<LoadingExample />
```

### Custom Loading

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Toggle = require('../Toggle/index.js').default
const Spinner = require('../Spinner/index.js').default

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

const items = [
  {
    id: 1,
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    id: 2,
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 3,
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    id: 4,
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
]

function CustomLoadingExample() {
  const [isLoading, setIsLoading] = React.useState(false)
  const measures = useTableMeasures({ size: items.length })

  const loading = isLoading && {
    loading: {
      renderAs: () => {
        return <Spinner color="red" size={50} />
      },
    },
  }

  return (
    <div>
      <Toggle
        label="Toggle table loading"
        checked={isLoading}
        onChange={() => setIsLoading(!isLoading)}
      />
      <Table measures={measures} columns={columns} items={items} {...loading} />
    </div>
  )
}
;<CustomLoadingExample />
```

# Empty state

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

function EmptyExample() {
  const measures = useTableMeasures({})

  const emptyState = {
    label: 'This is an default empty state title',
  }

  return (
    <Table
      columns={columns}
      items={[]}
      measures={measures}
      empty={true}
      emptyState={emptyState}
    />
  )
}
;<EmptyExample />
```

Empty states can also be customized, the passed children will be rendered inside an EmptyState component.

⚠️ Customize the empty state using just the `emptyState` prop, so the other table features will behave correctly (e.g. the topbar, pagination, and totalizers).

````js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default
const Button = require('../Button/index.js').default

const columns = [
=======
## Visibility

[TODO] - TEXT

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
>>>>>>> Added examples and removed unused proptypes
  {
    id: 'name',
    title: 'Name',
  },
  {
<<<<<<< HEAD
    id: 'country',
    title: 'Country',
  },
]

function CustomEmptyStateExample() {
  const measures = useTableMeasures({})
  const emptyState = {
    label: 'This is an default empty state title',
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

  return (
    <Table
      empty={true}
      columns={columns}
      measures={measures}
      items={[]}
      emptyState={emptyState}
    />
  )
}
;<CustomEmptyStateExample />
````

# Pagination

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default

// Define the columns
const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

// Define the items
const items = [
  {
    id: 1,
    name: "T'Chala",
    country: '🇰🇪Wakanda',
  },
  {
    id: 2,
    name: 'Peter Parker',
    country: '🇺🇸USA',
  },
  {
    id: 3,
    name: 'Shang-Chi',
    country: '🇨🇳China',
  },
  {
    id: 4,
    name: 'Natasha Romanoff',
    country: '🇷🇺Russia',
  },
  {
    id: 5,
    name: 'Stephen Strange',
    country: '🇺🇸USA',
  },
  {
    id: 6,
    name: 'Steve Rogers',
    country: '🇺🇸USA',
  },
  {
    id: 7,
    name: 'Abdul Alhazred',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 8,
    name: 'Carol Danvers',
    country: '🇺🇸USA',
  },
  {
    id: 9,
    name: 'Scott Lang',
    country: '🇺🇸USA',
  },
  {
    id: 10,
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    id: 11,
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    id: 12,
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    id: 13,
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
  {
    id: 14,
    name: 'Marc Spector',
    country: '🇺🇸USA',
  },
  {
    id: 15,
    name: 'John Walker',
    country: '🇺🇸USA',
  },
  {
    id: 16,
    name: 'Dane Whitman',
    country: '🇺🇸USA',
  },
]

function usePagination(initialSize) {
  const [state, setState] = React.useState({
    tableSize: initialSize,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: initialSize,
    slicedItems: [...items].slice(0, initialSize),
  })

  const onNextClick = () => {
    const newPage = state.currentPage + 1
    const itemFrom = state.currentItemTo + 1
    const itemTo = state.tableSize * newPage
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }

  const onPrevClick = () => {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - state.tableSize
    const itemTo = state.currentItemFrom - 1
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }

  const onRowsChange = (e, value) => {
    const rowValue = parseInt(value)
    setState(state => ({
      ...state,
      tableSize: rowValue,
      currentItemTo: rowValue,
      slicedItems: [...items].slice(state.currentItemFrom - 1, rowValue),
    }))
  }

  return {
    onNextClick,
    onPrevClick,
    onRowsChange,
    slicedItems: state.slicedItems,
    currentItemFrom: state.currentItemFrom,
    currentItemTo: state.currentItemTo,
  }
}

function PaginationExample() {
  const { slicedItems, ...paginationProps } = usePagination(5)

  const measures = useTableMeasures({ size: slicedItems.lenght })

  const pagination = {
    ...paginationProps,
    textOf: 'of',
    rowsOptions: [5, 10, 15],
    textShowRows: 'Show rows',
    totalItems: items.length,
  }

  return (
    <Table measures={measures} items={slicedItems} columns={columns}>
      <Table.Pagination {...pagination} />
    </Table>
  )
}
;<PaginationExample />
```

# Totalizer

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const ArrowUp = require('../icon/ArrowUp/index.js').default
const ArrowDown = require('../icon/ArrowDown/index.js').default

const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
]

const formatCurrency = value => parseFloat(value).toFixed(2)

function Currency({ value }) {
  return <span>$ {formatCurrency(value)}</span>
}

const items = data.products

function TotalizerExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const totalizer = React.useMemo(() => {
    const sum = items.reduce(
      (acc, item) => {
        const { stock, cost, retail } = acc

        return {
          stock: stock + item.qty,
          cost: cost + item.qty * item.costPrice,
          retail: retail + item.qty * item.retailPrice,
        }
      },
      {
        stock: 0,
        cost: 0,
        retail: 0,
      }
    )
    return {
      items: [
        {
          label: 'Stock',
          value: sum.stock,
        },

        {
          label: 'Total cost',
          value: `$ ${formatCurrency(sum.cost)}`,
          iconBackgroundColor: '#fda4a4',
          icon: <ArrowDown color="#dd1616" size={14} />,
        },
        {
          label: 'Total retail',
          value: `$ ${formatCurrency(sum.retail)}`,
          iconBackgroundColor: '#eafce3',
          icon: <ArrowUp color="#79B03A" size={14} />,
        },
        {
          label: 'Expected Profit',
          value: `$ ${formatCurrency(sum.retail - sum.cost)}`,
        },
      ],
    }
  }, [items])

  return (
    <Table measures={measures} columns={columns} items={items}>
      <Table.Totalizer {...totalizer} />
    </Table>
  )
}

;<TotalizerExample />
```

# Bulk Actions

### Actions Example

=======
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

````

# Features

[TODO] - New image

<div className="center mw7 pv6">
  ![](./table.png)
</div>

## Toolbar

[TODO] - TEXT
>>>>>>> Added examples and removed unused proptypes

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: currencyRenderer,
  },
  {
    id: 'wholesalePrice',
    title: 'Wholesale',
    cellRenderer: currencyRenderer,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: currencyRenderer,
  },
]

function ActionsExample() {
  const { items, applyDiscount, increaseQty, decreaseQty } = useProducts()

  const primaryAction = {
    label: 'Apply 10% Discount',
    onClick: () => applyDiscount(checkboxes.checkedItems, 0.1),
  }

  const secondaryActions = {
    label: 'Quantity',
    actions: [
      {
        label: 'Increase 10',
        onClick: checked => increaseQty(checked, 10),
      },
      {
        label: 'Decrease 10',
        onClick: checked => decreaseQty(checked, 10),
      },
    ],
    onActionClick: action => action.onClick(checkboxes.checkedItems),
  }

  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
  })

  return (
    <Table
      measures={measures}
      checkboxes={checkboxes}
      columns={columns}
      items={items}>
      <Table.Bulk active={checkboxes.someChecked}>
        <Table.Bulk.Actions>
          <Table.Bulk.Actions.Primary {...primaryAction} />
          <Table.Bulk.Actions.Secondary {...secondaryActions} />
        </Table.Bulk.Actions>
        <Table.Bulk.Tail>
          <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
        </Table.Bulk.Tail>
      </Table.Bulk>
    </Table>
  )
}

function currencyRenderer({ data }) {
  return <span>$ {parseFloat(data).toFixed(2)}</span>
}

function useProducts() {
  const [items, setItems] = React.useState(data.products)

  const bulkUpdate = group => positive => {
    const groupIds = group.map(item => item.id)
    setItems(oldItems =>
      oldItems.map(item => (groupIds.includes(item.id) ? positive(item) : item))
    )
  }

  const discountCurry = amt => value => value - value * amt

  const applyDiscount = React.useCallback(
    (group, amt) => {
      const calcDiscount = discountCurry(amt)
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        retailPrice: calcDiscount(item.retailPrice),
        wholesalePrice: calcDiscount(item.wholesalePrice),
      }))
    },
    [items]
  )

  const increaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty + amt,
      }))
    },
    [items]
  )

  const decreaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty - amt,
      }))
    },
    [items]
  )

  return { items, applyDiscount, increaseQty, decreaseQty }
}

;<ActionsExample />
````

### With Toggle Action

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
]

const items = data.products

function ToggleActionExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
  })

  return (
    <Table
      measures={measures}
      checkboxes={checkboxes}
      columns={columns}
      items={items}>
      <Table.Bulk active={checkboxes.someChecked}>
        <Table.Bulk.Tail>
          <Table.Bulk.Tail.Toggle
            button={{
              text: `Select all ${items.length}`,
              onClick: checkboxes.checkAll,
            }}
            active={checkboxes.allChecked}>
            Selected rows: {items.length}
          </Table.Bulk.Tail.Toggle>
          <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
        </Table.Bulk.Tail>
      </Table.Bulk>
    </Table>
  )
}
;<ToggleActionExample />
```

### With Info

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
]

const items = data.products

function BulkInfoExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
  })

  return (
    <Table
      measures={measures}
      checkboxes={checkboxes}
      columns={columns}
      items={items}>
      <Table.Bulk active={checkboxes.someChecked}>
        <Table.Bulk.Tail>
          <Table.Bulk.Tail.Info>
            Selected Rows Count: {checkboxes.checkedItems.length}
          </Table.Bulk.Tail.Info>
          <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
        </Table.Bulk.Tail>
      </Table.Bulk>
    </Table>
  )
}
;<BulkInfoExample />
```

### Usage with modal, to handle dangerous actions

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const ModalDialog = require('../ModalDialog/index.js').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
]

const items = data.products

function useModal() {
  const [active, setActive] = React.useState(false)
  const toggle = React.useCallback(() => setActive(old => !old), [active])
  return { active, toggle }
}

function BulkModalExample() {
  const modal = useModal()

  const measures = useTableMeasures({
    size: items.length,
  })

  const isDisabled = item => {
    return item.qty < 1
  }

  const checkboxes = useCheckboxTree({
    items,
    isDisabled,
  })

  const onConfirm = () => {
    modal.toggle()
    checkboxes.checkAll()
  }

  return (
    <>
      <Table
        measures={measures}
        checkboxes={checkboxes}
        columns={columns}
        items={items}>
        <Table.Bulk active={checkboxes.someChecked}>
          <Table.Bulk.Tail>
            {!checkboxes.allChecked && (
              <Table.Bulk.Tail.Info>
                All rows selected: {checkboxes.checkedItems.length}
              </Table.Bulk.Tail.Info>
            )}
            <Table.Bulk.Tail.Toggle
              button={{
                text: `Select all ${items.length}`,
                onClick: modal.toggle,
              }}
              active={checkboxes.allChecked}>
              Selected rows: {items.length}
            </Table.Bulk.Tail.Toggle>
            {checkboxes.allChecked && (
              <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
            )}
          </Table.Bulk.Tail>
        </Table.Bulk>
      </Table>

      <ModalDialog
        centered
        confirmation={{
          onClick: onConfirm,
          label: 'Ok',
        }}
        cancelation={{
          onClick: modal.toggle,
          label: 'Cancel',
        }}
        isOpen={modal.active}
        onClose={modal.toggle}>
        <h1>Are you sure !?</h1>
        <p>
          Since you do not designate any filters, the following action will
          drain a lot of CPU power to be completed because the current items
          collection is too large. Your app may be inactive for a little while.
          Click OK to proceed!
        </p>
      </ModalDialog>
    </>
  )
}
;<BulkModalExample />
```

### Full Example

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const ModalDialog = require('../ModalDialog/index.js').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: currencyRenderer,
  },
  {
    id: 'wholesalePrice',
    title: 'Wholesale',
    cellRenderer: currencyRenderer,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: currencyRenderer,
  },
]

function BulkFullExample() {
  const { items, applyDiscount, increaseQty, decreaseQty } = useProducts()
  const modal = useModal()

  const primaryAction = {
    label: 'Apply 50% Discount',
    onClick: () => applyDiscount(checkboxes.checkedItems, 0.5),
  }

  const secondaryActions = {
    label: 'Quantity',
    actions: [
      {
        label: 'Increase 50',
        onClick: checked => increaseQty(checked, 50),
      },
      {
        label: 'Decrease 50',
        onClick: checked => decreaseQty(checked, 50),
      },
    ],
    onActionClick: action => action.onClick(checkboxes.checkedItems),
  }

  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
    onToggle: ({ checkedItems }) => console.table(checkedItems),
  })

  const onConfirm = () => {
    modal.toggle()
    checkboxes.checkAll()
  }

  return (
    <>
      <Table
        measures={measures}
        checkboxes={checkboxes}
        columns={columns}
        items={items}>
        <Table.Bulk active={checkboxes.someChecked}>
          <Table.Bulk.Actions>
            <Table.Bulk.Actions.Primary {...primaryAction} />
            <Table.Bulk.Actions.Secondary {...secondaryActions} />
          </Table.Bulk.Actions>
          <Table.Bulk.Tail>
            {!checkboxes.allChecked && (
              <Table.Bulk.Tail.Info>
                All rows selected: {checkboxes.checkedItems.length}
              </Table.Bulk.Tail.Info>
            )}
            <Table.Bulk.Tail.Toggle
              button={{
                text: `Select all ${items.length}`,
                onClick: modal.toggle,
              }}
              active={checkboxes.allChecked}>
              Selected rows: {items.length}
            </Table.Bulk.Tail.Toggle>
            <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
          </Table.Bulk.Tail>
        </Table.Bulk>
      </Table>

      <ModalDialog
        centered
        confirmation={{
          onClick: onConfirm,
          label: 'Ok',
        }}
        cancelation={{
          onClick: modal.toggle,
          label: 'Cancel',
        }}
        isOpen={modal.active}
        onClose={modal.toggle}>
        <h1>Are you sure !?</h1>
        <p>
          Since you do not designate any filters, the following action will
          drain a lot of CPU power to be completed because the current items
          collection is too large. Your app may be inactive for a little while.
          Click OK to proceed!
        </p>
      </ModalDialog>
    </>
  )
}

function currencyRenderer({ data }) {
  return <span>$ {parseFloat(data).toFixed(2)}</span>
}

function useModal() {
  const [active, setActive] = React.useState(false)
  const toggle = React.useCallback(() => setActive(old => !old), [active])
  return { active, toggle }
}

function useProducts() {
  const [items, setItems] = React.useState(data.products)

  const bulkUpdate = group => positive => {
    const groupIds = group.map(item => item.id)
    setItems(oldItems =>
      oldItems.map(item => (groupIds.includes(item.id) ? positive(item) : item))
    )
  }

  const discountCurry = amt => value => value - value * amt

  const applyDiscount = React.useCallback(
    (group, amt) => {
      const calcDiscount = discountCurry(amt)
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        retailPrice: calcDiscount(item.retailPrice),
        wholesalePrice: calcDiscount(item.wholesalePrice),
      }))
    },
    [items]
  )

  const increaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty + amt,
      }))
    },
    [items]
  )

  const decreaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty - amt,
      }))
    },
    [items]
  )

  return { items, applyDiscount, increaseQty, decreaseQty }
}

;<BulkFullExample />
```

# Action Bar

This feature allows users to add custom action bars.

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree/index.tsx')
  .default
const Toggle = require('../Toggle/index.js').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
]

const items = data.products

const { ActionBar } = Table

function ActionBarExample() {
  const [active, setActive] = React.useState(false)
  const isDisabled = () => !active
  const measures = useTableMeasures({ size: items.length })
  const checkboxes = useCheckboxTree({ columns, items, isDisabled })

  return (
    <Table
      checkboxes={checkboxes}
      measures={measures}
      items={items}
      columns={columns}>
      <ActionBar>
        <Toggle
          checked={active}
          label={active ? 'Disable checkboxes' : 'Enable checkboxes'}
          onChange={() => setActive(active => !active)}
        />
      </ActionBar>
    </Table>
  )
}
;<ActionBarExample />
```

# Filter Bar

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Input = require('../Input').default
const Checkbox = require('../Checkbox').default

  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'status',
    title: 'Status',
    cellRenderer: ({ cellData }) => <Status status={cellData} />,
  },
]

function Icon({ name, height, style }) {
  const SelectedIcon = Icons[name]
  return <SelectedIcon style={style} className="c-muted-1" size={height - 5} />
}

function Status({ status }) {
  const type = status === 'ACTIVE' ? 'success' : 'neutral'
  return <Tag type={type}>{status}</Tag>
}

const items = data.payments

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { value } = action
      return {
        ...state,
        inputValue: value,
      }
    }
    case 'clear': {
      return {
        inputValue: '',
        displayItems: items,
      }
    }
    case 'submit': {
      const inputClear = state.input === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(state.inputValue.toLowerCase())
      return {
        ...state,
        displayItems: inputClear ? items : items.filter(filterFn),
      }
    }
    default: {
      return state
    }
  }
}

function ToolbarExample() {
  const [state, dispatch] = React.useReducer(reducer, {
    inputValue: '',
    displayItems: items,
  })

  const visibility = useTableVisibility({
    columns,
    items,
    hiddenColumns: ['id'],
  })

  const measures = useTableMeasures({
    size: state.displayItems.length,
  })

  const inputSearch = {
    value: state.inputValue,
    placeholder: 'Search stuff...',
    onChange: e => dispatch({ type: 'change', value: e.currentTarget.value }),
    onClear: () => {
      dispatch({ type: 'clear' })
    },
    onSubmit: e => {
      e.preventDefault()
      dispatch({ type: 'submit' })
    },
  }

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
  }

  const download = {
    label: 'Export',
    onClick: () => alert('Clicked EXPORT'),
  }

  const upload = {
    label: 'Import',
    onClick: () => alert('Clicked IMPORT'),
  }

  const extraActions = {
    label: 'More options',
    actions: [
      {
        label: 'An action',
        onClick: () => alert('An action'),
      },
      {
        label: 'Another action',
        onClick: () => alert('Another action'),
      },
      {
        label: 'A third action',
        onClick: () => alert('A third action'),
      },
    ],
  }

  const newLine = {
    label: 'New',
    onClick: () => alert('handle new line callback'),
    actions: [
      'General',
      'Desktop & Screen Saver',
      'Dock',
      'Language & Region',
    ].map(label => ({
      label,
      onClick: () => alert(`Clicked ${label}`),
    })),
  }

  const emptyState = {
    label: 'The table is empty',
  }

  const empty = React.useMemo(
    () =>
      state.displayItems.length === 0 ||
      Object.keys(visibility.visibleColumns).length === 0,
    [visibility.visibleColumns, state.displayItems]
  )

  return (
    <Table
      empty={empty}
      measures={measures}
      items={state.displayItems}
      columns={visibility.visibleColumns}
      emptyState={emptyState}>
      <Table.Toolbar>
        <Table.Toolbar.InputSearch {...inputSearch} />
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
          <Table.Toolbar.ButtonGroup.Density density={measures} {...density} />
          <Table.Toolbar.ButtonGroup.Download {...download} />
          <Table.Toolbar.ButtonGroup.Upload {...upload} />
          <Table.Toolbar.ButtonGroup.ExtraActions {...extraActions} />
          <Table.Toolbar.ButtonGroup.NewLine {...newLine} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<ToolbarExample />
```

## Totalizer

[TODO] - Text

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const ArrowUp = require('../icon/ArrowUp/index.js').default
const ArrowDown = require('../icon/ArrowDown/index.js').default

const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: ({ cellData }) => <Currency value={cellData} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: ({ cellData }) => <Currency value={cellData} />,
  },
]

const formatCurrency = value => parseFloat(value).toFixed(2)

function Currency({ value }) {
  return <span>$ {formatCurrency(value)}</span>
}

const items = data.products

function TotalizerExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const totalizer = React.useMemo(() => {
    const sum = items.reduce(
      (acc, item) => {
        const { stock, cost, retail } = acc

        return {
          stock: stock + item.qty,
          cost: cost + item.qty * item.costPrice,
          retail: retail + item.qty * item.retailPrice,
        }
      },
      {
        stock: 0,
        cost: 0,
        retail: 0,
      }
    )
    return {
      items: [
        {
          label: 'Stock',
          value: sum.stock,
        },

        {
          label: 'Total cost',
          value: `$ ${formatCurrency(sum.cost)}`,
          iconBackgroundColor: '#fda4a4',
          icon: <ArrowDown color="#dd1616" size={14} />,
        },
        {
          label: 'Total retail',
          value: `$ ${formatCurrency(sum.retail)}`,
          iconBackgroundColor: '#eafce3',
          icon: <ArrowUp color="#79B03A" size={14} />,
        },
        {
          label: 'Expected Profit',
          value: `$ ${formatCurrency(sum.retail - sum.cost)}`,
        },
      ],
    }
  }, [items])

  return (
    <Table measures={measures} columns={columns} items={items}>
      <Table.Totalizer {...totalizer} />
    </Table>
  )
}

;<TotalizerExample />
```

## Bulk Actions

[TODO] - Text

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default
const data = require('./sampleData')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: props => <Currency {...props} />,
  },
  {
    id: 'wholesalePrice',
    title: 'Wholesale',
    cellRenderer: props => <Currency {...props} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: props => <Currency {...props} />,
  },
]

function Currency({ cellData, rowData }) {
  return <>$ {parseFloat(cellData).toFixed(2)}</>
}

function useProducts() {
  const [items, setItems] = React.useState(data.products)

  const bulkUpdate = group => positive => {
    const groupIds = group.map(item => item.id)
    setItems(oldItems =>
      oldItems.map(item => (groupIds.includes(item.id) ? positive(item) : item))
    )
  }

  const discountCurry = amt => value => value - value * amt

  const applyDiscount = React.useCallback(
    (group, amt) => {
      const calcDiscount = discountCurry(amt)
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        retailPrice: calcDiscount(item.retailPrice),
        wholesalePrice: calcDiscount(item.wholesalePrice),
      }))
    },
    [items]
  )

  const increaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty + amt,
      }))
    },
    [items]
  )

  const decreaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty - amt,
      }))
    },
    [items]
  )

  return { items, applyDiscount, increaseQty, decreaseQty }
}

function BulkFullExample() {
  const { items, applyDiscount, increaseQty, decreaseQty } = useProducts()

  const primaryAction = {
    label: 'Apply 50% Discount',
    onClick: () => applyDiscount(checkboxes.checkedItems, 0.5),
  }

  const secondaryActions = {
    label: 'Quantity',
    actions: [
      {
        label: 'Increase 50',
        onClick: checked => increaseQty(checked, 50),
      },
      {
        label: 'Decrease 50',
        onClick: checked => decreaseQty(checked, 50),
      },
    ],
    onActionClick: action => action.onClick(checkboxes.checkedItems),
  }

  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
    onToggle: ({ checkedItems }) => console.table(checkedItems),
  })

  return (
    <>
      <Table
        measures={measures}
        checkboxes={checkboxes}
        columns={columns}
        items={items}>
        <Table.Bulk active={checkboxes.someChecked}>
          <Table.Bulk.Actions>
            <Table.Bulk.Actions.Primary {...primaryAction} />
            <Table.Bulk.Actions.Secondary {...secondaryActions} />
          </Table.Bulk.Actions>
          <Table.Bulk.Tail>
            {!checkboxes.allChecked && (
              <Table.Bulk.Tail.Info>
                All rows selected: {checkboxes.checkedItems.length}
              </Table.Bulk.Tail.Info>
            )}
            <Table.Bulk.Tail.Toggle
              button={{
                text: `Select all ${items.length}`,
                onClick: checkboxes.checkAll,
              }}
              active={checkboxes.allChecked}>
              Selected rows: {items.length}
            </Table.Bulk.Tail.Toggle>
            <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
          </Table.Bulk.Tail>
        </Table.Bulk>
      </Table>
    </>
  )
}

;<BulkFullExample />
```

## Autocomplete, Filters & Pagination

[TODO] - TEXT

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableProportion = require('./hooks/useTableProportion.ts').default
const Input = require('../Input/index.js').default
const Checkbox = require('../Checkbox/index.js').default
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

const items = data.customers

function usePagination(initialSize, items) {
  const [state, setState] = React.useState({
    tableSize: initialSize,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: initialSize,
    slicedItems: [...items].slice(0, initialSize),
  })

  React.useEffect(() => {
    setState({
      tableSize: initialSize,
      currentPage: 1,
      currentItemFrom: 1,
      currentItemTo: initialSize,
      slicedItems: [...items].slice(0, initialSize),
    })
  }, [items])

  const onNextClick = React.useCallback(() => {
    const newPage = state.currentPage + 1
    const itemFrom = state.currentItemTo + 1
    const itemTo = state.tableSize * newPage
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }, [state, items])

  const onPrevClick = React.useCallback(() => {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - state.tableSize
    const itemTo = state.currentItemFrom - 1
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }, [state, items])

  const onRowsChange = React.useCallback(
    (e, value) => {
      const rowValue = parseInt(value)
      setState(state => ({
        ...state,
        tableSize: rowValue,
        currentItemTo: rowValue,
        slicedItems: [...items].slice(state.currentItemFrom - 1, rowValue),
      }))
    },
    [state, items]
  )

  return {
    onNextClick,
    onPrevClick,
    onRowsChange,
    ...state,
  }
}

function PaginationExample() {
  const ITEMS_PER_PAGE = 5
  const measures = useTableMeasures({ size: ITEMS_PER_PAGE })
  const [filteredItems, setFilteredItems] = React.useState(items)
  const [filterStatements, setFilterStatements] = React.useState([])
  const { slicedItems, ...paginationProps } = usePagination(
    ITEMS_PER_PAGE,
    filteredItems
  )
  const { sizedColumns } = useTableProportion({ columns, ratio: [1, 1] })
  const [term, setTerm] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const timeoutRef = React.useRef(null)

  const pagination = {
    ...paginationProps,
    textOf: 'of',
    rowsOptions: [5, 10, 15],
    textShowRows: 'Show rows',
    totalItems: filteredItems.length,
  }

  function handleFiltersChange(statements = []) {
    let newData = items.slice()
    statements.forEach(st => {
      if (!st || !st.object) return
      const { subject, verb, object } = st
      switch (subject) {
        case 'name':
        case 'email':
          if (verb === 'contains') {
            newData = newData.filter(item => item[subject].includes(object))
          } else if (verb === '=') {
            newData = newData.filter(item => item[subject] === object)
          } else if (verb === '!=') {
            newData = newData.filter(item => item[subject] !== object)
          }
          break

        case 'location':
          if (!object) return
          const selectedLocations = Object.keys(object).reduce(
            (acc, item) => (object[item] ? [...acc, item] : acc),
            []
          )
          newData = newData.filter(item =>
            selectedLocations.includes(item[subject])
          )
          break
      }
    })
    setFilteredItems(newData)
    setFilterStatements(statements)
  }

  const filters = {
    alwaysVisibleFilters: ['name', 'location'],
    statements: filterStatements,
    onChangeStatements: handleFiltersChange,
    clearAllFiltersButtonLabel: 'Clear Filters',
    collapseLeft: true,
    options: {
      name: {
        label: 'Name',
        ...simpleInputVerbsAndLabel(),
      },
      email: {
        label: 'Email',
        ...simpleInputVerbsAndLabel(),
      },
      location: {
        label: 'Location',
        renderFilterLabel: st => {
          if (!st || !st.object) {
            return 'All'
          }
          const keys = st.object ? Object.keys(st.object) : {}
          const isAllTrue = !keys.some(key => !st.object[key])
          const isAllFalse = !keys.some(key => st.object[key])
          const trueKeys = keys.filter(key => st.object[key])
          let trueKeysLabel = ''
          trueKeys.forEach((key, index) => {
            trueKeysLabel += `${key}${
              index === trueKeys.length - 1 ? '' : ', '
            }`
          })
          return `${
            isAllTrue ? 'All' : isAllFalse ? 'None' : `${trueKeysLabel}`
          }`
        },
        verbs: [
          {
            label: 'includes',
            value: 'includes',
            object: {
              renderFn: locationSelectorObject,
              extraParams: {},
            },
          },
        ],
      },
    },
  }

  const options = {
    onSelect: (...args) => console.log('onSelect: ', ...args),
    loading,
    value: !term.length
      ? []
      : filteredItems
          .map(item => item.name)
          .filter(name =>
            typeof name === 'string'
              ? name.toLowerCase().includes(term.toLowerCase())
              : name.label.toLowerCase().includes(term.toLowerCase())
          ),
  }

  const input = {
    onChange: term => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onSearch: (...args) => console.log('onSearch:', ...args),
    onClear: () => setTerm(''),
    placeholder: 'Search name... (e.g.: Peter)',
    value: term,
  }

  return (
    <Table measures={measures} items={slicedItems} columns={sizedColumns}>
      <Table.Toolbar>
        <Table.Toolbar.InputAutocomplete input={input} options={options} />
      </Table.Toolbar>
      <Table.FilterBar {...filters} />
      <Table.Pagination {...pagination} />
    </Table>
  )
}

function simpleInputObject({ values, onChangeObjectCallback }) {
  return (
    <Input
      value={values || ''}
      onChange={e => onChangeObjectCallback(e.target.value)}
    />
  )
}

function simpleInputVerbsAndLabel() {
  return {
    renderFilterLabel: st => {
      if (!st || !st.object) {
        // you should treat empty object cases only for alwaysVisibleFilters
        return 'Any'
      }
      return `${
        st.verb === '=' ? 'is' : st.verb === '!=' ? 'is not' : 'contains'
      } ${st.object}`
    },
    verbs: [
      {
        label: 'is',
        value: '=',
        object: {
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
      {
        label: 'is not',
        value: '!=',
        object: {
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
      {
        label: 'contains',
        value: 'contains',
        object: {
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
    ],
  }
}

function locationSelectorObject({ values, onChangeObjectCallback }) {
  const initialValue = {
    '🇰🇪Wakanda': true,
    '🇺🇸USA': true,
    '🇨🇳China': true,
    '🇷🇺Russia': true,
    '🇬🇧Great Britain': true,
    '🇸🇦Saudi Arabia': true,
    '🇨🇺Cuba': true,
    ...(values || {}),
  }
  const toggleValueByKey = key => {
    const newValues = {
      ...(values || initialValue),
      [key]: values ? !values[key] : false,
    }
    return newValues
  }
  return (
    <div>
      {Object.keys(initialValue).map((opt, index) => {
        return (
          <div className="mb3" key={`class-statment-object-${opt}-${index}`}>
            <Checkbox
              checked={values ? values[opt] : initialValue[opt]}
              label={opt}
              name="default-checkbox-group"
              onChange={() => {
                const newValue = toggleValueByKey(`${opt}`)
                const newValueKeys = Object.keys(newValue)
                const isEmptyFilter = !newValueKeys.some(key => !newValue[key])
                onChangeObjectCallback(isEmptyFilter ? null : newValue)
              }}
              value={opt}
            />
          </div>
        )
      })}
    </div>
  )
}

;<PaginationExample />
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
