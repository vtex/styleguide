To display tabular data correctly we need two loops. The first (**row-loop**) maps the item list. The second (**cell-loop**) maps the actual item props. This section will describe how to use the `Grid.Body` compound component to render the data easily. 

#### Anatomy

```md
<tbody>
  <!-- row-loop: renders <tr>'s foreach item -->
  <tr>
    <!-- cell-loop: renders <td>'s foreach column -->
    <td><!-- item[column.id] --></td>
    <!-- cell-loop-end -->
  </tr>
  <!-- row-loop-end -->
</tbody>
```

## Grid.Body

#### To loop through items, creating rows

### Usage

⚠️ The Body is hidden when the Grid is loading or empty.

#### Dynamic (default)

```md
<Grid.Body>
  {({ data, ctx, index }) => {
    // Grid.Body returns data, ctx and index
    // You must return a React Node, for example:
    return (
      <tr style={ctx.computedStyle} className={ctx.computedClassName}>
        // Do whatever needs to be done
        // data is probably an object here, so do not render it directly
      </tr>
    )
  }}
</Grid.Body>
```

#### Static

Sometimes you may want to do the loop yourself. You can do this, by setting the `dynamic` to false. This is useful to enable virtualization with custom libraries.

```md
<Grid.Body dynamic={false}>
  {({ data, ctx, index }) => {
    // Grid.Body returns data, ctx and index
    // You must return a React Node
    // Remember that data is a array, you can either map it or use custom libraries to do that for you.
    return data.map(item => (
      <tr style={ctx.getComputedStyle(item)} className={ctx.computedClassName}>
        // Do whatever needs to be done
        // item is probably an object here, so do not render it directly
      </tr>
    )
  }}
</Grid.Body>
```

### Props

```ts
interface Props<T> {
  children: (props: RenderProps<T>) => ReactNode
  dynamic: boolean
}

type RenderProps<T> = DynamicRenderProps<T> | StaticRenderProps<T>

interface DynamicRenderProps<T> {
  // current item
  data: T
  // current item index on the loop (do not try to use it as key)
  index: number
  // body context
  ctx: {
    // className for the container
    computedClassName: string
    // style for the container
    computedStyle: Record<string, number | string>
    // call's onRowClick function
    handleClick: () => void
  }
}

interface StaticRenderProps<T> {
  // collection
  data: T[]
  // body context
  ctx: {
    // function to get computedStyles of container
    getComputedStyle: (item: T) => Record<string, number | string>
    // style for the container
    computedClassName: string
    // same as onRowClick function
    handleClick?: (item: T) => void
  }
}
```

## Grid.Body.Row

#### To loop through columns, assign to item props - creating cells

### Usage

```md
<Grid.Body.Row>
  {({ data, ctx, index }) => {
    // Grid.Body.Row returns data, ctx and index
    // You must return a React Node, for example:
    return (
      <td style={ctx.computedStyle} className={ctx.computedClassName}>
        // Display the data
        {data}
      </td>
    )
  }}
</Grid.Body.Row>
```

### Props

```ts
interface Props<T> {
  children: (props: RenderProps<T>) => ReactNode
}

interface RenderProps<T> {
  // Result of the column.cellRenderer or prop value from current item[column.id]
  data: ReactNode
  // current column index on the loop (do not try to use it as key)
  index: number
  // body context
  ctx: {
    // className for the container
    computedClassName: string
    // style for the container
    computedStyle: Record<string, number | string>
  }
}
```

## Working Example

#### Body and Body.Row combined to display the Grid body

#### Dynamic

```js
import Grid from '../index'
import ButtonPlain from '../../ButtonPlain'
import useGridMeasures from '../hooks/useGridMeasures'
import items from './data'

const columns = [
  {
    id: 'id',
    title: 'ID'
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: function Cost({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'price',
    title: 'Price',
    cellRenderer: function Price({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'profit',
    title: 'Profit',
    cellRenderer: function Profit({ data }) {
      return <Currency value={data.price - data.costPrice} />
    },
    condensed: ['price', 'costPrice']
  },
  {
    id: 'actions',
    title: 'Actions',
    cellRenderer: function RowActions({ data }) {
      return (
        <ButtonPlain onClick={() => alert(JSON.stringify(data))}>
          Sell {data.name}
        </ButtonPlain>
      )
    },
    extended: true,
  }
]

function Currency({ value }) {
  const formatCurrency = value => parseFloat(value).toFixed(2)
  return <span>$ {formatCurrency(value)}</span>
}

function BodyExample() {
  const measures = useGridMeasures({ size: items.length })
  return (
    <Grid 
      measures={measures}
      columns={columns}
      items={items}
    >
      <table className="w-100" style={{ borderSpacing: 0 }}>
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
    </Grid>
  )
}

;<BodyExample />
```

#### Static

```js
import Grid from '../index'
import ButtonPlain from '../../ButtonPlain'
import useGridMeasures from '../hooks/useGridMeasures'
import items from './data'

const columns = [
  {
    id: 'id',
    title: 'ID'
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: function Cost({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'price',
    title: 'Price',
    cellRenderer: function Price({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'profit',
    title: 'Profit',
    cellRenderer: function Profit({ data }) {
      return <Currency value={data.price - data.costPrice} />
    },
    condensed: ['price', 'costPrice']
  },
  {
    id: 'actions',
    title: 'Actions',
    cellRenderer: function RowActions({ data }) {
      return (
        <ButtonPlain onClick={() => alert(JSON.stringify(data))}>
          Sell {data.name}
        </ButtonPlain>
      )
    },
    extended: true,
  }
]

function Currency({ value }) {
  const formatCurrency = value => parseFloat(value).toFixed(2)
  return <span>$ {formatCurrency(value)}</span>
}

function BodyExample() {
  const measures = useGridMeasures({ size: items.length })
  return (
    <Grid 
      measures={measures}
      columns={columns}
      items={items}
    >
      <table className="w-100" style={{ borderSpacing: 0 }}>
        <tbody>
          <Grid.Body dynamic={false}>
            {({ data, ctx }) => (
              data.map(item => {
                return (
                  <tr style={ctx.getComputedStyle(item)} className={ctx.computedClassName}>
                    <Grid.Body.Row data={item}>
                      {({ data, ctx }) => (
                        <td style={ctx.computedStyle} className={ctx.computedClassName}>
                          {data}
                        </td>
                      )}
                    </Grid.Body.Row>
                  </tr>
                )
              })
            )}
          </Grid.Body>
        </tbody>
      </table>
    </Grid>
  )
}

;<BodyExample />
```
