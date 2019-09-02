# Table Columns

The columns property is a LIST used to define the table columns and how they should behave visually. The Schema has properties and each one of them defines a column in the table.
Example with simple structure:

```ts
;[
  {
    id: 'property',
    title: 'Property',
    cellRender: ({ cellData, rowData }) => {
      return <span className="classname">{cellData}</span>
    },
  },
  // ...
]
```

##### id

- Defines the property name.
- This property is required.

##### title

- Control the title which appears on table Header.
- It receives only strings.
- If you want to customize it with a component, you can use the `headerRender` prop.

##### cellRender

- Customize the render method of a single column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ cellData, rowData })
- Default is render the value as a string.
- If you have a custom cell component that has a click interaction and at the same time you use the onRowClick Table prop, you might stumble uppon the problem of both click actions being fired. We can work around that by doing a wrapper around cellRenderer to stop click event propagation, like so:

#### State Hook

Different than the previous version the `Table v2` is completely stateless, meaning that the parent has full control of its states. This is made possible by the `useTableState` hook. Its input is an `List` containing `columns` (the columns definition), `items` (the actual items to show, which described by the columns) and `density` (density of the table rows).

### Example Of Usage

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const Tag = require('../Tag/index.js').default

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
    cellRender: ({ cellData }) => {
      return <Tag>{cellData}</Tag>
    },
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

function StateHookExample() {
  const tableState = useTableState({
    columns,
    items,
  })

  return <Table state={tableState} />
}
;<StateHookExample />
```

### Input Object

| Property | Type                      | Description                         |
| -------- | ------------------------- | ----------------------------------- |
| columns  | List of Columns           | Definition of the table columns     |
| items    | Array of Object           | The actual items that will be shown |
| density  | 'low', 'medium' or 'high' | Density of table rows               |

### Return Values

| Property           | Type            | Description                         |
| ------------------ | --------------- | ----------------------------------- |
| columns            | List of Columns | Definition of the table columns     |
| items              | Array of Object | The actual items that will be shown |
| isEmpty            | Boolean         | If there are items to show or not   |
| tableHeight        | Number          | Table calculated height             |
| rowHeight          | Number          | Table calculated row height         |
| selectedDensity    | Density         | Current selected density            |
| setSelectedDensity | Function        | selectedDensity setter              |

# Pagination

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default

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

  const tableState = useTableState({
    columns,
    items: slicedItems,
  })

  const pagination = {
    ...paginationProps,
    textOf: 'of',
    rowsOptions: [5, 10, 15],
    textShowRows: 'Show rows',
    totalItems: items.length,
  }

  return (
    <Table state={tableState}>
      <Table.Pagination {...pagination} />
    </Table>
  )
}
;<PaginationExample />
```

# Nested Rows

`TableV2` allows nested rows that are enabled via the `nestedRows` prop. Each `item` object of `items` array may have a special property named `children` that is an array of objects with the same shape of `item`. It's important to notice that your row tree can have unlimited depth.

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const Tag = require('../Tag/index.js').default

// Define the columns
const columns = [
  {
    id: 'name',
    title: 'Name',
    width: 280,
  },
  {
    id: 'email',
    title: 'Email',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

// Define the items with children
const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    country: '🇺🇸USA',
    children: [
      {
        name: 'Aunt May',
        email: 'may.parker@gmail.com',
        country: '🇺🇸USA',
      },
      {
        name: 'Uncle Ben',
        email: 'ben.parker@gmail.com',
        country: '🇺🇸USA',
      },
      {
        name: 'Marry Jane',
        email: 'mjaaay@gmail.com',
        country: '🇺🇸USA',
        children: [
          {
            name: 'Harry Osbourne',
            email: 'harry@gmail.com',
            country: '🇺🇸USA',
          },
          {
            name: 'Normal Osbourne',
            email: 'norman@gmail.com',
            country: '🇺🇸USA',
            children: [
              {
                name: 'Green Goblin',
                email: 'norman.green@gmail.com',
                country: '🇺🇸USA',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    country: '🇨🇳China',
  },
]

function NestedExample() {
  const tableState = useTableState({
    columns,
    items,
    density: 'medium',
  })

  return <Table state={tableState} nestedRows />
}
;<NestedExample />
```

# Toolbar

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default

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

  const tableState = useTableState({
    columns,
    items: displayItems,
    density: 'medium',
  })

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
    <Table state={tableState}>
      <Table.Toolbar>
        <Table.Toolbar.InputSearch {...inputSearch} />
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Density {...density} />
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
const useTableState = require('./hooks/useTableState.ts').default
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
  const tableState = useTableState({
    columns,
    items: displayItems,
  })

  return (
    <Table state={tableState}>
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
