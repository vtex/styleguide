We often use headers to better index the data. This section describes how to achieve it using the `Grid.Head` compound component.

#### Anatomy

```html
<!-- thead tag is optional, but desirable -->
<thead>
  <!-- header row -->
  <tr>
    <!-- loop: renders <th>'s foreach column -->
    <th><!-- column[title] --></th>
    <!-- loop-end -->
  </tr>
  <!-- head end -->
</thead>
```

## Grid.Head

#### To display the header row styles

### Usage

```md
<Grid.Head>
  {({ ctx }) => {
    // Grid.Head only returns ctx (stands for context)
    // You must return a React Node, for example:
    return (
      <tr style={ctx.computedStyle} className={ctx.computedClassName}>
        // Do whatever needs to be done
      </tr>
    )
  }}
</Grid.Head>
```

### Props

```ts
interface Props {
  children: (props: RenderProps) => ReactNode
}

interface RenderProps {
  // head context
  ctx: {
    // className for the container
    computedClassName: string
    // style for the container
    computedStyle: Record<string, number | string>
  }
}
```

## Grid.Head.Row

#### To loop through the columns, returning its title as `data`

### Usage

```md
<Grid.Head.Row>
  {({ data, ctx }) => {
    // Grid.Head.Row returns data and ctx
    // You must return a React Node, for example:
    return(
      <th style={ctx.computedStyle} className={ctx.computedClassName}>
        // Display your data, among other things...
        {data}
      </th>
    )
  }}
</Grid.Head.Row>
```

### Props

```ts
interface {
  children: (props: RenderProps) => ReactNode
}

interface RenderProps {
  // content to display, same as column.title
  data: string | Function | Element
  // header row context
  ctx: {
    // className for the container
    computedClassName: string
    // style for the container
    computedStyle: Record<string, number | string>
  }
}
```

## Working Example

#### Head and Head.Row combined to display the Grid header

```js
import Grid from '../index'
import useGridMeasures from '../hooks/useGridMeasures'

const columns =[
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

function HeadExample() {
  const measures = useGridMeasures({ size: 1 })
  return (
    <Grid 
      measures={measures}
      columns={columns}
    >
      <table className="w-100" style={{ borderSpacing: 0 }}>
        <thead>
          <Grid.Head>
            {({ ctx }) => (
              <tr style={ctx.computedStyle} className={ctx.computedClassName}>
                <Grid.Head.Row>
                  {({ data, ctx }) => (
                    <th style={ctx.computedStyle} className={ctx.computedClassName}>
                      {data}
                    </th>
                  )}
                </Grid.Head.Row>
              </tr>
            )}
          </Grid.Head>
        </thead>
      </table>
  </Grid>
  )
}

;<HeadExample />
```
