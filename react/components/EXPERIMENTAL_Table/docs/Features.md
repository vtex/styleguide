### Measures

The table measures are the current density, rowHeight, tableHeight and setCurrentDensity. They are calculated by the `useTableMeasures` hook.

```ts
// Density shape
enum Density {
  Compact = 'compact',
  Regular = 'regular',
  Comfortable = 'comfortable',
}
```

##### useTableMeasures Inputs

| Property | Type    | Required | Default         | Description               |
| -------- | ------- | -------- | --------------- | ------------------------- |
| size     | number  | ✅       | 0               | Length of the table items |
| density  | Density | 🚫       | Density.Regular | Initial Density           |

##### useTableMeasures Outputs

| Property          | Type                       | Description               |
| ----------------- | -------------------------- | ------------------------- |
| currentDensity    | Density                    | The table current density |
| rowHeight         | number                     | The height of each row    |
| tableHeight       | number                     | Table's full height       |
| bodyHeight        | number                     | Table's body height       |
| setCurrentDensity | (density: Density) => void | Sets the current density  |

##### Example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

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

const items = customers.slice(0, 5)

function MeasuresExample() {
  const measures = useTableMeasures({ size: items.length })
  return <Table measures={measures} columns={columns} items={items} />
}
;<MeasuresExample />
```

### Proportional columns

In some cases, the columns must be proportional within a ratio. This is achievable through the `useTableProportion` hook.

##### useTableProportion inputs

| Property | Type     | Required | Default | Description          |
| -------- | -------- | -------- | ------- | -------------------- |
| columns  | Column[] | ✅       | 🚫      | Columns of the table |
| ratio    | number[] | ✅       | 🚫      | Ratio of each column |

##### useTableProportion outputs

| Property     | Type     | Description                                   |
| ------------ | -------- | --------------------------------------------- |
| sizedColumns | Column[] | Columns of the table with the selected ratios |

##### Example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableProportion from '../hooks/useTableProportion'
import ButtonGroup from '../../ButtonGroup'
import Button from '../../Button'
import { customers } from './sampleData'

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

const items = customers.slice(0, 5)

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

### Toggle columns visibility

The column's visibility can be toggled using `useTableVisibility`. This is useful to hide optional properties, providing a more distinct visualization.

##### useTableVisibility Inputs

| Property      | Type     | Required | Default | Description                      |
| ------------- | -------- | -------- | ------- | -------------------------------- |
| columns       | Column[] | ✅       | 🚫      | Columns of the table             |
| hiddenColumns | string[] | 🚫       | []      | Columns that are initially hidden |

##### useTableVisibility Outputs

| Property       | Type                 | Description                      |
| -------------- | -------------------- | -------------------------------- |
| visibleColumns | Column[]             | Columns that are visible         |
| hiddenColumns  | string[]             | Columns that are hidden          |
| toggleColumn   | (id: string) => void | Toggle a column visibility by id |
| showColumn     | (id: string) => void | Show a column visibility by id   |
| hideColumn     | (id: string) => void | Hide a column visibility by id   |
| showAllColumns | () => void           | Make all columns visible         |
| hideAllColumns | () => void           | Make all columns hidden          |

##### Example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableVisibility from '../hooks/useTableVisibility'
import data from './sampleData'

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

### Sortable columns

The `useTableSort` hook is designed to easily maintain columns sorting state. You may pass its return through the `sorting` prop.

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

##### useTableSort outputs

| Property | Type                 | Description                             |
| -------- | -------------------- | --------------------------------------- |
| sorted   | Sorted               | Order and reference prop of the sorting |
| clear    | () => void           | Clears sorting                          |
| sort     | (id: string) => void | Toggle sorting by some prop             |

##### Example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableSort from '../hooks/useTableSort'
import data from './sampleData'

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

### Loading state

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import Toggle from '../../Toggle'
import Spinner from '../../Spinner'

function LoadingExample() {
  const measures = useTableMeasures({ size: 5 })
  const [custom, setCustom] = React.useState(false)

  const loading = custom
    ? {
        renderAs: () => {
          return <Spinner color="#F71963" size={64} />
        },
      }
    : true

  return (
    <Table
      loading={loading}
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
      ]}>
      <Table.ActionBar>
        <Toggle
          label="Show custom loading"
          checked={custom}
          onChange={() => setCustom(custom => !custom)}
        />
      </Table.ActionBar>
    </Table>
  )
}
;<LoadingExample />
```

### Empty state

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import Toggle from '../../Toggle'
import Button from '../../Button'

