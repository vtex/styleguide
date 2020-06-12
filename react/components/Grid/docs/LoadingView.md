View that is displayed when the Grid is loading. You can pass any prop of a div, and forward a ref.

```js
import { useState, Fragment } from 'react'

import Grid from '../index'
import Button from '../../Button'
import Spinner from '../../Spinner'
import useGridMeasures from '../hooks/useGridMeasures'

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
    id: 'price',
    title: 'Price',
  },
]

const items = [
  {
    id: 1,
    name: "Cappuccino",
    price: 'USD 9.80 ',
  },
  {
    id: 2,
    name: 'Irish Coffee',
    price: 'USD 12.99',
  },
  {
    id: 3,
    name: 'Expresso',
    price: 'USD 7.00',
  },
  {
    id: 4,
    name: 'Macchiato',
    price: 'USD 9.00',
  },
  {
    id: 5,
    name: 'Americano',
    price: 'USD 5.00',
  },
  {
    id: 6,
    name: 'Red Eye',
    price: 'USD 11.00',
  },
]

function Showcase() {
  const measures = useGridMeasures({ size: items.length })
  const [loading, setLoading] = useState(false)
  return (
    <Fragment>
      <div className="mb5">
        <Button variation="secondary" onClick={() => setLoading(prev => !prev)}>
          {loading ? 'Stop Loading' : 'Dispatch Loading' }
        </Button>
      </div>
      <Grid 
        measures={measures}
        columns={columns}
        items={items}
        loading={loading}
      >
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
        <Grid.LoadingView>
          <Spinner size={50} />
          <h5 className="f5 ml5">Please wait ...</h5>
        </Grid.LoadingView>
      </Grid>
    </Fragment>
  )
}

;<Showcase />
