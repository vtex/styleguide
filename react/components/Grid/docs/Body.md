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
</Grid.Head>
```

### Props

```ts
interface Props<T> {
  children: (props: RenderProps<T>) => ReactNode
}

interface RenderProps<T> {
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
</Grid.Head>
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

```js
import Grid from '../index'
import useListMeasures from '../../../utilities/useListMeasures'

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

function BodyExample() {
  const measures = useListMeasures({ size: items.length })
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
