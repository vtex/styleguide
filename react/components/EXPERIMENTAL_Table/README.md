# Table Columns

The columns property is a JSON used to define the table columns and how they should behave visually. The Schema has properties and each one of them defines a column in the table.
Example with simple structure:

```ts
{
  <property_id>: {
    title: 'Property',
    cellRender: ({ cellData, rowData }) => {
      return <span className="classname">{cellData}</span>
    },
  }
  // ...
}
```

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

Different than the previous version the `Table v2` is completely stateless, meaning that the parent has full control of its states. This is made possible by the `useTableState` hook. Its input is an `Object` containing `columns` (the columns definition), `items` (the actual items to show, which described by the columns) and `density` (density of the table rows).

### Example Of Usage

```js
// Imports
const useTableState = require('./hooks/useTableState.ts').default
const Tag = require('../Tag/index.js').default

// Define the columns
columns = {
  name: {
    title: 'Name',
  },
  email: {
    title: 'Email',
  },
  number: {
    title: 'Number',
    cellRender: ({ cellData }) => {
      return <Tag>{cellData}</Tag>
    },
  },
  country: {
    title: 'Country',
  },
}

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

  return <Table {...tableState} />
}
;<StateHookExample />
```

### Input Object

| Property | Type                      | Description                         |
| -------- | ------------------------- | ----------------------------------- |
| columns  | Object of Column          | Definition of the table columns     |
| items    | Array of Object           | The actual items that will be shown |
| density  | 'low', 'medium' or 'high' | Density of table rows               |

### Return Values

| Property           | Type             | Description                         |
| ------------------ | ---------------- | ----------------------------------- |
| columns            | Object of Column | Definition of the table columns     |
| items              | Array of Object  | The actual items that will be shown |
| isEmpty            | Boolean          | If there are items to show or not   |
| tableHeight        | Number           | Table calculated height             |
| rowHeight          | Number           | Table calculated row height         |
| selectedDensity    | Density          | Current selected density            |
| setSelectedDensity | Function         | selectedDensity setter              |
