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

##### headerRender

- Customize the render method of a single header column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ headerData })
- Default is render the value as a string.
- If you have a custom cell component that has a click interaction and at the same time you use the onRowClick Table prop, you might stumble uppon the problem of both click actions being fired. We can work around that by doing a wrapper around cellRenderer to stop click event propagation.

##### cellRender

- Customize the render method of a single column cell.
- It receives a function that returns a node (react component).
- The function has the following params: ({ cellData, rowData })
- Default is render the value as a string.
- If you have a custom cell component that has a click interaction and at the same time you use the onRowClick Table prop, you might stumble uppon the problem of both click actions being fired. We can work around that by doing a wrapper around cellRenderer to stop click event propagation.

##### hidden

- Defines if a columns is initially hidden or not.
- ⚠️ You should use the `Columns` button of the toolbar to enable toggle columns visibility.

#### State Hook

Different than the previous version the `Table v2` is completely stateless, meaning that the parent has full control of its states. This is made possible by the `useTableState` hook. Its input is an `List` containing `columns` (the columns definition), `items` (the actual items to show, which described by the columns) and `density` (density of the table rows).

### Example Of Usage

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const useTableMeasures = require('./stateContainers/tableMeasures.tsx').default
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
  const measures = useTableMeasures({
    items,
  })

  console.log(measures)
  const tableState = useTableState({
    columns,
    items,
  })

  return <Table measures={measures} state={tableState} />
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

# Features

<div className="center mw7 pv6">
  ![](./table.png)
</div>

# Clickable rows

```js
const useTableState = require('./hooks/useTableState.ts').default

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
  const tableState = useTableState({
    columns,
    items,
  })

  const onRowClick = ({ rowData }) => {
    const { name, country } = rowData
    alert(`Your character is ${name}, from ${country}`)
  }

  return <Table onRowClick={onRowClick} state={tableState} />
}
;<ClickExample />
```

# Loading

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
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
  const tableState = useTableState({
    columns,
    items,
  })

  return (
    <div>
      <Toggle
        label="Toggle table loading"
        checked={loading}
        onChange={() => setLoading(!loading)}
      />
      <Table state={tableState} loading={loading} />
    </div>
  )
}
;<LoadingExample />
```

### Custom Loading

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
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
  const tableState = useTableState({ columns, items })

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
      <Table state={tableState} {...loading} />
    </div>
  )
}
;<CustomLoadingExample />
```

# Empty state

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default

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
  const tableState = useTableState({
    columns,
    items: [],
  })

  const emptyState = {
    label: 'This is an default empty state title',
  }

  return <Table state={tableState} emptyState={emptyState} />
}
;<EmptyExample />
```

Empty states can also be customized, the passed children will be rendered inside an EmptyState component.

⚠️ Customize the empty state using just the `emptyState` prop, so the other table features will behave correctly (e.g. the topbar, pagination, and totalizers).

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
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
  const tableState = useTableState({
    columns,
    items: [],
  })

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

  return <Table state={tableState} emptyState={emptyState} />
}
;<CustomEmptyStateExample />
```

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

# Bulk Actions

Bulk actions allow the user to select some or all the rows to execute an action. Texts have to be given to the component via a `texts` object.
Actions are passed via the `main` object and the `others` array props. Each object is composed of a `label` and the action event via `onClick` key.

The returned value for all selected lines is an object `allLinesSelected: true` otherwise the data of the rows are returned in the key `selectedRows` as an array.

##### NOTE 1:

`onRowClick` actions are not happening when clicking the checkbox.

##### NOTE 2:

There are two "select all" items.

- The **upper checkbox** on the left side selects the currently visible items, in the example below, 5.
- Beeing **optional**, the **Select all** button on the right side, selects all items from the database (by concept, since you will probably only load the visible items). Since not all items might be loaded in the table, the callback will only return a flag telling your app to handle all items for the next database operation.

Check the console when selecting/unselecting rows or clicking an action button in the example below to see the action parameters

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const useTableBulkActions = require('./hooks/useTableBulkActions.tsx').default

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
    id: 'country',
    title: 'Country',
  },
]

// Define the items with children
const items = [
  {
    id: 1,
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    country: '🇰🇪Wakanda',
  },
  {
    id: 2,
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    country: '🇺🇸USA',
  },
  {
    id: 3,
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    country: '🇨🇳China',
  },
]

function BulkExample() {
  const bulkActions = {
    texts: {
      secondaryActionsLabel: 'Actions',
      rowsSelected: qty => (
        <React.Fragment>Selected rows: {qty}</React.Fragment>
      ),
      selectAll: 'Select all',
      allRowsSelected: element => (
        <React.Fragment>All rows selected: {element}</React.Fragment>
      ),
    },
    totalItems: 4,
    onChange: params => console.log(params),
    main: {
      label: 'Main Action',
      onClick: params => console.log(params),
    },
    others: [
      {
        label: 'Action 1',
        onClick: params => console.log(params),
      },
      {
        label: 'Action 2',
        onClick: params => console.log(params),
      },
    ],
  }

  const { bulkedColumns, ...bulk } = useTableBulkActions({
    columns,
    items,
    bulkActions,
  })

  const tableState = useTableState({
    columns: bulkedColumns,
    items,
  })

  const density = {
    label: 'Line density',
    lowOptionLabel: 'Low',
    mediumOptionLabel: 'Medium',
    highOptionLabel: 'High',
  }

  return (
    <Table state={tableState} bulk={bulk}>
      <Table.BulkActions {...bulkActions} />
    </Table>
  )
}
;<BulkExample />
```

# Line actions

This feature creates a last extra column with an ActionMenu component per line.

```js
// Imports
const useTableLineActions = require('./hooks/useTableLineActions.tsx').default
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
  const tableState = useTableState({
    columns: columnsWithLineActions,
    items: itemsWithLineActions,
  })

  return <Table state={tableState} />
}
;<LineActionsExample />
```

# Filter Bar

```js
const useTableState = require('./hooks/useTableState.ts').default
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

  const tableState = useTableState({
    columns,
    items: filteredItems,
  })

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
    <Table state={tableState}>
      <Table.FilterBar {...filters} />
    </Table>
  )
}
;<FilterBarExample />
```

# Toolbar

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const useTableMeasures = require('./stateContainers/tableMeasures.tsx').default
const useTableVisibility = require('./stateContainers/visibility.ts').default

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

  const tableState = useTableState({
    columns: visibility.visibleColumns,
    items: displayItems,
  })

  const measures = useTableMeasures({
    items,
  })

  const emptyState = {
    label: 'The table is empty',
  }

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
    visibility
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
    <Table measures={measures} state={tableState} emptyState={emptyState}>
      <Table.Toolbar>
        <Table.Toolbar.InputSearch {...inputSearch} />
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
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
