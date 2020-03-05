#### A table displays any kind of structured data and offers controls to easily navigate, search and filter through it. Data may be from just numbers to complex entities that employ other components to represent themselves, like images, tags, links, etc.

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

```js
const Table = require('../index.tsx').default
const useTableMeasures = require('../hooks/useTableMeasures.tsx').default
const ActionMenu = require('../../ActionMenu/index.js').default
const OptionsDots = require('../../icon/OptionsDots/index.js').default
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
  return (
    <Table
      measures={measures}
      items={items}
      columns={columns}
      highlightOnHover
    />
  )
}
;<ColumnsExample />
```
