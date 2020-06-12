#### Grid is a flexible and composable rendering logic of tabular data. You can use it display lists and tables.
#### ⚠️ This is not a replacement neither for Table V1 or v2! They're have different use cases. Check the FAQ's section for more info.

# Props

| name             | type                 | required | default           | description                              |
|------------------|----------------------|----------|-------------------|------------------------------------------|
| columns          | Column<T>[]          | ✅        | 🚫                | Grid columns definition                  |
| measures         | Measures             | ✅        | 🚫                | Grid sizes                               |
| items            | T[]                  | 🚫       | []                | Data to display                          |
| stickyHeader     | boolean              | 🚫       | false             | If the header is sticky or not           |
| onRowClick       | (data: T) => void    | 🚫       | () => null        | Action to dispatch on a row click        |
| isRowActive      | (data: T) => boolean | 🚫       | () => false       | Whenever the row is active               |
| getRowKey        | (data: T) => string  | 🚫       | (data) => data.id | Get a key for the items                  |
| highlightOnHover | boolean              | 🚫       | false             | If the row body should highlight onHover |
| loading          | boolean              | 🚫       | false             | If is loading or not                     |
| empty            | boolean              | 🚫       | false             | If is empty or not                       |



```ts
type Measures = {
  density: string;
  headerHeight: number;
  setDensity: React.Dispatch<React.SetStateAction<string>>;
  baseHeight: number;
  combinedHeight: number;
}
```

# Column

#### Defines how a grid column should render. Each grid column refers to a field of the item that is being rendered.

```ts
/* T is the type of the data we want to display */

interface Column<T> {
  id: string
  title?: string | Element | Function
  width?: number | string
  sortable?: boolean
  cellRenderer?: (data: CellRenderer<T>) => ReactNode
  extended?: boolean
  condensed?: string[]
}

interface CellRenderer<T> {
  data: T
  height: number
  density: string
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
- The function has the following params: ({ data, rowHeight, density })
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

## Full example

#### Each component has its own dedicated Section

```js
import Grid from '../index'
import useGridMeasures from '../hooks/useGridMeasures'

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

const items = [
  {
    id: 1,
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    location: '🇰🇪Wakanda',
  },
  {
    id: 2,
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 3,
    name: 'Shang-Chi',
    email: 'kung.fu@gmail.com',
    location: '🇨🇳China',
  },
]

function Showcase() {
  const measures = useGridMeasures({ size: items.length })
  return (
    <Grid 
      measures={measures}
      columns={columns}
      items={items}
    >
      <Grid.ScrollView>
        <table className="w-100" style={{ borderSpacing: 0 }}>
          <thead>
            <Grid.Head>
              {({ ctx }) => (
                <tr style={ctx.computedStyle} className={ctx.computedClassName}>
                  <Grid.Head.Row>
                    {({ data, ctx }) => (
                      <td style={ctx.computedStyle} className={ctx.computedClassName}>
                        {data}
                      </td>
                    )}
                  </Grid.Head.Row>
                </tr>
              )}
            </Grid.Head>
          </thead>
          <tbody>
            <Grid.Body>
              {({ data, ctx }) => (
                <tr style={ctx.computedStyle} className={ctx.computedClassName}>
                  <Grid.Body.Row data={data}>
                    {({ data, ctx }) => (
                      <td style={ctx.computedStyle} className={ctx.computedClassName}>
                        {data}
                      </td>
                    )}
                  </Grid.Body.Row>
                </tr>
              )}
            </Grid.Body>
          </tbody>
        </table>
      </Grid.ScrollView>
    </Grid>
  )
}

;<Showcase />
```
