## Columns

The `columns` property is an `Array` used to define the table columns and how they should behave visually. Each column describes each item field should be handled by the `Table`.

```ts
type Column = {
  id?: string
  title?: string
  width?: number
  cellRenderer?: ({
    cellData: unknown
    rowData: unknown
    rowHeight: number
    selectedDensity: 'low' | 'medium' | 'high'
  }) => React.ReactNode
  headerRenderer?: ({ columnData: Column }) => React.ReactNode
}
```

##### id

- Defines the property name.
- This property is required.

##### title

- Controls the title which appears on the table Header.
- If you want to customize it with a component, you can use the `headerRenderer` prop.

##### width

- Defines a fixed width for the specific column.
- By default, the column's width is defined to fit the available space without breaking the content.

##### headerRenderer

- Customize the render method of a single header column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ columnData })
- The default is rendering the value as a string.

##### cellRenderer

- Customize the render method of a single column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ cellData, rowData, rowHeight, selectedDensity })
  - cellData: the value of the current cell.
  - rowData: the value of the current row.
  - rowHeight: current height of the row.
  - selectedDensity: current table density.
- The default is rendering the value as a string.

To illustrate this info, let's suppose we have a list of heroes, each one with properties `name`, `email`, `age` and `country`:

```ts
type Hero = {
  name: string
  email: string
  age: number
  country: string
}

const heroes: Array<Hero> = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    age: 31,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    age: 17,
    country: '🇺🇸USA',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    age: 29,
    country: '🇷🇺Russia',
  },
]
```

To allow us to see the `Column` features, let's imagine some specifications:

- The `name` should be rendered as simple as possible
- The `email` header should contain 💌 emoji
- Age should be rendered inside of a `Tag` component with de `bgColor` blue for underage heroes and pink for the older age.
- The header title for `country` prop should be 'Nationality'.

Given these, the columns would be:

```ts
const heroColumns: Array<Column> = [
  {
    /** Definitions for the name prop */
    id: 'name',
    title: 'Name',
  },
  {
    /** Definitions for the email prop */
    id: 'email',
    title: 'Email',
    /** Custom renderer for email prop */
    headerRenderer: ({ columnData: { title } }) => {
      return (
        <React.Fragment>
          <Emoji symbol="💌" label="mail" /> {title}
        </React.Fragment>
      )
    },
  },
  {
    /** Definitions for the age prop */
    id: 'age',
    title: 'Age',
    /** Custom renderer for age prop */
    cellRenderer: ({ cellData: age }) => {
      const bgColor = age > 18 ? '#F71963' : '#134CD8'
      return (
        <Tag color="#FFFFFF" bgColor={bgColor}>
          {age} years
        </Tag>
      )
    },
  },
  {
    /** Definitions for the country prop */
    id: 'country',
    /** This means that the title shown for the country property will be Nationality */
    title: 'Nationality',
  },
]
```

##### Working example:

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Tag = require('../Tag/index.js').default

const heroColumns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
    headerRenderer: ({ columnData: { title } }) => {
      return (
        <React.Fragment>
          <Emoji symbol="💌" label="mail" /> {title}
        </React.Fragment>
      )
    },
  },
  {
    id: 'age',
    title: 'Age',
    cellRenderer: ({ cellData: age }) => {
      const bgColor = age > 18 ? '#F71963' : '#134CD8'
      return (
        <Tag color="#FFFFFF" bgColor={bgColor}>
          {age} years
        </Tag>
      )
    },
  },
  {
    id: 'country',
    title: 'Nationality',
  },
]

const heroes = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    age: 31,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    age: 17,
    country: '🇺🇸USA',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    age: 29,
    country: '🇷🇺Russia',
  },
]

function Emoji({ symbol, label = '' }) {
  return (
    <span role="img" arial-label={label} aria-hidden={label ? 'false' : 'true'}>
      {symbol}
    </span>
  )
}

