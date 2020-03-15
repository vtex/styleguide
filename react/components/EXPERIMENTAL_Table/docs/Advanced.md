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

function CreateExample() {
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

;<CreateExample />
```
