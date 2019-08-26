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
columns = [
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
items = [
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

# Nested Rows

`TableV2` allows nested rows that are enabled via the `nestedRows` prop. Each `item` object of `items` array may have a special property named `children` that is an array of objects with the same shape of `item`. It's important to notice that your row tree can have unlimited depth.

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const Tag = require('../Tag/index.js').default

// Define the columns
columns = [
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
items = [
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

function StateHookExample() {
  const tableState = useTableState({
    columns,
    items,
    density: 'medium',
  })

  return <Table state={tableState} nestedRows />
}
;<StateHookExample />
```

# Toolbar

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default

// Define the columns
columns = [
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
items = [
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
    density: 'medium',
  })

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

  return (
    <Table state={tableState}>
      <Table.Toolbar>
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Density {...density} />
          <Table.Toolbar.ButtonGroup.Download {...download} />
          <Table.Toolbar.ButtonGroup.Upload {...upload} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<StateHookExample />
```