function SimpleExample() {
  const measures = useTableMeasures({
    size: heroes.length,
  })

  return <Table measures={measures} columns={heroColumns} items={heroes} />
}
;<SimpleExample />
```

##### Toggle visibility

It is possible to show/hide columns. This can be done using the `EXPERIMENTAL_useTableVisibility` hook and the `Columns` button (part of the `Toolbar`). Check the working example below:

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default

const Tag = require('../Tag/index.js').default

const heroColumns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
    headerRenderer: ({ columnData: { title } }) => {
      return (
        <span>
          <Emoji symbol="💌" label="mail" /> {title}
        </span>
      )
    },
  },
  {
    id: 'age',
    title: 'Age',
    cellRenderer: ({ cellData: age }) => {
      const bgColor = age > 18 ? '#F71963' : '#134CD8'
      return (
        <Tag color="#FFFFFF" bgColor={bgColor}>
          {age} years
        </Tag>
      )
    },
  },
  {
    id: 'country',
    title: 'Nationality',
  },
]

const heroes = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    age: 31,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    age: 17,
    country: '🇺🇸USA',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    age: 29,
    country: '🇷🇺Russia',
  },
]

function Emoji({ symbol, label = '' }) {
  return (
    <span role="img" arial-label={label} aria-hidden={label ? 'false' : 'true'}>
      {symbol}
    </span>
  )
}

function ToggleColumnsExample() {
  const visibility = useTableVisibility({
    columns: heroColumns,
  })

  const measures = useTableMeasures({
    size: heroes.length,
  })

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  return (
    <Table
      measures={measures}
      items={heroes}
      columns={visibility.visibleColumns}>
      <Table.Toolbar>
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<ToggleColumnsExample />
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
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
]

function ClickExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

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
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
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
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
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

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default
const Button = require('../Button/index.js').default

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
```

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
    name: "T'Chala",
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    country: '🇷🇺Russia',
  },
  {
    name: 'Stephen Strange',
    country: '🇺🇸USA',
  },
  {
    name: 'Steve Rogers',
    country: '🇺🇸USA',
  },
  {
    name: 'Abdul Alhazred',
    country: '🇸🇦Saudi Arabia',
  },
  {
    name: 'Carol Danvers',
    country: '🇺🇸USA',
  },
  {
    name: 'Scott Lang',
    country: '🇺🇸USA',
  },
  {
    name: 'En Sabah Nuh',
    country: '🇨🇺Cuba',
  },
  {
    name: 'Abdul Qamar',
    country: '🇸🇦Saudi Arabia',
  },
  {
    name: 'Goose the Cat',
    country: '🇺🇸USA',
  },
  {
    name: 'Brian Braddock',
    country: '🇬🇧Great Britain',
  },
  {
    name: 'Marc Spector',
    country: '🇺🇸USA',
  },
  {
    name: 'John Walker',
    country: '🇺🇸USA',
  },
  {
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

# Bulk Actions

### Actions Example

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

function currencyRenderer({ cellData, rowData }) {
  const { costPrice } = rowData
  const className = cellData < costPrice ? 'red' : ''
  return <span className={className}>$ {parseFloat(cellData).toFixed(2)}</span>
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
```

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

  const checkboxes = useCheckboxTree({
    items,
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

function currencyRenderer({ cellData, rowData }) {
  const { costPrice } = rowData
  const className = cellData < costPrice ? 'red' : ''
  return <span className={className}>$ {parseFloat(cellData).toFixed(2)}</span>
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

# Line actions

This feature creates a last extra column with an ActionMenu component per line.

```js
// Imports
const useTableLineActions = require('./hooks/useTableLineActions.tsx').default
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default

// Define the columns
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
    id: 'number',
    title: 'Number',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

// Define the items
const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    number: 3.09191,
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
]

function LineActionsExample() {
  const lineActions = [
    {
      label: 'Action 1',
      onClick: ({ rowData }) => alert(`Executed action for ${rowData.name}`),
    },
    {
      label: 'DANGEROUS Action',
      isDangerous: true,
      onClick: ({ rowData }) =>
        alert(`Executed a DANGEROUS action for ${rowData.name}`),
    },
  ]

  const { itemsWithLineActions, columnsWithLineActions } = useTableLineActions({
    items,
    columns,
    lineActions,
  })
  const measures = useTableMeasures({ size: items.length })

  return (
    <Table
      measures={measures}
      items={itemsWithLineActions}
      columns={columnsWithLineActions}
    />
  )
}
;<LineActionsExample />
```

# Filter Bar

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Input = require('../Input').default
const Checkbox = require('../Checkbox').default

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
    id: 'number',
    title: 'Number',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    number: 3.09191,
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
]

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

function numberInputObject({ values, onChangeObjectCallback }) {
  return (
    <Input
      placeholder="Insert number…"
      type="number"
      min="0"
      max="180"
      value={values || ''}
      onChange={e => {
        onChangeObjectCallback(e.target.value.replace(/\D/g, ''))
      }}
    />
  )
}

function numberInputRangeObject({
  statements,
  values,
  statementIndex,
  onChangeObjectCallback,
}) {
  return (
    <div className="flex">
      <Input
        placeholder="Number from…"
        errorMessage={
          statements[statementIndex].object &&
          parseInt(statements[statementIndex].object.first) >=
            parseInt(statements[statementIndex].object.last)
            ? 'Must be smaller than other input'
            : ''
        }
        value={values && values.first ? values.first : ''}
        onChange={e => {
          const currentObject = values || {}
          currentObject.first = e.target.value.replace(/\D/g, '')

          onChangeObjectCallback(currentObject)
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <Input
        placeholder="Number to…"
        value={values && values.last ? values.last : ''}
        onChange={e => {
          const currentObject = values || {}
          currentObject.last = e.target.value.replace(/\D/g, '')

          onChangeObjectCallback(currentObject)
        }}
      />
    </div>
  )
}

function countrySelectorObject({ values, onChangeObjectCallback }) {
  const initialValue = {
    '🇰🇪Wakanda': true,
    '🇺🇸USA': true,
    '🇨🇳China': true,
    '🇷🇺Russia': true,
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

function FilterBarExample() {
  const [filteredItems, setFilteredItems] = React.useState(items)

  React.useEffect(() => {
    console.log(filteredItems)
  })

  const measures = useTableMeasures({ size: items.length })

  const [filterStatements, setFilterStatements] = React.useState([])

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

        case 'number':
          if (verb === '=') {
            newData = newData.filter(item => item.number === parseInt(object))
          } else if (verb === 'between') {
            newData = newData.filter(
              item =>
                item.number >= parseInt(object.first) &&
                item.number <= parseInt(object.last)
            )
          }
          break

        case 'country':
          if (!object) return
          const selectedCountries = Object.keys(object).reduce(
            (acc, item) => (object[item] ? [...acc, item] : acc),
            []
          )
          newData = newData.filter(item =>
            selectedCountries.includes(item[subject])
          )
          break
      }
    })
    setFilteredItems(newData)
    setFilterStatements(statements)
  }

  const filters = {
    alwaysVisibleFilters: ['name', 'country'],
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
      number: {
        label: 'Number',
        renderFilterLabel: st =>
          `${
            st.verb === 'between'
              ? `between ${st.object.first} and ${st.object.last}`
              : `is ${st.object}`
          } `,
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: numberInputObject,
              extraParams: {},
            },
          },
          {
            label: 'is between',
            value: 'between',
            object: {
              renderFn: numberInputRangeObject,
              extraParams: {},
            },
          },
        ],
      },
      country: {
        label: 'Country',
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
              renderFn: countrySelectorObject,
              extraParams: {},
            },
          },
        ],
      },
    },
  }

  return (
    <Table measures={measures} columns={columns} items={filteredItems}>
      <Table.FilterBar {...filters} />
    </Table>
  )
}
;<FilterBarExample />
```

# Toolbar

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default

// Define the columns
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
    id: 'number',
    title: 'Number',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

// Define the items
const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    number: 3.09191,
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
]

function ToolbarExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [displayItems, setDisplayItems] = React.useState(items)

  const visibility = useTableVisibility({
    columns,
    items,
  })

  const measures = useTableMeasures({
    size: items.length,
  })

  const emptyState = {
    label: 'The table is empty',
  }

  const empty = React.useMemo(
    () =>
      displayItems.length === 0 ||
      Object.keys(visibility.visibleColumns).length === 0,
    [visibility.visibleColumns, displayItems]
  )

  const inputSearch = {
    value: inputValue,
    placeholder: 'Search stuff...',
    onChange: e => setInputValue(e.currentTarget.value),
    onClear: () => {
      setInputValue('')
      setDisplayItems(items)
    },
    onSubmit: e => {
      e.preventDefault()
      const isInputClear = inputValue === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      setDisplayItems(isInputClear ? items : items.filter(filterFn))
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
    lowOptionLabel: 'Low',
    mediumOptionLabel: 'Medium',
    highOptionLabel: 'High',
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

  return (
    <Table
      empty={empty}
      measures={measures}
      items={displayItems}
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

### UNSAFE Custom Input

The `UNSAFE_InputCustom` provides a simple way of passing a custom input to the `Table`'s toolbar.

⚠️ Be aware that this component is temporary and WILL change in the future!

```js
// Imports
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Input = require('../Input/index.js').default

/** Define the columns */
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
    id: 'number',
    title: 'Number',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

/** Define the items */
const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    number: 3.09191,
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
]

/** Custom hook to filter items and keep track of input props */
function useItemsFilter() {
  const [displayItems, setDisplayItems] = React.useState(items)
  const [inputValue, setInputValue] = React.useState('')

  return {
    displayItems,
    value: inputValue,
    placeholder: 'Hey, This input is custom 🙂',
    onChange: e => setInputValue(e.currentTarget.value),
    onClear: () => {
      setInputValue('')
      setDisplayItems(items)
    },
    onSubmit: e => {
      e.preventDefault()
      const isInputClear = inputValue === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      setDisplayItems(isInputClear ? items : items.filter(filterFn))
    },
  }
}

/** Custom input example */
function InputCustom({ onSubmit, ...inputProps }) {
  return (
    <form onSubmit={onSubmit}>
      <Input {...inputProps} />
    </form>
  )
}

function UnsafeInputExample() {
  const { displayItems, ...inputProps } = useItemsFilter()
  const measures = useTableMeasures({
    size: items.length,
  })

  return (
    <Table measures={measures} columns={columns} items={displayItems}>
      <Table.Toolbar>
        <Table.Toolbar.UNSAFE_InputCustom
          input={<InputCustom {...inputProps} />}
        />
      </Table.Toolbar>
    </Table>
  )
}
;<UnsafeInputExample />
```
