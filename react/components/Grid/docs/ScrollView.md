A desirable feature on tabular data is the horizontal/vertical scroll. It supports displaying the data in the cell without corrupting it, and keep a small size factor in the container.

```js
import Grid from '../index'
import useGridMeasures from '../hooks/useGridMeasures'
import items from './data'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'price',
    title: 'Price',
    cellRenderer: function Price({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'description',
    title: 'Description',
  },
]

function Currency({ value }) {
  const formatCurrency = value => parseFloat(value).toFixed(2)
  return <span>$ {formatCurrency(value)}</span>
}

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
