A desirable feature on tabular data is the horizontal/vertical scroll. It supports displaying the data in the cell without corrupting it, and keep a small size factor in the container.

```js
import Grid from '../index'
import useListMeasures from '../../../utilities/useListMeasures'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'price',
    title: 'Price',
    
  },
  {
    id: 'description',
    title: 'Description',
  },
]

const items = [
  {
    id: 1,
    name: "Cappuccino",
    description: 'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top',
    price: 'USD 9.80 ',
  },
  {
    id: 2,
    name: 'Irish Coffee',
    description: 'Irish coffee consists of black coffee, whiskey and sugar, topped with whipped cream',
    price: 'USD 12.99',
  },
  {
    id: 3,
    name: 'Expresso',
    description: 'An espresso shot can be served solo or used as the foundation of most coffee drinks',
    price: 'USD 7.00',
  },
]

function Showcase() {
  const measures = useListMeasures({ size: items.length })
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