function EmptyExample() {
  const [custom, setCustom] = React.useState(false)
  const measures = useTableMeasures({ size: custom ? 8 : 5 })

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

  return (
    <Table
      empty={true}
      emptyState={custom ? customEmptyState : emptyState}
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
      ]}>
      <Table.ActionBar>
        <Toggle
          label="Show custom empty state"
          checked={custom}
          onChange={() => setCustom(custom => !custom)}
        />
      </Table.ActionBar>
    </Table>
  )
}
;<EmptyExample />
```

### Row highlight on hover

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

function ClickableExample() {
  const measures = useTableMeasures({ size: 5 })

  return (
    <Table
      highlightOnHover
      measures={measures}
      items={customers}
      columns={[
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
          title: 'Location',
        },
      ]}
    />
  )
}
;<ClickableExample />
```

### Clickable rows

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

function ClickableExample() {
  const measures = useTableMeasures({ size: 5 })

  return (
    <Table
      onRowClick={({ rowData }) =>
        alert(`Clicked ${rowData.name} from ${rowData.location}`)
      }
      measures={measures}
      items={customers}
      columns={[
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
          title: 'Location',
        },
      ]}
    />
  )
}
;<ClickableExample />
```

### Sticky Header

To achieve a Table with a sticky header and a scrollable body, we can combine `useTableMeasures` hook with the `stickyHeader` prop.

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import { customers } from './sampleData'

function StickyExample() {
  // Define the max number of items that will be displayed
  const measures = useTableMeasures({ size: 5 })

  return (
    <Table
      stickyHeader
      measures={measures}
      items={customers}
      columns={[
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
          title: 'Location',
        },
      ]}
    />
  )
}
;<StickyExample />
```

#### With Checkboxes

A recurrent feature is to add checkboxes to rows. This is achievable with the table features and should be controlled by the user. Luckily for us, the [`EXPERIMENTAL_useCheckboxTree` hook](https://styleguide.vtex.com/#/Components/%F0%9F%91%BB%20Experimental/EXPERIMENTALUseCheckboxTree) helps to keep track of tree data checked states. The following example presents one way of doing it:

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useCheckboxTree from '../../EXPERIMENTAL_useCheckboxTree'
import { customers } from './sampleData'
import Checkbox from '../../Checkbox'

const items = customers.slice(0, 5)

function CheckboxesExample() {
  const measures = useTableMeasures({ size: items.length })
  // using the hook defined down bellow
  const [
    withCheckboxes,
    isRowActive,
    checkedItems,
    allChecked,
  ] = useColumnsWithCheckboxes({
    columns: [
      {
        id: 'name',
        title: 'Name',
      },
      {
        id: 'location',
        title: 'Location',
      },
    ],
    items,
  })
  return (
    <Table
      isRowActive={isRowActive}
      measures={measures}
      columns={withCheckboxes}
      items={items}>
      <Table.ActionBar
        className={`flex items-center justify-end pv4 ph3 f5 br2 ${
          allChecked
            ? 'bg-warning--faded c-warning'
            : 'bg-action-secondary c-on-action-secondary'
        }`}>
        <div>
          {allChecked ? (
            <b>All items are checked!</b>
          ) : (
            <>
              Checked items count: <b>{checkedItems.length}</b>
            </>
          )}
        </div>
      </Table.ActionBar>
    </Table>
  )
}

// custom hook that handle checkboxes state and rendering
function useColumnsWithCheckboxes({ columns, items }) {
  const checkboxes = useCheckboxTree({ items })

  // maps the checkboxes from itemTree to actual elements
  const mappedCheckboxes = checkboxes.itemTree.children.map(item => {
    const id = `${item.id}`
    return (
      <Checkbox
        key={id}
        id={id}
        checked={checkboxes.isChecked(item)}
        partial={checkboxes.isPartiallyChecked(item)}
        disabled={checkboxes.isDisabled(item)}
        onChange={() => checkboxes.toggle(item)}
      />
    )
  })

  // adds the checkboxes column
  const withCheckboxes = [
    {
      id: 'checkbox',
      title: (
        <Checkbox
          id={`${checkboxes.itemTree.id}`}
          checked={checkboxes.allChecked}
          partial={checkboxes.someChecked}
          onChange={checkboxes.toggleAll}
        />
      ),
      width: 32,
      extended: true,
      cellRenderer: ({ data }) => {
        return <div>{mappedCheckboxes[data.id - 1]}</div>
      },
    },
    ...columns,
  ]

  // [parsed columns, isRowActive function, checked items, allChecked]
  return [
    withCheckboxes,
    data => checkboxes.isChecked(data),
    checkboxes.checkedItems,
    checkboxes.allChecked,
  ]
}

;<CheckboxesExample />
```
