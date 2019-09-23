#### Toolbar

```js
const useTableState = require('../EXPERIMENTAL_Table/hooks/useTableState.ts')
  .default
const sampleData = require('./sampleData.ts').default

// Define the columns
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
    id: 'number',
    title: 'Number',
  },
  {
    id: 'country',
    title: 'Country',
  },
]

// Define the items
const items = sampleData

function ToolbarExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [displayItems, setDisplayItems] = React.useState(items)

  const tableState = useTableState({
    columns,
    items: displayItems,
    density: 'medium',
  })

  const emptyState = {
    label: 'The table is empty',
  }

  const inputSearch = {
    value: inputValue,
    placeholder: 'Search stuff...',
    onChange: e => setInputValue(e.currentTarget.value),
    onClear: () => {
      setInputValue('')
      setDisplayItems(items)
    },
    onSubmit: e => {
      e.preventDefault()
      const isInputClear = inputValue === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      setDisplayItems(isInputClear ? items : items.filter(filterFn))
    },
  }

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
  }

  const density = {
    label: 'Line density',
    lowOptionLabel: 'Low',
    mediumOptionLabel: 'Medium',
    highOptionLabel: 'High',
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

  return (
    <TableTree state={tableState} emptyState={emptyState}>
      <TableTree.Toolbar>
        <TableTree.Toolbar.InputSearch {...inputSearch} />
        <TableTree.Toolbar.ButtonGroup>
          <TableTree.Toolbar.ButtonGroup.Columns {...buttonColumns} />
          <TableTree.Toolbar.ButtonGroup.Density {...density} />
          <TableTree.Toolbar.ButtonGroup.Download {...download} />
          <TableTree.Toolbar.ButtonGroup.Upload {...upload} />
          <TableTree.Toolbar.ButtonGroup.ExtraActions {...extraActions} />
          <TableTree.Toolbar.ButtonGroup.NewLine {...newLine} />
        </TableTree.Toolbar.ButtonGroup>
      </TableTree.Toolbar>
    </TableTree>
  )
}
;<ToolbarExample />
```
