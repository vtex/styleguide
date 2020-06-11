⚠️The table combined with its hooks is already versatile enough to handle most tabular data display problems. But sometimes we are creating a new component that shares/extends API and/or styles of the Table. This section explains how the table works internally so that you can compose your own components if needed.

Table Sections (`Head`, `Body`, `Row`, and `Cell`) can be controlled by passing the `composableSections` property, which is false by default. This will disuse the default rendering and enable de composable one.

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

#### Sections Anatomy

You may know that a table consists of two loops. The first (**row-loop**) is mapping the list of objects into `Row`'s, and it happens on the `Body` component. The second (**cell-loop**) is mapping the object props into `Cell`s, which occurs on each `Row`.

```html
<table>
  <thead>
    <tr>
      <!-- cell-loop: renders <th>'s foreach column -->
      <th><!-- column[title] --></th>
      <!-- cell-loop-end -->
    </tr>
  </thead>
  <tbody>
    <!-- row-loop: renders <tr>'s foreach item -->
    <tr>
      <!-- cell-loop: renders <td>'s foreach column -->
      <td><!-- item[column.id] --></td>
      <!-- cell-loop-end -->
    </tr>
    <!-- row-loop-end -->
  </tbody>
</table>
```

##### Head

The head contains a single row, so you do not need to worry about the **row-loop**. The following example shows a full head renderer (with sorting).

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

function HeadExample() {
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

;<HeadExample />
```

##### Body

In the body you need to deal with both loops, as the sample below:

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

const items = customers.slice(0, 5)

function BodyExample() {
  const measures = useTableMeasures({ size: items })

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
        <Table.Sections.Body>
          {({ key, props }) => (
            <Table.Sections.Body.Row key={key} {...props}>
              {({ key, props, data, column }) => (
                <Table.Sections.Body.Row.Cell key={key} {...props}>
                  {data[column.id]}
                </Table.Sections.Body.Row.Cell>
              )}
            </Table.Sections.Body.Row>
          )}
        </Table.Sections.Body>
      </Table.Sections>
    </Table>
  )
}

;<BodyExample />
```

##### Customizing body

If you want to have full control of your `<tbody>` tag, you can do as the example below:

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

const items = customers.slice(0, 5)

function CustomBodyExample() {
  const measures = useTableMeasures({ size: items })

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
        <Table.Sections.LoadedView>
          <tbody>
            {items.map((data, key) => (
              <Table.Sections.Body.Row
                key={key}
                data={data}
                height={measures.rowHeight}>
                {({ key, props, data, column }) => (
                  <Table.Sections.Body.Row.Cell key={key} {...props}>
                    {data[column.id]}
                  </Table.Sections.Body.Row.Cell>
                )}
              </Table.Sections.Body.Row>
            ))}
          </tbody>
        </Table.Sections.LoadedView>
      </Table.Sections>
    </Table>
  )
}

;<CustomBodyExample />
```

##### Loaded View

As you can see in the "Customizing body" section sample, it's using the `<Table.Sections.LoadedView>` component, this is used there to hide something from your table when its data is not loaded or it's empty, it's highly recommended to use when customizing the default table components to avoid browser compatibility issues.

##### Sections Props

| Property      | Type    | Required | Default | Description                              |
| ------------- | ------- | -------- | ------- | ---------------------------------------- |
| disableScroll | boolean | 🚫       | false   | Disable scroll overflow of the container |

##### Cell Props

| Property  | Type             | Required | Default | Description                                    |
| --------- | ---------------- | -------- | ------- | ---------------------------------------------- |
| width     | number or string | 🚫       | 🚫      | Cell width (variable by default)               |
| heigth    | number or string | 🚫       | 🚫      | Cell height (variable by default)              |
| className | string           | 🚫       | 🚫      | Custom classes                                 |
| onClick   | `() => void`     | 🚫       | 🚫      | Action to dispatch on click                    |
| sortable  | boolean          | 🚫       | false   | If is sortable or not                          |
| sorting   | boolean          | 🚫       | false   | If is currently sorting by or not              |
| sticky    | boolean          | 🚫       | false   | If is sticky or not                            |
| header    | boolean          | 🚫       | false   | If it is a `<th />` (true) or `<td />` (false) |

##### Row Props

| Property | Type                       | Required | Default | Description                |
| -------- | -------------------------- | -------- | ------- | -------------------------- |
| height   | number                     | ✅       | 🚫      | Row's height               |
| data     | unknown                    | 🚫       | 🚫      | Item that will be rendered |
| motion   | return of `useTableMotion` | 🚫       | 🚫      | Current motion             |

##### Row Render Props (with composable render)

| Property | Type                        | Required | Default | Description           |
| -------- | --------------------------- | -------- | ------- | --------------------- |
| props    | { width: number or string } | ✅       | 🚫      | Width of current cell |
| key      | string                      | ✅       | 🚫      | Key of current cell   |
| index    | number                      | ✅       | 🚫      | Index of current cell |
| data     | unknown                     | ✅       | 🚫      | Data current cell     |
| column   | Column                      | ✅       | 🚫      | current column        |
| motion   | return of `useTableMotion`  | 🚫       | 🚫      | Current motion        |
