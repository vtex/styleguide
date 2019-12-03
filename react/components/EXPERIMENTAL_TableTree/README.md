#### NodesKey Prop

```js
const useTableMeasures = require('../EXPERIMENTAL_Table/hooks/useTableMeasures.tsx')
  .default
const sampleData = require('./sampleData.ts').default

// Define the columns
const columns = [
  {
    id: 'name',
    title: 'Name',
    width: 300,
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
  const measures = useTableMeasures({
    size: items.length,
  })

  const comparator = item => candidate => {
    return item.email === candidate.email
  }

  const onRowClick = ({ rowData }) => {
    console.log(rowData)
  }

  return (
    <TableTree
      onRowClick={onRowClick}
      comparator={comparator}
      measures={measures}
      columns={columns}
      items={items}
      nodesKey="children"
    />
  )
}
;<ToolbarExample />
```

#### Checkboxes

```js
const useTableMeasures = require('../EXPERIMENTAL_Table/hooks/useTableMeasures.tsx')
  .default
const sampleData = require('./sampleData.ts').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default

// Define the columns
const columns = [
  {
    id: 'name',
    title: 'name',
    width: 300,
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

const items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
    children: [],
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    country: '🇺🇸USA',
    children: [
      {
        name: 'Aunt May',
        email: 'may.parker@gmail.com',
        country: '🇺🇸USA',
      },
    ],
  },
]

function Example() {
  const [inputValue, setInputValue] = React.useState('')

  const comparator = item => candidate => {
    return item.email === candidate.email
  }

  const onToggle = ({ checkedItems }) => {
    console.log(checkedItems)
  }

  const checkboxes = useCheckboxTree({
    comparator,
    items,
    onToggle,
  })

  const measures = useTableMeasures({
    size: items.length,
  })

  return (
    <TableTree
      comparator={comparator}
      checkboxes={checkboxes}
      columns={columns}
      items={checkboxes.itemTree}
      measures={measures}
    />
  )
}
;<Example />
```

#### Full Example

```js
const useTableMeasures = require('../EXPERIMENTAL_Table/hooks/useTableMeasures.tsx')
  .default
const useTableVisibility = require('../EXPERIMENTAL_Table/hooks/useTableVisibility.ts')
  .default
const sampleData = require('./sampleData.ts').default
const useCheckboxTree = require('../EXPERIMENTAL_useCheckboxTree').default

// Define the columns
const columns = [
  {
    id: 'name',
    title: 'Description',
    width: 350,
    cellRenderer: ({ rowHeight, cellData }) => (
      <span>
        <Image size={rowHeight - 10} />
        <span className="ph4">{cellData}</span>
      </span>
    ),
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

function Image({ size }) {
  return (
    <div className="dib v-mid">
      <svg
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width={size} height={size} rx="4" fill="#AAAAAA" />
      </svg>
    </div>
  )
}

function ToolbarExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [displayItems, setDisplayItems] = React.useState(items)

  const onToggle = ({ checkedItems }) => {
    console.log(checkedItems)
  }

  const comparator = item => candidate => {
    return item.email === candidate.email
  }

  const checkboxes = useCheckboxTree({
    items,
    onToggle,
    comparator,
    checked: [
      {
        name: "T'Chala",
        email: 'black.panther@gmail.com',
        number: 1.88191,
        country: '🇰🇪Wakanda',
      },
      {
        name: 'Harry Osbourne',
        email: 'harry@gmail.com',
        country: '🇺🇸USA',
      },
      {
        name: 'Green Goblin',
        email: 'norman.green@gmail.com',
        country: '🇺🇸USA',
      },
      {
        name: 'Aunt May',
        email: 'may.parker@gmail.com',
        country: '🇺🇸USA',
      },
      {
        name: 'Uncle Ben',
        email: 'ben.parker@gmail.com',
        country: '🇺🇸USA',
      },
    ],
  })

  const measures = useTableMeasures({
    size: items.length,
  })

  const visibility = useTableVisibility({
    columns,
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

  const empty = React.useMemo(
    () =>
      displayItems.length === 0 ||
      Object.keys(visibility.visibleColumns).length === 0,
    [visibility.visibleColumns, displayItems]
  )

  return (
    <TableTree
      comparator={comparator}
      checkboxes={checkboxes}
      columns={visibility.visibleColumns}
      items={checkboxes.itemTree}
      empty={empty}
      emptyState={emptyState}
      measures={measures}>
      <TableTree.Toolbar>
        <TableTree.Toolbar.InputSearch {...inputSearch} />
        <TableTree.Toolbar.ButtonGroup>
          <TableTree.Toolbar.ButtonGroup.Columns
            visibility={visibility}
            {...buttonColumns}
          />
          <TableTree.Toolbar.ButtonGroup.Density
            density={{
              selectedDensity: measures.selectedDensity,
              setSelectedDensity: measures.setSelectedDensity,
            }}
            {...density}
          />
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
