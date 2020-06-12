You can pair a Grid with 

<div className="center mw7 pv6">
 ![](./table.png)
</div>

## Toolbar

### [Toolbar Documentation](https://styleguide.vtex.com/#/Components/👻%20Experimental/Toolbar)

```js
import Grid from '../index'
import Button from '../../Button'
import EmptyState from '../../EmptyState'
import Toolbar from '../../EXPERIMENTAL_Toolbar'
import useGridMeasures from '../hooks/useGridMeasures'
import useTableVisibility from '../../EXPERIMENTAL_Table/hooks/useTableVisibility'
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

function BasicRendering() {
  return (
    <React.Fragment>
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
      <Grid.EmptyView>
        <EmptyState title="Ops! Your list is empty">
          <p>
            You did not registered any coffee in the system!
          </p>
          <div className="pt5">
            <Button variation="secondary" size="small">
              <span className="flex align-baseline">Register Coffee</span>
            </Button>
          </div>
        </EmptyState>
      </Grid.EmptyView>
      <Grid.LoadingView />
    </React.Fragment>
  )
}

function ToolbarExample() {
  const [state, dispatch] = React.useReducer(reducer, {
    inputValue: '',
    displayItems: items,
  })

  const visibility = useTableVisibility({
    columns,
    items,
    hiddenColumns: ['description'],
  })

  const measures = useGridMeasures({
    size: state.displayItems.length,
  })

  const inputSearch = {
    value: state.inputValue,
    placeholder: 'Search stuff...',
    onChange: e => dispatch({ type: 'change', value: e.currentTarget.value }),
    onClear: () => {
      dispatch({ type: 'clear' })
    },
    onSubmit: e => {
      e.preventDefault()
      dispatch({ type: 'submit' })
    },
  }

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
    density: measures.density,
    setDensity: measures.setDensity
  }

  const download = {
    label: 'Export',
    onClick: () => alert('Clicked EXPORT'),
  }

  const upload = {
    label: 'Import',
    onClick: () => alert('Clicked IMPORT'),
  }

  const extraActions = {
    label: 'More options',
    actions: [
      {
        label: 'An action',
        onClick: () => alert('An action'),
      },
      {
        label: 'Another action',
        onClick: () => alert('Another action'),
      },
      {
        label: 'A third action',
        onClick: () => alert('A third action'),
      },
    ],
  }

  const newLine = {
    label: 'New',
    onClick: () => alert('handle new line callback'),
    actions: [
      'General',
      'Desktop & Screen Saver',
      'Dock',
      'Language & Region',
    ].map(label => ({
      label,
      onClick: () => alert(`Clicked ${label}`),
    })),
  }

  const emptyState = {
    label: 'The table is empty',
  }

  const empty = React.useMemo(
    () =>
      state.displayItems.length === 0 ||
      Object.keys(visibility.visibleColumns).length === 0,
    [visibility.visibleColumns, state.displayItems]
  )

  return (
    <React.Fragment>
      <Toolbar>
        <Toolbar.InputSearch {...inputSearch} />
        <Toolbar.ButtonGroup>
          <Toolbar.ButtonGroup.Columns {...buttonColumns} />
          <Toolbar.ButtonGroup.Density {...density} />
          <Toolbar.ButtonGroup.Download {...download} />
          <Toolbar.ButtonGroup.Upload {...upload} />
          <Toolbar.ButtonGroup.ExtraActions {...extraActions} />
          <Toolbar.ButtonGroup.NewLine {...newLine} />
        </Toolbar.ButtonGroup>
      </Toolbar>
      <Grid 
        measures={measures}
        columns={visibility.visibleColumns}
        items={state.displayItems}
        empty={empty}
      >
        <BasicRendering />
      </Grid>
    </React.Fragment>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { value } = action
      return {
        ...state,
        inputValue: value,
      }
    }
    case 'clear': {
      return {
        inputValue: '',
        displayItems: items,
      }
    }
    case 'submit': {
      const inputClear = state.input === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(state.inputValue.toLowerCase())
      return {
        ...state,
        displayItems: inputClear ? items : items.filter(filterFn),
      }
    }
    default: {
      return state
    }
  }
}

;<ToolbarExample />
```

## Totalizer

### [Totalizer Documentation](https://styleguide.vtex.com/#/Components/Display/Totalizer)

```js
import Grid from '../index'
import Totalizer from '../../Totalizer'
import Button from '../../Button'
import EmptyState from '../../EmptyState'
import ArrowUp from '../../icon/ArrowUp'
import ArrowDown from '../../icon/ArrowDown'
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
    id: 'price',
    title: 'Price',
    cellRenderer: function Price({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: function Price({ data }) {
      return <Currency value={data} />
    },
  },
  {
    id: 'description',
    title: 'Description',
  },
]

const formatCurrency = value => parseFloat(value).toFixed(2)

function Currency({ value }) {
  return <span>$ {formatCurrency(value)}</span>
}

function BasicRendering() {
  return (
    <React.Fragment>
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
      <Grid.EmptyView>
        <EmptyState title="Ops! Your list is empty">
          <p>
            You did not registered any coffee in the system!
          </p>
          <div className="pt5">
            <Button variation="secondary" size="small">
              <span className="flex align-baseline">Register Coffee</span>
            </Button>
          </div>
        </EmptyState>
      </Grid.EmptyView>
      <Grid.LoadingView />
    </React.Fragment>
  )
}

function TotalizerExample(){
  const measures = useGridMeasures({
    size: items.length,
  })

  const totalizer = React.useMemo(() => {
    const sum = items.reduce(
      (acc, item) => {
        const { stock, cost, retail } = acc

        return {
          cost: cost + item.costPrice,
          retail: retail + item.price,
        }
      },
      {
        cost: 0,
        retail: 0,
      }
    )
    return {
      items: [
        {
          label: 'Total cost',
          value: `$ ${formatCurrency(sum.cost)}`,
          iconBackgroundColor: '#fda4a4',
          icon: <ArrowDown color="#dd1616" size={14} />,
        },
        {
          label: 'Total retail',
          value: `$ ${formatCurrency(sum.retail)}`,
          iconBackgroundColor: '#eafce3',
          icon: <ArrowUp color="#79B03A" size={14} />,
        },
        {
          label: 'Expected Profit',
          value: `$ ${formatCurrency(sum.retail - sum.cost)}`,
        },
      ],
    }
  }, [items])

  return (
    <React.Fragment>
      <div className="mb5">
        <Totalizer {...totalizer} />
      </div>
      <Grid 
        measures={measures}
        columns={columns}
        items={items}
      >
        <BasicRendering />
      </Grid>
    </React.Fragment>
  )
}
;<TotalizerExample />
```
