```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useTableVisibility = require('./hooks/useTableVisibility.ts').default
const Tag = require('../Tag/index.js').default
const Icons = require('react-icons/fa')
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'icon',
    title: 'Icon',
    cellRenderer: ({ cellData, rowHeight, motion }) => (
      <Icon name={cellData} style={motion} height={rowHeight} />
    ),
  },
]

function LineActionsExample() {
  const lineActions = [
    {
      label: 'Action 1',
      onClick: ({ rowData }) => alert(`Executed action for ${rowData.name}`),
    },
    {
      label: 'DANGEROUS Action',
      isDangerous: true,
      onClick: ({ rowData }) =>
        alert(`Executed a DANGEROUS action for ${rowData.name}`),
    },
  ]

  const { itemsWithLineActions, columnsWithLineActions } = useTableLineActions({
    items,
    columns,
    lineActions,
  })
  const measures = useTableMeasures({ size: items.length })

  return (
    <Table
      measures={measures}
      items={itemsWithLineActions}
      columns={columnsWithLineActions}
    />
  )
}
;<LineActionsExample />
```

# Action Bar

This feature allows users to add custom action bars.

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree/index.tsx')
  .default
const Toggle = require('../Toggle/index.js').default
const data = require('./sampleData.ts')

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
]

const items = data.products

const { ActionBar } = Table

function ActionBarExample() {
  const [active, setActive] = React.useState(false)
  const isDisabled = () => !active
  const measures = useTableMeasures({ size: items.length })
  const checkboxes = useCheckboxTree({ columns, items, isDisabled })

  return (
    <Table
      checkboxes={checkboxes}
      measures={measures}
      items={items}
      columns={columns}>
      <ActionBar>
        <Toggle
          checked={active}
          label={active ? 'Disable checkboxes' : 'Enable checkboxes'}
          onChange={() => setActive(active => !active)}
        />
      </ActionBar>
    </Table>
  )
}
;<ActionBarExample />
```

# Filter Bar

```js
const useTableMeasures = require('./hooks/useTableMeasures.tsx').default
const Input = require('../Input').default
const Checkbox = require('../Checkbox').default

  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'status',
    title: 'Status',
    cellRenderer: ({ cellData }) => <Status status={cellData} />,
  },
]

function Icon({ name, height, style }) {
  const SelectedIcon = Icons[name]
  return <SelectedIcon style={style} className="c-muted-1" size={height - 5} />
}

function Status({ status }) {
  const type = status === 'ACTIVE' ? 'success' : 'neutral'
  return <Tag type={type}>{status}</Tag>
}

const items = data.payments

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

function PaymentExample() {
  const [state, dispatch] = React.useReducer(reducer, {
    inputValue: '',
    displayItems: items,
  })

  const visibility = useTableVisibility({
    columns,
    items,
    hiddenColumns: ['id'],
  })

  const measures = useTableMeasures({
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
    <Table
      empty={empty}
      measures={measures}
      items={state.displayItems}
      columns={visibility.visibleColumns}
      emptyState={emptyState}>
      <Table.Toolbar>
        <Table.Toolbar.InputSearch {...inputSearch} />
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
          <Table.Toolbar.ButtonGroup.Density density={measures} {...density} />
          <Table.Toolbar.ButtonGroup.Download {...download} />
          <Table.Toolbar.ButtonGroup.Upload {...upload} />
          <Table.Toolbar.ButtonGroup.ExtraActions {...extraActions} />
          <Table.Toolbar.ButtonGroup.NewLine {...newLine} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<PaymentExample />
```
